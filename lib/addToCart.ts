// Define the Product interface if not already defined in your typings
interface Product {
  sku: string;
  title: string;
  description: string;
  // Add other properties as needed
}

// Simulated cart state (could be replaced with a proper store implementation)
let cart: Product[] = [];

// Function to add a product to the cart
export const addToCart = (product: Product): void => {
  cart.push(product);
  console.log('Product added to cart:', product);
};

// Function to remove a product from the cart
export const removeFromCart = (product: Product): void => {
  cart = cart.filter(item => item.sku !== product.sku);
  console.log('Product removed from cart:', product);
};

// Function to get the current cart state
export const getCart = (): Product[] => {
  return cart;
};
