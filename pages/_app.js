// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Link from 'next/link'
import Web3 from 'web3';
import {useState} from 'react';

function MyApp({ Component, pageProps }) {
  const [error, setError] = useState('');
  let web3;
    // Ethereum provider API by the metamask
    // i.e. window.ethereum - used to connect to metamask(Global object that is injected into the window)
    // Allow us to request accounts from metamask and thus users can sign the blockchain transactions
    
    const connectWalletHandler = async () =>{
        alert("connecting..")
        if (typeof window !== "undefined" && typeof window.ethereum !== 'undefined'){
          try{
            await window.ethereum.request({ method: "eth_requestAccounts" })
            web3 = new Web3(window.ethereum);
          }catch(err){
            setError(err.message)
          }
        }
        else{
          alert("Please install metamask")
        }
    }
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/">HelpUnlimited</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
   <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav home-item">
          <li className="nav-item active">
              <Link href='/' className="nav-link">Home</Link>
          </li>
          <li className="nav-item px-4">
               <Link href='addcause'className="nav-link">New Cause</Link>
          </li>
          <li className="nav-item">
              <Link href='donate'className="nav-link">Donate</Link>
          </li>
          <li className="nav-item px-4">
              <a className="nav-link">About Us</a>
          </li>
          <li className="nav-item button-nav">
              <button onClick={connectWalletHandler} type="button" className="btn btn-success button-nav">Connect wallet</button>
          </li>
      </ul>
  </div>
  </nav>
  <section>
      <div className="container text-danger">
          <p>{error}</p>
      </div>
  </section>
  <Component {...pageProps} />
  </div>
  )
}

export default MyApp
