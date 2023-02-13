import React from 'react'
import { abi, networks } from '../build/contracts/Funding.json'
import { useState, useEffect } from "react";
const Web3 = require('web3')

const receipt = () => {
    let [donor, setDonor] = useState();
    let [donation, setDonation] = useState();
    let amt =0;
    
    const handleReceipt = async (event) => {
        event.preventDefault()
        const web3 = new Web3(ethereum)
        const contractAddress = networks['5777'].address;
        const contractABI = abi;
        const contractInstance = new web3.eth.Contract(contractABI, contractAddress)
        const sender= event.target.sender.value;
        
        alert(sender)
      contractInstance.getPastEvents("donateEvent", {
          filter: { sender: sender },
          fromBlock: 0,
          toBlock: "latest"
      }, function(error, events) {
          if (error) {
              console.log(error);
          } else {
              events.forEach(function(event) {
                  console.log("Event:", event);
                  console.log("Donor address:", event.returnValues.sender);

                  console.log("Donation amount:", event.returnValues.amount);
                  const etherValue = Web3.utils.fromWei(event.returnValues.amount, 'ether');
                  let rAmount = parseInt(etherValue)
                  console.log("ramount",rAmount)
                  amt += rAmount;
                  console.log("amount",amt)
              });
          }
          setDonor(sender)
          setDonation(amt)
      });
    
    }

    useEffect(() => {  
    },[setDonor,setDonation]);
      
  return (
    <div>
        <form className="form-inline" onSubmit={handleReceipt}>
        <div className="form-group mx-sm-3 mb-2">
            <input type="text" className="form-control" name="sender" id="sender" placeholder="Enter Address"/>
        </div>
            <button type="submit" className="btn btn-primary mb-2">Get receipt</button>
        </form>
        <div className="card md-3 lg-3" style={{width: 600, margin:50}}>
            <div className="card-body">
                <h5 className="card-title">Donation receipt from HelpUnlimited</h5>
                <p className="card-text">Donor Address:{donor}</p>
                <p className="card-text">Total donations till now in ether: {donation}</p>
                <p className="card-text">We vlaue your donations. Thank you!</p>
            </div>
        </div>
    </div>
  )
}


export default receipt