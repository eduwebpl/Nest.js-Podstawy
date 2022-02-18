import { Product } from '../products/Product';

export interface Dish {
  id: number;
  name: string;
  servings: number;
  description?: string;
  products: Product[];
}
// KISS (Keep It Simple Stupid)

// Dish ->> Product[]
