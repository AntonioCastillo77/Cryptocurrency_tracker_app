import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bulma/css/bulma.min.css';
import "../index.css";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';



function PriceChart(props) {

const [priceData,setPriceData] = useState([]);
    
  const url = (`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=30&interval=hourly`);

      useEffect(()=>{
      axios.get(url)
      .then(res => setPriceData(res.data));
      },[]);

      function fillHoursArray(totalHours){
          const arr = [];
          for(let i = 0; i < totalHours; i++){
              arr.push('   ')
          }
          return arr;
      }
    
      const data = { 
        labels: fillHoursArray(720),
        datasets: [{
          label: props.id,
          data: priceData.prices,
          pointRadius: 0,
          borderWidth:2,
          fill: true,
          borderColor: 'hsl(171, 100%, 41%)',
          tension: 0.1,
          responsive: true
        }],
      };

  return(
    <div>
      <p className="subtitle"><strong>Price action for the last 30 days</strong></p>
     <Line id={props.id} data={data}/>
    </div>
  ); 
}

export default PriceChart;
