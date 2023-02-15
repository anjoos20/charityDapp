import React from 'react'
import { useState, useEffect } from "react";
import { abi, networks } from '../build/contracts/Funding.json'
import Router from 'next/router'
const Web3 = require('web3')

const donate = () => {

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
      // This function helps to record the donations on the blockchain
      const handleDonate = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        //  Creating a contract instance using the Web3.js library
        //  This contract instance is used to interact with the the smartcontract functions and eventlogs
        const web3 = new Web3(ethereum)
        const contractAddress = networks['5777'].address;
        const contractInstance = new web3.eth.Contract(abi, contractAddress)
        const senderAccount = '0x0a730Ad0403Eb32aFcEa400640883F3214D79020';
        // Web3 utils used to convert the input ether to Wei
        const donAmount = web3.utils.toWei(event.target.inputAmount.value, 'ether');
        try {
            // accessing the smart contract function acceptDonation using web3js
            // This function is used to update the donations for a particular campain in a struct-mapping
            let txR = await contractInstance.methods.acceptDonation(cardBody1).send({from: senderAccount, gas: 3000000,value:donAmount})
            console.log("success",txR);
            total = localStorage.getItem("total") + event.target.inputAmount.value;
            alert("Thank you for your contribution!")
            Router.reload(window.location.pathname)
        }catch(error){
            console.error(error)
          }   
      }
      // This function helps to get the achieved amount for a particular campaign
      const handleStatus = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        let recAddress = localStorage.getItem("address");
        //  Creating a contract instance using the Web3.js library
        //  This contract instance is used to interact with the the smartcontract functions and eventlogs
        const web3 = new Web3(ethereum)
        const contractAddress = networks['5777'].address;
        const contractInstance = new web3.eth.Contract(abi, contractAddress)
        // accessing the smart contract function getBal using web3js
        // getBal accepts recipient address as the input and returns the corresponding balance
        contractInstance.methods.getBal(recAddress).call((error, balance) => {
          if (error) {
            alert("Error: Check console")
            console.error(error);
          } else {
            let balAmount = web3.utils.fromWei(balance, 'ether')

            alert(`Total Ether received  ${balAmount}`);
          }
        });
      }
      //  This function helps to close a particular campaign and disburse the fund to the corresponding accounts
      const handleClosure = async (event) => {
        event.preventDefault()
        let recAddress = localStorage.getItem("address");
        //  Creating a contract instance using the Web3.js library
        //  This contract instance is used to interact with the the smartcontract functions and eventlogs
        const web3 = new Web3(ethereum)
        const contractAddress = networks['5777'].address;
        const contractInstance = new web3.eth.Contract(abi, contractAddress)
        const txAccount = "0x2b6032Cd0E8720377E40599fb180B3E5385D6A1e"
        // accessing the smart contract function accountClosure using web3js
        // accountClosure function disburses the fund to the recipient address, commission to the contract owner
        //  and deletes the struct mapping for the corresponding address 
        try{
          const tx = await contractInstance.methods.accountClosure(recAddress).send({from:txAccount});
          console.log(tx); // Transaction hash
          localStorage.clear();
          alert("Account successfully closed! Balance transferred to respective accounts")
          Router.reload(window.location.pathname)
        }catch(error){
        console.error(error)
        }   
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
  <form className="form-inline" onSubmit={handleStatus}>
    <button type="submit" className="btn btn-primary mx-sm-3 mb-2">Amount Achieved </button>
  </form>
  <form className="form-inline" onSubmit={handleClosure}>
    <button type="submit" className="btn btn-danger mx-sm-3 mb-2">Close the Account </button>
  </form>
</div>
  )
}

export default donate