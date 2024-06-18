import axios from './axios'; // Import the configured Axios instance


const fetchData = async () => {
  try {
    const response = await axios.post('/api/login'); // Send a GET request to '/api/data'
    console.log(response.data); // Log the response data to the console
  } catch (error) {
    console.error('Error fetching data:', error); // Log any errors
  }
};

// Call the fetchData function to fetch and log data
fetchData();
