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
    
        
        let validDate = new Date(event.target.date.value)
        console.log("valid date is:",validDate)
        validDate.setDate(validDate.getDate());
        const deadLine = Math.floor(validDate.getTime() / 1000);
        

        const web3 = new Web3(ethereum)
        const contractAddress = networks['5777'].address;
        const contractABI = abi;
        const contractInstance = new web3.eth.Contract(contractABI, contractAddress)
        const txAccount = '0x96FAedcd5e0E9dB763bD510Aef7aC05CaD1C528B';
        
        // Get data from the form.
        const data = {
          purpose: event.target.purpose.value,
          address: event.target.address.value,
          amount: web3.utils.toWei(event.target.amount.value, 'ether'),
          date: deadLine,
          commission: event.target.commission.value
        }
        try {
          let txR = await contractInstance.methods.setDetails(data.address, data.purpose, data.amount,  data.commission).send({from: txAccount})
          console.log("txR", txR);
          console.log("setting local storage");
          localStorage.setItem('purpose',data.purpose);
          localStorage.setItem('address',data.address);
          localStorage.setItem('amount',event.target.amount.value);
          localStorage.setItem('date',event.target.date.value);
          localStorage.setItem('commission',data.commission)
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