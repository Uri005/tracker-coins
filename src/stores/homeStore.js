import { create } from 'zustand'
import axios from 'axios';
import debounce from '../helpers/debounce';


const homeStore = create((set) => ({
  coins: [],
  query: '',

  setQuery: (e) => {
    set({query: e.target.value})
    homeStore.getState().searchCoins()
  },

  searchCoins: debounce( async () => {
    const {query} = homeStore.getState()
    if(query.lenght > 2){
      const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`) 
      
      const coins = res.data.coins.map( coin => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id
        }
      })

      set({coins})
    } else { }
  }, 500),

  fetchCoins: async () => {
    const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
    
    const coins = res.data.coins.map(coin => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: coin.item.price_btc
      }
    })

    set({coins})
  }
}))

export default homeStore