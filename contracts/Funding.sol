//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
contract Funding {
 	address admin;

    constructor(){
        admin = msg.sender;
    }

	modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }

	struct details{
		string cause;
		uint balance;
		uint targetLimit;
		uint targetDate;
	}
		
	uint remAmount;
	uint returnAmount;
	details public Details;
	mapping (address => details) fundDetails;

	function setDetails(address _recipient, string memory _cause, uint _balance, uint _targetLimit, uint _targetDate) public{
		require(msg.sender == admin, "Access Denied"); 
		fundDetails[_recipient] = details(_cause,_balance, _targetLimit,_targetDate);
	}
	
	function acceptDonation(address _recepient) public payable{
        // retrieve the Details struct for the sender
    

		address recepient = _recepient;
		//  details memory recepientDetails = fundDetails[recepient];
		
		
		
        // Make sure that the amount doesnt exceed the target, during each donation
		remAmount = (fundDetails[recepient].targetLimit - fundDetails[recepient].balance);
		if (msg.value <= remAmount){
        	fundDetails[recepient].balance += msg.value;
		}
		else{
		// If the balance exceeds the target amount after adding with the donation, return the remaining amount to the sender
			returnAmount = msg.value - remAmount;
			fundDetails[recepient].balance = fundDetails[recepient].targetLimit;
			payable(msg.sender).transfer(returnAmount);
		}

    }

	function getBal(address _recepient) public view returns(uint){
        return fundDetails[_recepient].balance;
    }
}
