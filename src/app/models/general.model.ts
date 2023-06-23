export interface Auth {
  access_token: string;
}

export interface Category {
  id: number;
  name: string;
}
export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role?: 'customer' | 'admin';
}

export interface CreateUserDTO extends Omit<IUser, 'id'> {}
