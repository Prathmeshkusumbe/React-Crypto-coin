import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Chart from './Chart'
import Loader from "./Loader";

export default function CoinDetails() {

  const [coin,setCoin] = useState({});
  const [error,setError] = useState();
  const [loader,setLoader] = useState(true);
  const [currency,setCurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartArr, setchartArr] = useState([]);
  const params = useParams();

  const currencySymbol = currency === 'inr' ? '₹' : currency === 'usd' ?  '$' : '€';

  const daysArr = ['24h', '7d', '14d', '30d', '60d', '200d', '365d', 'max'];

  const changeDays = (days) => {
    setLoader(true);
    setDays(days);
    //setLoader(false);
  }

  useEffect(() => {
    //console.log('in effect');
    axios.get('https://api.coingecko.com/api/v3/coins/'+params.id)

      .then(response => {
        setLoader(false);
        setCoin(response.data);
        //console.log(response.data);


      })
      .catch(error => {
        //console.log(error);
        //setLoader(false);
        setError('error occured while fetching data')
      });

    axios.get('https://api.coingecko.com/api/v3/coins/'+params.id+'/market_chart?vs_currency='+currency+'&days='+days)
      .then(res => {
        setchartArr(res.data.prices);
        //console.log(res);
      })
      .catch(chart_data_error => {
        setError('error while fething chart data')
      })

  },[params.id,currency,days]);

  if(error) return <div>error while fetching the data</div>

  return( <>
    { loader ? <Loader /> :
    <div className="coin-details">
      <div className="container">
        <div className="time-span-btns">
          {daysArr.map((item) =>{
            return(<span key={item} onClick={() => changeDays(item)}>{item}</span>)
          })}
        </div>
        <div className="currencies">
          <input type="radio" id="INR" name='INR' onChange={ () => setCurrency('inr') } checked={(currency==='inr')}></input>
          <label htmlFor="INR">inr</label>
          <input type="radio" id="USD" name='USD' checked={(currency==='usd')} onChange={()=>setCurrency('usd')}></input>
          <label htmlFor="USD">USD</label>
          <input type="radio" id="EUR" name='EUR' checked={currency==='eur'} onChange={() =>setCurrency('eur')} ></input>
          <label htmlFor="EUR">EUR</label>
        </div>
        <div className="last-updated-info">last update on {coin.last_updated.split('T')[0]}</div>
        <img className="coin-logo" src={coin.image.large}></img>
        <div>{coin.name}</div>
        <div className="p-pcp-r">
          <div className="price">{currencySymbol}{coin.market_data.current_price[currency]}</div>
          <div className="pcp">{coin.market_data.price_change_percentage_24h}%</div>
          <div className="rank">#{coin.market_cap_rank}</div>
        </div>
        <div>low={coin.market_data.low_24h[currency]} high={coin.market_data.high_24h[currency]}</div>
        <Chart arr={chartArr} days={days} currencySymbol={currencySymbol}/>
        <div>
          <div>max Supply: {coin.market_data.max_supply}</div>
          <div>Circulating Supply: {coin.market_data.circulating_supply}</div>
          <div>Market Cap: {coin.market_data.market_cap[currency]}</div>
          <div>All time low: {coin.market_data.atl[currency]}</div>
          <div>All time high: {coin.market_data.ath[currency]}</div>
        </div>
      </div>
    </div>
    }</>
  )
}
