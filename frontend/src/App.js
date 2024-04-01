import './App.css';
import { useEffect, useState } from 'react';

import Navigation from './components/Navigation';


function App() {

const [account, setAccount] = useState(null)
  //Trae cuentas del navegador


 const loadBlockchainData = async () => {
  
}


useEffect(()=>{
loadBlockchainData()

},[])


  return (
    <div className="App">
      <Navigation account={account} setAccount={setAccount}/>
     Dappecommerce
    </div>
  );
}

export default App;
