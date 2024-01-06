import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
} from "@material-ui/core";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchSport, setSearchSport] = useState("");

  useEffect(() => {
    // Fetch data from the API
    fetch('https://sheetdb.io/api/v1/m77j9jywf5lk0')
      .then((response) => response.json())
      .then((responseData) => {
        // Remove extra spaces from property names
        const cleanedData = responseData.map((item) => {
          const cleanedItem = {};
          for (const key in item) {
            cleanedItem[key.trim()] = item[key];
          }
          return cleanedItem;
        });

        setData(cleanedData);
        setFilteredData(cleanedData); // Set filteredData initially with all data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchSport(searchValue);

    // Filter the data based on the search value
    const filtered = data.filter((item) =>
      item["Sport"].toLowerCase().includes(searchValue)
    );

    setFilteredData(filtered);
  };

  return (
    <>
      <div class="header">
        <img src="small-2.png" alt="Logo" class="logo" />
      </div>
      <div className="main">
        <div class="logo-main">
          <img src="sang.png" />
        </div>
        <div>
          <h1 class="logo-main-text">Sangarsh 2024</h1>
          <p class="sub-text">Hosted by IIM Banglore</p>
        </div>
        <div class="img-div">
          <div class="text-div">
            <p class="text">Title Sponsor</p>
            <img src="img1.png" alt="img1" class="imgclass" />
          </div>
          <div class="text-div">
            <p class="text-2">Associate Sponsor</p>
            <img src="img2.png" alt="img2" class="imgclass" />
          </div>
        </div>
        <div className="table-div">
          <Paper
            style={{ padding: "16px"}}
            className="table-container"
          >
            <TextField
              label="Enter Sports Name here"
              variant="outlined"
              margin="normal"
              value={searchSport}
              onChange={handleSearchChange}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontFamily: "math",
                      fontWeight: 600,
                      fontSize: "18px",
                    }}
                  >
                    Sr. No.
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: "math",
                      fontWeight: 600,
                      fontSize: "18px",
                    }}
                  >
                    Sport
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: "math",
                      fontWeight: 600,
                      fontSize: "18px",
                    }}
                  >
                    Team1
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: "math",
                      fontWeight: 600,
                      fontSize: "18px",
                    }}
                  >
                    Team2
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: "math",
                      fontWeight: 600,
                      fontSize: "18px",
                    }}
                  >
                    Match Type
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: "math",
                      fontWeight: 600,
                      fontSize: "18px",
                    }}
                  >
                    Winner
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index}</TableCell>
                    <TableCell>{item["Sport"]}</TableCell>
                    <TableCell>{item["Team1"]}</TableCell>
                    <TableCell>{item["Team2"]}</TableCell>
                    <TableCell>{item["Match Type"]}</TableCell>
                    <TableCell>{item["Winner"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default App;
