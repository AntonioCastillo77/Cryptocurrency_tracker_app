import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "../index.css";
import axios from "axios";


function SearchBar() {
  const url = `https://api.coingecko.com/api/v3/search?query=`;

  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [activateCall, setActivateCall] = useState({
    goToDetail: false,
    selectedCoin: "",
  });
  

  useEffect(() => {
    if (searchInput.length <=1){
      setData([]);
    } else {
      axios.get(url + searchInput).then((res) => setData(res.data.coins));
    }
  },[searchInput])

  useEffect(() => {
    if (activateCall.goToDetail === true) {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${activateCall.selectedCoin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
      axios.get(url).then((res) => {
        navigate("/coinInfo", {
          state: {
            id: res.data[0].id,
            name: res.data[0].name,
            current_price: res.data[0].current_price,
            price_change_percentage_24h:
              res.data[0].price_change_percentage_24h,
            market_cap: res.data[0].market_cap,
            market_cap_rank: res.data[0].market_cap_rank,
            image: res.data[0].image,
          },
        });
      });
    }
  }, [activateCall]);



  return (
    
    <div className="field">
      <div className="dropdown is-active">
        <div className="dropdown-trigger">
        <div className="control has-icons-right">
          <label htmlFor="searchInput">Search for a coin</label>
          <input
            className="input is-primary"
            id="searchInput"
            type="text"
            placeholder="Search for a Coin"
            name="searchInput"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            autoComplete="off"
            />
           
           <a onClick={()=>{
              setSearchInput('');
            }}>
            <img id="closeDropdownBtn" src={require('./icons/close.png')}/>
            </a> 
        </div>
        </div>
        <div className="dropdown-menu" id="dropdownMenu" role="menu"> 
          <div className="dropdownContent">
            {data.map((elem, i) => {
              i++;
              return i < 10 ? (
                <a
                  key={i}
                  href="#"
                  className="dropdown-item"
                  onClick={() =>{
                    setActivateCall({ goToDetail: true, selectedCoin: elem.id });
                  }
                  }
                  
                 >
                  {elem.name}
                </a>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>

  );
}

export default SearchBar;