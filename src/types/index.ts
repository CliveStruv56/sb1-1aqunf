export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'tea' | 'cake';
  image: string;
  allowsMilkOptions?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  milkOption?: 'whole' | 'oat' | 'almond' | 'soy';
};

export type TimeSlot = {
  date: Date;
  time: string;
};