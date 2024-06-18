import axios from './axios'; // Import the configured Axios instance

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  // Add any other fields expected in the response
}
export async function sendProductToBackend(product: any) {
  const response = await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
  });

  if (!response.ok) {
      throw new Error('Failed to send product to backend');
  }

  return response.json();
}


const fetchData = async (): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>('/api/login'); // Send a POST request to '/api/login'
    console.log(response.data); // Log the response data to the console
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching data:', error.response?.data); // Log any errors
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

// Call the fetchData function to fetch and log data
fetchData();
