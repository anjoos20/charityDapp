import React from 'react'
import { useState, useEffect } from "react";
import { abi, networks } from '../build/contracts/Funding.json'
const Web3 = require('web3')

const donate = () => {

    // Stop the form from submitting and refreshing the page.
    // event.preventDefault();

    const [cardTitle, setcardTitle] = useState();
    const [cardBody1, setcardBody1] = useState();
    const [cardBody2, setcardBody2] = useState();
    const [cardBody3, setcardBody3] = useState();
    const [cardBody4, setcardBody4] = useState();

    useEffect(() => {
        // Perform localStorage action
        const title = localStorage.getItem("purpose");
        const address = localStorage.getItem("address");
        const amount = localStorage.getItem("amount");
        const date = localStorage.getItem("date");
        const commission = localStorage.getItem("commission");
        setcardTitle(title)
        setcardBody1(address);
        setcardBody2(amount)
        setcardBody3(date)
        setcardBody4(commission)
      }, [setcardTitle,setcardBody1,setcardBody2,setcardBody3,setcardBody4])

      const handleDonate = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        const web3 = new Web3(ethereum)
        const contractAddress = networks['5777'].address;
        const contractInstance = new web3.eth.Contract(abi, contractAddress)
        const senderAccount = '0x7D225e98AbCaDE13bB850626fCf626F0F42cB1A8';
        const donAmount = web3.utils.toWei(event.target.inputAmount.value, 'ether');
        try {
            console.log("cardBody1",cardBody1);
            // let txR = contractInstance.methods.acceptDonation(cardBody1).send({from: senderAccount, gas: 3000000,value:web3.utils.toWei(event.target.inputAmount.value, 'ether')})
            let txR = contractInstance.methods.acceptDonation(cardBody1).send({from: senderAccount, gas: 3000000,value:donAmount})
            console.log("donation is", donAmount);
            console.log("success",txR);
        }catch(error){
            console.error(error)
          }   
        
        
            // web3.eth.sendTransaction({
        //     from: senderAccount,
        //     to: contractAddress,
        //     value: web3.utils.toWei('1', 'ether'),
        //   });
      }

  return (
    <div className="card md-3 lg-3" style={{width: 600, margin:50}}>
    <div className="card-body">
    <h5 className="card-title">{cardTitle}</h5>
    <p className="card-text">Receiver Address:{cardBody1}</p>
    <p className="card-text">Amount:{cardBody2} ether</p>
    <p className="card-text">Target Date:{cardBody3}</p>
    <p className="card-text">Commission in ether:{cardBody4}</p>
    <form className="form-inline" onSubmit={handleDonate}>
       <div className="form-group mx-sm-3 mb-2">
        <label className="sr-only">Amount</label>
        <input type="number" className="form-control" name="inputAmount" id="inputAmount" required minLength="1" maxLength="2" placeholder="Amount in ether"/>
       </div>
       <button type="submit" className="btn btn-success mb-2">Donate amount</button>
    </form>
  </div>
</div>
  )
}

export default donate