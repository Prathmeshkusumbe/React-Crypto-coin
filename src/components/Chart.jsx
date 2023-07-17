import { Line } from 'react-chartjs-2'
import {Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJs.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);
export default function Chart({arr=[], currency, days}){
  //console.log(arr[0][0]);
  const prices = [];
  const date = [];
  for(let i=0; i <  arr.length; i++ ){
    days === '24h' ? date.push(new Date(arr[i][0]).toLocaleTimeString()) :date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }
  return (
    <Line options={{responsive:true,}}
      data={{
        labels: date,
        datasets: [{
          label: "price",
          data:prices, borderColor:"rgb(255,99,132)", backgroundColor:"rgba(255,99,132,0.5)",
        },],
      }}
    ></Line>)
}