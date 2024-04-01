import {ethers} from 'ethers';

function Navigation({account, setAccount}) {

    const connectHandler = async () => {
//Trae la cuenta conectada (al empezar el código, conectar metamask, la red y la cuenta de hardhat para que esto funcione)
const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
console.log('accounts', accounts)
const account = ethers.getAddress(accounts[0])
console.log(account)
setAccount(account)
    }

  return (
    <nav>
        <div>
            <h1>
                DappEcommerce
            </h1>
        </div>
        {
            account ?
  (
    <button>
    {account.slice(0,6) + '...' + account.slice(38,42)}
            </button>
  ) : (
    <button onClick={connectHandler}>
   Connect
            </button>
  )
        }
       
  
    </nav>
  )
}

export default Navigation
