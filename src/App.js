import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://sheetdb.io/api/v1/m77j9jywf5lk0')
      .then((response) => response.json())
      .then((data) => {
        // Remove extra spaces from property names
        const cleanedData = data.map(item => {
          const cleanedItem = {};
          for (const key in item) {
            cleanedItem[key.trim()] = item[key];
          }
          return cleanedItem;
        });
        
        setData(cleanedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Sports Results</h1>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Sport</th>
            <th>Team1</th>
            <th>Team2</th>
            <th>Match Type</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item['Sport']}</td>
              <td>{item['Team1']}</td>
              <td>{item['Team2']}</td>
              <td>{item['Match Type']}</td>
              <td>{item['Winner']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
