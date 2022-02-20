import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bulma/css/bulma.min.css';
import {useLocation} from 'react-router-dom';
import "../index.css"
import PriceChart from "./PriceChart";
import SearchBar from "./SearchBar";

function CoinDetail(props) {

  const location = useLocation();

  const [currentCoin, setCurrentCoin] = useState([]);

  //read more functionality
  let [readMoreState,setReadMore] = useState(false);

  //tenemos que convertir el nombre recibido del componente maintable 
  //a su primera letra en minuscula para asi recibir el api de la moneda singular

  const selectedCoin = location.state.id;
  const url = ('https://api.coingecko.com/api/v3/coins/' + selectedCoin);

  useEffect(()=>{
    axios.get(url)
    .then(res => setCurrentCoin([res.data]));
    },[]);

    

  function roundTwoDigits(number){
   return Math.round((number + Number.EPSILON) * 100) / 100;
  }

  const description = currentCoin.map((descrip) => {
    let descripToString;

    if(descrip.description.en.toString().length === 0){
      
      descripToString = "There is currently no data on this cryptocurrency"

      return (
        <div className="textoBonito">{descripToString}</div>
      );

    } else if(descrip.description.en.length <= 800){
      descripToString = descrip.description.en.toString().substring(0,800);
    } else {
      descripToString = descrip.description.en.toString().substring(0,800).concat("...")
    }

      return(
        readMoreState === false ? <div className="textoBonito" dangerouslySetInnerHTML={{__html: descripToString}}/>
        :  <div className="textoBonito" dangerouslySetInnerHTML={{__html: descrip.description.en}}/>
      );
    })

  return(
    <div>
        <div className='box' id='detailBox'>
          <div className='columns is gapless'>
          <div className='columns'>
             <div className='column is-4'> <img id='detailImage' src={location.state.image}/></div>
              <div className='column is-9'><h1 className='title is-3' id="detailName">{location.state.name}</h1></div>
            </div>
          </div>                       
          <hr/>
              <div className="columns is-8">
                <div className="coinData column">Current Price
                <h1 className="title is-4">${location.state.current_price}</h1>
                </div>
                <div className="coinData column">24h % Change
                {location.state.price_change_percentage_24h > 0 ? <h1 className='title is-4' id='positivePercentage'>+{roundTwoDigits(location.state.price_change_percentage_24h)}%</h1>
                 : 
                 <h1 className='title is-5' id='negativePercentage'>{roundTwoDigits(location.state.price_change_percentage_24h)}%</h1>}
                </div>
                <div className="coinData column">Market Cap Rank
                <h1 className="title is-4">Rank #{location.state.market_cap_rank}</h1>
                </div>
              </div>
              <hr/>
            <PriceChart id={location.state.id}/>
            <hr/>
            <div className="description">
            <p className="subtitle"><strong>What is {location.state.name}?</strong></p>
            {description}{readMoreState === false ? <a onClick={()=> {setReadMore(!readMoreState)}}>Read More</a> : <a onClick={()=> {setReadMore(!readMoreState)}}>Read Less</a>}
          </div>
        </div>
    </div>
  );
}

export default CoinDetail;

