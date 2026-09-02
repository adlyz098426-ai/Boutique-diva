export type FrameId =
  | '01_Login'
  | '02_Registro'
  | '03_Inicio_Dashboard'
  | '04_Detalle_Producto'
  | '05_Carrito'
  | '06_Perfil';

export type CategoryId = 'todos' | 'vestidos' | 'blusas' | 'pantalones' | 'chaquetas' | 'accesorios';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface ProductColor {
  name: string;
  hex: string;
  border?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  category: CategoryId;
  description: string;
  availableSizes: ProductSize[];
  colors: ProductColor[];
  inStock: boolean;
  featured?: boolean;
  badge?: string;
  material?: string;
}

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberTier: string;
  savedPoints: number;
}

export interface PrototypeInteraction {
  id: string;
  title: string;
  origin: FrameId;
  destination: FrameId;
  trigger: string;
  action: string;
  transition: 'Smart Animate' | 'Slide In' | 'Slide Out' | 'Push' | 'Fade';
  description: string;
}

export type ViewMode = 'simulator' | 'all_frames' | 'design_system' | 'flow_diagram';
