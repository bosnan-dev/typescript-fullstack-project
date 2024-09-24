import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export async function seed(prisma: PrismaClient) {
  // Seed Collections
  await prisma.collection.createMany({
    data: Array.from({ length: 3 }, (v, i) => i).map((v) => ({
      name: `Collection ${v}`,
      description: faker.lorem.sentences(3),
    })),
  });

  // Seed Products with Variants and Options
  for (let i = 0; i < 5; i++) {
    const product = await prisma.product.create({
      data: {
        name: `Product ${i}`,
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        options: {
          create: [
            {
              name: 'Color',
              values: {
                create: ['Red', 'Blue', 'Green'].map((value) => ({
                  value,
                })),
              },
            },
            {
              name: 'Size',
              values: {
                create: ['S', 'M', 'L', 'XL'].map((value) => ({
                  value,
                })),
              },
            },
          ],
        },
      },
    });

    // Create Variants with connections to the correct OptionValues
    const variants = await prisma.variant.createManyAndReturn({
      data: [
        {
          productId: product.id,
          name: 'Red-S',
          description: faker.lorem.sentences(2),
          image: faker.image.url(),
          sku: faker.string.numeric(),
          price: faker.number.int({ min: 1000, max: 5000 }),
          stock: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: product.id,
          name: 'Blue-M',
          description: faker.lorem.sentences(2),
          image: faker.image.url(),
          sku: faker.string.numeric(),
          price: faker.number.int({ min: 1000, max: 5000 }),
          stock: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: product.id,
          name: 'Green-L',
          description: faker.lorem.sentences(2),
          image: faker.image.url(),
          sku: faker.string.numeric(),
          price: faker.number.int({ min: 1000, max: 5000 }),
          stock: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    // Link Variants to OptionValues
    const colorOptions = await prisma.optionValue.findMany({
      where: {
        option: {
          name: 'Color',
          productId: product.id,
        },
      },
    });

    const sizeOptions = await prisma.optionValue.findMany({
      where: {
        option: {
          name: 'Size',
          productId: product.id,
        },
      },
    });

    const connectValues = [
      [
        { id: colorOptions.find((c) => c.value === 'Red')!.id },
        { id: sizeOptions.find((s) => s.value === 'S')!.id },
      ],
      [
        { id: colorOptions.find((c) => c.value === 'Blue')!.id },
        { id: sizeOptions.find((s) => s.value === 'M')!.id },
      ],
      [
        { id: colorOptions.find((c) => c.value === 'Green')!.id },
        { id: sizeOptions.find((s) => s.value === 'L')!.id },
      ],
    ];

    for (let j = 0; j < variants.length; j++) {
      const variant = variants[j];
      await prisma.variant.update({
        where: { id: variant.id },
        data: {
          optionValues: {
            connect: connectValues[j],
          },
        },
      });
    }

    // Randomly assign products to collections
    await prisma.collection.update({
      where: { id: (i % 3) + 1 },
      data: {
        products: {
          connect: { id: product.id },
        },
      },
    });
  }
}
