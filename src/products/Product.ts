export interface Product {
  id: number;
  name: string;
  unit: 'kg' | 'g' | 'tsp' | 'sp' | 'pinch' | 'ml' | 'l' | 'item';
  amount: number;
  dishId: number;
}
