import { productsRoute } from './index';

import request from 'supertest';
import express from 'express';

const app = express();

// Parsers
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// Routes

productsRoute(app);

jest.mock('../../services/products', () => ({
  ProductsService: class mockProductsService {
    async list() {
      return [];
    }
  },
}));

describe('productsRoute', () => {
  test('should return a list of products', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('Accept', 'application/json');

    expect(response.body).toEqual({ status: 'success', data: [] });
  });
});
