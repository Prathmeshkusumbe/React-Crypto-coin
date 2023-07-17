
import CoinDetails from './components/CoinDetails';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Coins from './components/Coins';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Coins />}/>
        <Route path="/coins/:id" element={<CoinDetails />}/>

      </Routes>
    </Router>
  );
}

export default App;
