import React from 'react'
import { abi, networks } from '../build/contracts/Funding.json'

// 
// Ethereum provider API by the metamask
// i.e. window.ethereum - used to connect to metamask(Global object that is injected into the window)
// Allow us to request accounts from metamask and thus users can sign the blockchain transactions
const Web3 = require('web3')


const addcause = () => {

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        let validDate = new Date(event.target.date.value)
        console.log("valid date is:",validDate)
        validDate.setDate(validDate.getDate() + 7);
        const deadLine = Math.floor(validDate.getTime() / 1000);
        const data = {
          purpose: event.target.purpose.value,
          address: event.target.address.value,
          amount: event.target.amount.value,
          date: deadLine
        }

        const web3 = new Web3(ethereum)
        const contractAddress = networks['5777'].address;
        const contractABI = abi;
        const contractInstance = new web3.eth.Contract(contractABI, contractAddress)
        const txAccount = '0xE43a324f2439BA3a5389585F362396649504E697';
        let txR = await contractInstance.methods.setDetails(data.address, data.purpose, 0, data.amount, data.date).send({from: txAccount})
        console.log("txR", txR);
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
    <input type="date" id="date" className="form-control" />
    <label className="form-label">Target date</label>
  </div>

  <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
</form>
</div>
  )
  }

export default addcause