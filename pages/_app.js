// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import Link from 'next/link'


function MyApp({ Component, pageProps }) {
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
              <a className="nav-link" href="#">Donate</a>
          </li>
          <li className="nav-item px-4">
              <a className="nav-link">About Us</a>
          </li>
          <li className="nav-item button-nav">
              <button type="button" className="btn btn-success button-nav">Connect wallet</button>
          </li>
      </ul>
  </div>
  </nav>
  <Component {...pageProps} />
  </div>
  )
}

export default MyApp
