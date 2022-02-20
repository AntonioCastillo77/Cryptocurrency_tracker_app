import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bulma/css/bulma.min.css';
import "../index.css"
import {useNavigate} from 'react-router-dom';
import SearchBar from "./SearchBar";




function MainTable() {


  
  const [currencies,setCurrencies] = useState([]);
  const navigate = useNavigate();
  const [count,setCount] = useState(1)
  const [Url,setUrl] = useState(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${count}&sparkline=false`)
  
 
    useEffect(()=>{
      setUrl(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${count}&sparkline=false`)
      axios.get(Url)
      .then(res => setCurrencies(res.data));
    },[count,Url]);

    function prevPage(){
      if(count >= 2){
        setCount(count -1)
      } else if(count <= 1) {
        setCount(1)
      }
    }



  function coinInfo(currentCoin){
    navigate("/coinInfo",{
      state:{
        id: currentCoin.id,
        name:currentCoin.name, 
        current_price: currentCoin.current_price,
        price_change_percentage_24h:currentCoin.price_change_percentage_24h,
        market_cap: currentCoin.market_cap,
        market_cap_rank: currentCoin.market_cap_rank,
        image: currentCoin.image,
        ath_date: currentCoin.ath_date,
        ath_change_percentage: currentCoin.ath_change_percentage,
        high_24h:currentCoin.high_24h
      }
    });
  }

  function roundTwoDigits(number){
    return Math.round((number + Number.EPSILON) * 100) / 100;
   }



  return (
    <div>
    <div className="container">
      <SearchBar/>
    </div>
    <div className="container" id="mainTableWrapper">
    <h1 className="title is-4" id="coinSub">Click on any coin's name to see it's information</h1>
    <table id="cryptoTable" className="table is-centered">
    <thead>
      <tr>
        <th>Position</th>
        <th id="nameheader">Name</th>
        <th id="logoheader" >Logo</th>
        <th>Price</th>
        <th>Symbol</th>
        <th>24h %</th>
        <th>Market Cap</th>
      </tr>
    </thead>
    <tbody>
        {currencies.map((coin) => {
            return(
              <tr key={coin.id}>
              <td id="ranking">#{coin.market_cap_rank}</td>
              <td><h1 className="title is-6" id="mainTableNames"><a onClick={() => coinInfo(coin)}>{coin.name}</a></h1></td>
              <td><img className='tableimage' src={coin.image} id="tableImage"/></td> 
              <td>${coin.current_price.toLocaleString('en-US')}</td>
              <td>{coin.symbol}</td>
              {coin.price_change_percentage_24h > 0 ? <td className='positive'>{roundTwoDigits(coin.price_change_percentage_24h)}%</td>  : <td className='negative'>{roundTwoDigits(coin.price_change_percentage_24h)}%</td>}
              <td>${coin.market_cap.toLocaleString('en-US')}</td>
              </tr>
             );
          })}
        </tbody>
      </table>
    </div>
    <div className="buttons has-addons">
          <button className="button is-primary" onClick={()=>{prevPage()}}>Prev</button>
          <button className="button is-primary" onClick={()=>{setCount(count+1)}}>Next</button>
    </div>
  </div>
  )
}

export default MainTable;
