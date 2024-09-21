import { createFileRoute } from '@tanstack/react-router';
import { getProductQueryOptions } from '../utils/getProductsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { formatPrice } from '../utils/formatPrice';

export const Route = createFileRoute('/product/$id')({
  component: Page,
  loader: ({ context, params }) => ({
    product: context.queryClient.ensureQueryData(
      getProductQueryOptions({ id: Number(params.id) }),
    ),
  }),
  pendingMinMs: 0,
});

function Page() {
  const params = Route.useParams();
  const { data } = useSuspenseQuery(
    getProductQueryOptions({ id: Number(params.id) }),
  );

  if (data.status === 'error') {
    return <span>Error from API: {JSON.stringify(data.error)}</span>;
  }

  if (!data.data) {
    return <span>No product data available</span>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200">
      <div className="text-center group transition-all bg-slate-200 p-6 pb-8 max-w-5xl flex flex-col md:flex-row items-center">
        {/* Image section (on the left) */}
        <div className="overflow-hidden flex justify-center w-full md:w-2/3">
          <img
            className="transform transition-transform duration-300 ease-in-out group-hover:scale-110 w-full h-auto object-contain"
            src={data.data.image ?? undefined}
            alt="Product Image"
          />
        </div>

        {/* Description section (on the right) */}
        <div className="mt-6 w-full md:w-1/3 text-center md:text-left md:pl-12">
          <h2 className="font-bold mb-4 text-6xl text-gray-500">
            {data.data.name}
          </h2>
          <br />
          <p className="text-4xl font-bold text-blue-700 bg-sky-200 flex justify-center md:justify-start w-min rounded px-2 mx-auto md:mx-0">
            {formatPrice(data.data.price)}
          </p>
          <br />
          <p className="text-2xl text-slate-900 mt-4">
            {data.data.description}
          </p>

          <br />
          {/* Button Container */}
          <div className="flex space-x-4 justify-center mt-6">
            {/* Add to Cart Button */}
            <a
              href="/cart"
              className=" bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded flex items-center justify-center space-x-2 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6M10 21h4m-4 0a1 1 0 001 1m0-1a1 1 0 001 1m0-1l1-6m-1 6a1 1 0 01-1-1m4-16h.01M7 13h1m2 0h4m0 0l1 6m-1-6h4m-5-6h-2M2 6h1m0 0l2.4 12h13.2L19 6H2.4"
                />
              </svg>
              <span>Add Cart</span>
            </a>

            {/* Go Back Button */}
            <a
              href="/search"
              className="inline-block bg-red-500 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded transition-colors"
            >
              Go Back
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
