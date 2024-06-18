import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios'; // Import the configured Axios instance

const DataComponent: React.FC = () => {
  const [data, setData] = useState<any>(null); // State variable to store data

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data'); // Send a GET request to '/api/data'
      setData(response.data); // Set the response data to the state variable
    } catch (error) {
      console.error('Error fetching data:', error); // Log any errors
    }
  };

  return (
    <div>
      <h2>Data Component</h2>
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default DataComponent;
