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
		uint commission;
	}
		
	details public Details;
	mapping (address => details) public fundDetails;

	event donateEvent(address indexed sender, uint amount);

	function setDetails(address _recipient, string memory _cause, uint _targetLimit, uint _commission) public{
		require(msg.sender == admin, "Access Denied"); 
		fundDetails[_recipient] = details(_cause, 0 , _targetLimit,_commission);
	}
	
	function acceptDonation(address _recepient) public payable{
    
        // adding commission with the required amount
		uint actualTarget = fundDetails[_recepient].targetLimit + fundDetails[_recepient].commission;
		uint remAmount = (actualTarget - fundDetails[_recepient].balance);
		// Make sure that the amount doesnt exceed the target+commsission, during each donation
		if (msg.value <= remAmount){
        	fundDetails[_recepient].balance += msg.value;
			emit donateEvent(msg.sender,msg.value);
		}
		else{
		// If the balance exceeds the target+commission, return the remaining amount to the sender
			fundDetails[_recepient].balance = actualTarget;
			payable(msg.sender).transfer(msg.value - remAmount);
			emit donateEvent(msg.sender,(remAmount));
		}
    }

	function getBal(address _recepient) public view returns(uint){
        return fundDetails[_recepient].balance;
    }
}