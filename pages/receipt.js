import React from 'react'
import { abi, networks } from '../build/contracts/Funding.json'
const Web3 = require('web3')

const receipt = () => {
        
  const handleReceipt = async (event) => {
        event.preventDefault()
        const web3 = new Web3(ethereum)
        const contractAddress = networks['5777'].address;
        const contractABI = abi;
        const contractInstance = new web3.eth.Contract(contractABI, contractAddress)
        const sender= event.target.sender.value;
        let donAmount = 0;
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

              });
          }
      });
        
        //  contractInstance.events.donateEvent().on(
        // 'data', function(event) {
        //     console.log("hello")
        //     console.log("event is",event);
        //  }).on('error', console.error);

        // Event1.get(function(err, result) {
        // if (err) {
        //     console.log(err)
        //     return;
        // }
        // console.log("Found ", result);
        // })
    }
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
                <p className="card-text">Donor Address:</p>
                <p className="card-text">Total donations till now in ether: </p>
                <p className="card-text">We vlaue your donations. Thank you!</p>
            </div>
        </div>
    </div>

    
  )
}

export default receipt