
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MinerTable from './MinerTable'
import TableHeader from './TableHeader'

function App() {
  //sets up initial state of the app
  const [miners, setMiners] = useState([]);
  const [unfilteredMiners, setUnfilteredMiners] = useState([]);
  useEffect(() => {
    if (miners.length === 0) {
      getDataRequest();
    }
  }, []);
  
  const getDataRequest = () => {
    axios.get(`https://api.filrep.io/api/v1/miners?limit=400`)
      .then(
        (result) => {
          setMiners(result.data.miners)
          setUnfilteredMiners(result.data.miners)
        },
        (error) => {
          console.log("you fucked up", error)
        }
      )
  }

  //sorting data state 
  const [sortBy, setSortBy] = useState({ column: "rank", dataType:"number", asc: true })

  const handleColumnSort = (columnName, dataType ) => {
    setSortBy({ columnName, dataType, asc: !sortBy.asc })
    setIsSortingColumn({...isSortingColumnDefault, [columnName]: true})
   }

   useEffect(() => {
    if (sortBy.asc) { 
      sortAsc() 
    }
    if (!sortBy.asc) { 
      sortDesc() 
    }
  }, [sortBy]);
  
  //sorting visual indicators
  const isSortingColumnDefault = {
    region: false,
    rank: false,
    score: false,
    freeSpace: false
  }
  const [isSortingColumn, setIsSortingColumn] = useState({
    region: false,
    rank: true,
    score: false,
    freeSpace: false
  })
  
  // const activateArrow = (column) => {
  //   if ( isSortingColumn[sortBy.column] ) {
      
  //   }
  // }
  
  //sorting data functions
  const sortAsc = () => {
    if (sortBy.dataType === "string") {
      setMiners([...miners].sort((a, b) => a[sortBy.columnName] > b[sortBy.columnName] ? 1 : -1))  
    } 
    if ( sortBy.dataType === "number" ) {
      setMiners([...miners].sort((a, b) => a[sortBy.columnName] - b[sortBy.columnName]))
    }
  }
  
  const sortDesc = () => {
    if (sortBy.dataType === "string") {
      setMiners([...miners].sort((a, b) => a[sortBy.columnName] > b[sortBy.columnName] ? -1 : 1))  
    } 
    if (sortBy.dataType === "number") {
      setMiners([...miners].sort((a, b) => b[sortBy.columnName] - a[sortBy.columnName]))
    }
  }
  
  //filtering data functions
  const [region, setRegion] = useState("All Regions")
  const handleRegionChange = (e) => {
    setRegion(e.target.value)
  }
  
  const filterByRegion = () => { 
    if (region === "All Regions") {
      return setMiners([...unfilteredMiners])
    }
    return setMiners([...unfilteredMiners].filter(miner => miner.region === region ))
  }
  useEffect(() => {
    filterByRegion()
  }, [region])
  
  

  return (
    <div className="App">
      <header className="App-header">
        <label htmlFor="filter-by-region">Choose a Region:</label>
        <select onChange={handleRegionChange} defaultValue="All Regions" id="filter-by-region">
          <option value="All Regions">All Regions</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
          <option value="Central America">Central America</option>
          <option value="North America">North America</option>
        </select>

      </header>
      <main>
      {/* <img src={arrow} className="arrow"/> */}
        <table>
          <thead> 
            <tr className="column">
              <th>Miner ID:</th>
              <TableHeader handleColumnSort={handleColumnSort} isSortingColumn={isSortingColumn} sortBy={sortBy} columnName="region" dataType="string"columnTitle="Region" />
              <TableHeader handleColumnSort={handleColumnSort} isSortingColumn={isSortingColumn} sortBy={sortBy} columnName="rank" dataType="number"columnTitle="Rank" />
              <TableHeader handleColumnSort={handleColumnSort} isSortingColumn={isSortingColumn} sortBy={sortBy} columnName="score" dataType="number"columnTitle="Score" />
              <TableHeader handleColumnSort={handleColumnSort} isSortingColumn={isSortingColumn} sortBy={sortBy} columnName="freeSpace" dataType="number"columnTitle="Free Space" />
            </tr>
          </thead>  
          <MinerTable miners={miners}   />
        </table>

        
      </main>
    </div>
  );
}

export default App;
