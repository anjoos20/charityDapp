import React from 'react'
import { abi, networks } from '../build/contracts/Funding.json'
import Router from 'next/router'

// 
// Ethereum provider API by the metamask
// i.e. window.ethereum - used to connect to metamask(Global object that is injected into the window)
// Allow us to request accounts from metamask and thus users can sign the blockchain transactions
const Web3 = require('web3')


const addcause = () => {
//  Handlesubmit registers the new request onto the blockchain
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        //  Creating a contract instance using the Web3.js library
        //  This contract instance is used to interact with the the smartcontract functions and eventlogs
        const web3 = new Web3(ethereum)
        const contractAddress = networks['5777'].address;
        // const contractAddress ="0xB5BEDa63738a527b35464a1B8330F2B8cE1DC5D7"
        const contractABI = abi;
        const contractInstance = new web3.eth.Contract(contractABI, contractAddress)
        const txAccount = '0x7C059a1Ae6cf434f050d74EFC9C0f91B6Bb8119a';
        
        // Get data from the form.
        const data = {
          purpose: event.target.purpose.value,
          address: event.target.address.value,
          // Web3 utils used to convert the input ether to Wei
          // Since solidity cant handle floating point variables ether is to be converted to Wei
          amount: web3.utils.toWei(event.target.amount.value, 'ether'),
          commission: web3.utils.toWei(event.target.commission.value, 'ether')
        }
        try {
          // accessing the smart contract function setDetails using web3js
          // This function is used to save the setails of the new Campaign in a struct-mapping 
          let txR = await contractInstance.methods.setDetails(data.address, data.purpose, data.amount,  data.commission).send({from: txAccount})
          console.log("txR", txR);
          console.log("setting local storage");
          localStorage.setItem('purpose',data.purpose);
          localStorage.setItem('address',data.address);
          localStorage.setItem('amount',event.target.amount.value);
          localStorage.setItem('date',event.target.date.value);
          localStorage.setItem('commission',event.target.commission.value)
          alert("The details registered successfully")
          Router.reload(window.location.pathname);
        } catch(error){
          console.error(error)
        }    
    }
  return (
<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
<h4 className='cause1'>Add new requirement for fund</h4>
<form onSubmit={handleSubmit}>
  <div className="row mb-4">
    <div className="col">
      <div className="form-outline">
        <input type="text" id="purpose" name="purpose" required minLength="10" maxLength="30" className="form-control" />
        <label className="form-label" >Purpose of Fund</label>
      </div>
    </div>
  </div>

  <div className="form-outline mb-4">
  <input type="text" id="address" name="address" required minLength="42" maxLength="42" className="form-control" />
    <label className="form-label" >Address</label>
  </div>

  <div className="form-outline mb-4">
  <input type="number" id="amount" name="amount" required className="form-control" />
    <label className="form-label">Required amount</label>
  </div>

  <div className="form-outline mb-4">
    <input type="date" name="date" id="date" className="form-control" />
    <label className="form-label">Target date</label>
  </div>

  <div className="form-outline mb-4">
    <input type="commission" name="commission" id="commission" className="form-control" />
    <label className="form-label">Commission in ether</label>
  </div>

  <button type="submit" className="btn btn-success mb-4">Submit</button>
</form>
</div>
  )
  }

export default addcause