Ethereum based Charity Application
***********************************

This is a dApp built on the Ethereum blockchain. It helps the Charity organization to receive donations.

*****************************
The process flow is as below:
******************************
1. The charity requester submits a charity request to the charitable trust admin which includes details such as fundraising goal, donation address, and deadline.
2. The admin of the dApp reviews and approves the charity request, registering it on the dApp.
3. Donors can view the details the fundraising goal, donation address, and deadline.
4. The donor can make a donation by inputting the required ether and clicking the donate button
5 The dApp keeps track of the amount of Ether received for each charity request and displays the progress towards the fundraising goal on clicking the achieved amount button.
6. If the fundraising goal is met before the deadline, the admin closes the charity request and disburses the funds to the charity requester. The commission is credited to the admin account
7. If the deadline is reached and the fundraising goal is not met, the admin sends the received amount minus commission to the requester. The commission gets credited to the admin account
8. Donors can request a receipt for their total donations on the dApp.

******************************
Steps to run the application
******************************
1. Install nodeJS
2. npm install  *******To install the dependencies in package.json
3. npm install -g truffle ******* Install truffle
4. npm i ganache -p 8545 -i 5777 ********** Install ganache
5. Download and install the metamask extension for browser
6. ganache -p 8545 -i 5777 ******** Run ganache
7. truffle migrate
*********** Register the new charity request
8. CHARITY-DAPP/pages/addcause.js -> Change the txAccount at line number 23.
    This should be the same as contract owner address(contract deployer address). 
    Only contract owner has access for this action. 
    The first account in Ganache by default. Connect this account in metamask. 
    Navigate to new Cause tab under the navbar. 
    Enter the purpose of fund, target amount, target date, commission  and receiver address(Choose one of the ganache accounts) and submit
******* Send donations from multiple accounts and verify. 
9.  Navigate to Donate tab under the navbar.
    CHARITY-DAPP/pages/donate.js ->  Change the senderAccount at line number 37.
    For donations from multiple accounts the corresponding sender address should be added.
    Connect the accounts in metamask, enter the donation amount and Click donate button.
    Click on the Amount achieved button to know the amount collection status. 
10. CHARITY-DAPP/pages/donate.js ->   Change the txAccount at line number 84. This must be the 
    same as contract deployer (as given in step 8). i.e. Only contract owner has access for this. Upon successful closure, verify the receiver account for the amount (balance-commission) and deployer account for the commission.
11. Navigate to the receipt tag under the navbar. Enter the sender address and get the receipt
    for the total donations made by that particular sender. In case of donations to multiple requests, the total gets displayed.      
