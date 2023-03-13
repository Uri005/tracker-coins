import { create } from 'zustand'
import axios from 'axios';

const showStore = create((set) => ({ 
  
  graphData: [],
  data: null,
  
  fetchData: async (id) => {
    const [graphRes, dataRes] = await Promise.all([
      await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=121`),
      await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`)
    ]);
    
    const graphData = graphRes.data.prices.map((price) => {
      const [timestamp, p] = price; //p = price destructured
      const date = new Date(timestamp).toLocaleDateString("en-us");
      return {
          Date: date,
          Price: p,
      };
    });
    
    console.log(dataRes)
    set({ graphData })
    set({ data: dataRes.data })
    
  }
}));

export default showStore