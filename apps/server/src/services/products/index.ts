import { Product, ProductQuery, ProductsQuery } from '@repo/schemas';
import { prisma } from '../../lib/prisma-client';
import type { Prisma } from '@repo/db';

export class ProductsService {
  async list({ collection, sort, q }: ProductsQuery): Promise<Product[]> {
    const where: Prisma.ProductFindManyArgs['where'] = {};

    if (collection) {
      where.collections = {
        some: {
          id: collection,
        },
      };
    }

    if (q) {
      where.name = {
        search: `'${q.replace(/[^a-zA-Z0-9\s]/g, '')}'`,
      };
    }

    const result = await prisma.product.findMany({
      where,
      include: {
        variants: {
          take: 1,
          select: { price: true },
          orderBy: { price: 'asc' },
        },
      },
    });

    const items = result.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.variants[0].price,
    }));

    if (sort === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    }

    if (sort === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }

  async get({ id }: ProductQuery): Promise<Product | null> {
    const item = await prisma.product.findFirst({
      where: { id },
      include: {
        variants: {
          orderBy: { price: 'asc' },
        },
      },
    });

    if (!item) {
      return null;
    }

    return {
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.variants[0].price,
    };
  }
}
