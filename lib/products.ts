import axiosInstance from '@/lib/axios'; // Adjust the import path as per your setup
import axios, { isAxiosError } from 'axios';
import { Product } from '@/typings/productTypings';

export async function sendProductToBackend(product: Product) {
  try {
    const response = await axiosInstance.post('/api/products', product);
    console.log('Product added successfully:', response.data);
    return response.data; // Optionally return data if needed
  } catch (error) {
    if (isAxiosError(error)) {
      // Handle Axios error
      console.error('Axios error:', error.toJSON());
      throw new Error('Failed to add product');
    } else {
      // Handle other errors
      console.error('Error adding product:', error);
      throw new Error('Failed to add product');
    }
  }
}

export async function sendProductRemovalToBackend(title: string) {
  try {
    const response = await axiosInstance.delete(`/api/products/title/${title}`);
    console.log('Product removed successfully:', response.data);
    return response.data; // Optionally return data if needed
  } catch (error) {
    if (isAxiosError(error)) {
      // Handle Axios error
      console.error('Axios error:', error.toJSON());
      throw new Error('Failed to remove product');
    } else {
      // Handle other errors
      console.error('Error removing product:', error);
      throw new Error('Failed to remove product');
    }
  }
}

export async function sendOrderToBackend(dataToSend: any) {
  try {
    const response = await axiosInstance.post('/api/order', dataToSend);
    console.log('Product sent to backend:', response.data);
    return response.data; // Optionally return data if needed
  } catch (error) {
    if (isAxiosError(error)) {
      // Handle Axios error
      console.error('Axios error:', error.toJSON());
      throw new Error('Failed to send product to backend');
    } else {
      // Handle other errors
      console.error('Error sending product to backend:', error);
      throw new Error('Failed to send product to backend');
    }
  }
}
