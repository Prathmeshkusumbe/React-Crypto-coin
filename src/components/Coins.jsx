import React from "react";
import { useEffect, useState } from "react"
import axios from 'axios'
import '../styles/Coins.css'
import {Link } from 'react-router-dom'
import Loader from "./Loader";
const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {

    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr')

      .then(response => {
        console.log(response);
        setCoins(response.data);
        setLoader(false)
      })
      .catch(error => {
        console.log(error);
      })

  },[]);

  return (<>
    { loader ? <Loader/> :
    <div className="list-coins">
          {coins.map(item => (
            <Link key={item.id} to={'/coins/'+item.id}>
              <div  className="single-coin">
                <div className="coin-image"><img src={item.image}></img></div>
                <div className="coin-name">{item.name}</div>
                <div className="coin-price">₹{item.current_price}</div>
              </div>
            </Link>
          )) }
    </div>
  }
  </>)
}
export default Coins