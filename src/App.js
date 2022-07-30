
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Miner from './Miner'
import MinerTable from './MinerTable'

function App() {
  //sets up initial state of the app
  const [miners, setMiners] = useState([]);
  useEffect(() => {
    if (miners.length === 0) {
      getDataRequest();
    }
  }, []);
  
  const getDataRequest = () => {
    axios.get(`https://api.filrep.io/api/v1/miners?limit=100`)
      .then(
        (result) => {
          setMiners(result.data.miners)
        },
        (error) => {
          console.log("you fucked up", error)
        }
      )
  }

  //functions to sort the data after it is loaded
  const sortByNumDesc = (property) => {
    setMiners([...miners].sort((a, b) => b[property] - a[property]))
  }

  const sortByNumAsc = (property) => {
    setMiners([...miners].sort((a, b) => a[property] - b[property]))
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="button" value="Sort Free Space Ascending" onClick={(e) => sortByNumAsc("freeSpace")}/>
        <input type="button" value="Sort Free Space Decending" onClick={(e) => sortByNumDesc("freeSpace")}/> 
      </header>
      <main>
        <table>
          <thead> 
            <tr>
              <th>Miner ID:</th>
              <th>Region</th>
              <th>Rank</th>
              <th>Score</th>
              <th>Free Space</th>
            </tr>
          </thead>  
          <MinerTable miners={miners}   />
        </table>

        
      </main>
    </div>
  );
}

export default App;
