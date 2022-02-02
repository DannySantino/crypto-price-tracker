import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  let n = 0;
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(c => c.name.toLowerCase().includes(search.toLocaleLowerCase()));

  return (
    <div className='coin-app'>
      <div className='header'>
        <div className='logo'><h1>coinspy</h1></div>
        <div className='coin-search'>
          <form>
            <input type='text' placeholder='Search' className='coin-input' onChange={handleChange} />
          </form>
        </div>
        <div className='links'>
          <h4>Converter</h4>
          <h4>Exchanges</h4>
        </div>
      </div>
      <div className='navs'>
        <div>
          <h4>Top 100 currencies</h4>
          <span>by market capitalisation</span>
        </div>
      </div>
      <div className="coin-header">
        <span className='coin-n'>#</span>
        <span className='coin-name'>Coin</span>
        <span className='coin-sym center'>Symbol</span>
        <span className='coin-price center'>Price</span>
        <span className='coin-volume center'>Total Volume</span>
        <span className='coin-percent center'>Price 24h</span>
        <span className='coin-marketcap center'>Market Cap</span>
      </div>
      {filteredCoins.map(c => {
        n++;
        return <Coin
          key={c.id}
          n={n}
          name={c.name}
          image={c.image}
          symbol={c.symbol}
          volume={c.total_volume}
          price={c.current_price}
          priceChange={c.price_change_percentage_24h}
          marketcap={c.market_cap}
        />
      })}
    </div>
  );
}

export default App;
