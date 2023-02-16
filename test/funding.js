const Funding = artifacts.require("Funding");

contract("Funding", function (accounts) {
  it("should deploy the contract properly", async function () {
    let instance =await Funding.deployed();
    console.log("contract address:", instance.address);
    return assert.typeOf(instance.address,'string');
  });
  it("should store the details of the new cause in the receiver-struct mapping", async function () {
    let instance =await Funding.deployed();
    // *********** Details for the first campaign
    const receiver1 = accounts[1];
    const cause1 = "medical";
    const targetLimit1 = "9000000000000000000";
    const commission1 = "2000000000000000000";
    // Accessing the setDetails function
    await instance.setDetails(receiver1,cause1,targetLimit1,commission1);
    // Getting the registered values by accessing fundDetails mapping whose visbility is public
    let result1 = await instance.fundDetails.call(receiver1);
    
    // Comparing the details with input 
    assert.equal(result1.cause,cause1,"cause validated");
    assert.equal(result1.targetLimit,targetLimit1),"target validated";
    assert.equal(result1.balance,0, "balance validated");
    assert.equal(result1.commission,commission1,"commission validated")
    // *********** Details for the second campaign
    const receiver2 = accounts[2];
    const cause2 = "medical";
    const targetLimit2 = "5000000000000000000";
    const commission2 = "500000000000000000";
    // Accessing the setDetails function
    await instance.setDetails(receiver2,cause2,targetLimit2,commission2);
    // Getting the registered values by accessing fundDetails mapping whose visbility is public
    let result2 = await instance.fundDetails.call(receiver2);
   
    // Comparing the details with input
    assert.equal(result2.cause,cause2);
    assert.equal(result2.targetLimit,targetLimit2);
    assert.equal(result2.balance,0);
    assert.equal(result2.commission,commission2)
  });
  it("should update the balance properly after accepting donation.If the user sends more amount than required to achieve the target it should transfer back", async function () {
    
    let instance =await Funding.deployed();
    const receiver1 = accounts[1];
    const receiver2 = accounts[2];
    const sender1 = accounts[3];
    const amount1 = 4000000000000000000
    const amount21 = 2000000000000000000
    const amount22 = 4000000000000000000
    balanceBefore1 = await (instance.getBal(receiver1))
    console.log("Balance before",balanceBefore1.toString());
    await instance.acceptDonation(receiver1,{
      from: sender1,
      value: amount1
    });
    balanceA1 = await (instance.getBal(receiver1))
    balanceAfter1 = Number(balanceA1)
    console.log("Balance After",balanceAfter1.toString());
    assert.equal(balanceAfter1,balanceBefore1+amount1,"First donation - receiver1");
    
    const sender2 = accounts[4];
    const amount2 = 5000000000000000000
    balanceBefore2 = await (instance.getBal(receiver1))
    console.log("Balance before",balanceBefore2.toString());
    await instance.acceptDonation(receiver1,{
      from: sender2,
      value: amount2
    });
    balanceA2 = await (instance.getBal(receiver1))
    console.log("Balance After",balanceA2.toString());
    balanceAfter2=Number(balanceA2)
    BalanceBef2= Number(balanceBefore2)+Number(amount2)
    assert.equal(balanceAfter2,BalanceBef2,"Second donation - receiver1");
    // When donation is in excess of the target limit, the amount gets credited back to the sender
    const sender3 = accounts[5];
    const amount3 = 3000000000000000000
    balanceBefore3 = await (instance.getBal(receiver1))
    console.log("Balance before",balanceBefore3.toString());
    await instance.acceptDonation(receiver1,{
      from: sender3,
      value: amount3
    });
    balanceA3 = await (instance.getBal(receiver1))
    console.log("Balance After",balanceA3.toString());
    balanceAfter3=Number(balanceA3)
    BalanceBef3= Number(balanceBefore3)+Number(amount3)
    assert.isAbove(BalanceBef3,balanceAfter3,"Third donation - receiver1");
    console.log("For the second receiver")
    // First donation for the second receiver
    balance2Before1 = await (instance.getBal(receiver2))
    console.log("Balance before",balance2Before1.toString());
    await instance.acceptDonation(receiver2,{
      from: sender1,
      value: amount21
    });
    balance2A1 = await (instance.getBal(receiver2))
    console.log("Balance After",balance2A1.toString());
    balance2After1=Number(balance2A1)
    Balance2Bef1= Number(balance2Before1)+Number(amount21)
    assert.equal(balance2After1,Balance2Bef1,"First donation - receiver2");
    // When donation is in excess of the target limit, the amount gets credited back to the sender
    balance2Before2 = await (instance.getBal(receiver2))
    console.log("Balance before",balance2Before2.toString());
    await instance.acceptDonation(receiver2,{
      from: sender2,
      value: amount22
    });
    balance2A2 = await (instance.getBal(receiver2))
    balance2After2=Number(balance2A2)
    Balance2Bef2= Number(balance2Before2)+Number(amount22)
    assert.isAbove(Balance2Bef2,balance2After2,"Second donation - receiver2");
    console.log("Balance After",balance2A2.toString());
  });
  it("should retrieve the donation amount for each sender from the event log", async function () {
    let instance =await Funding.deployed();
    let actual1 =0;
    let actual2 =0;
    amount1 = 4000000000000000000;
    amount21 = 2000000000000000000;
    expected1 = amount1 + amount21
    const eventLogs1 = await instance.getPastEvents(
      "donateEvent",
      {fromBlock: 0,
      toBlock: "latest",
    // ***************** Testing multiple donations
      filter: { sender: accounts[3] }}
    )
    eventLogs1.forEach((log1) => {
      const amount = (log1.returnValues.amount)
      amt = Number(amount)
      actual1 += amt;
    });
    assert.equal(actual1,expected1,"Logs validation")

    amount1 = 4000000000000000000;
    amount21 = 2000000000000000000;
    const amount2 = 5000000000000000000
    const amount22 = 4000000000000000000
    expected2 = amount2 + amount22
    const eventLogs2 = await instance.getPastEvents(
      "donateEvent",
      {fromBlock: 0,
      toBlock: "latest",
    // Testing when donation is in excess of the targetlimit, the remaining amount 
    // gets credited back to the sender
      filter: { sender: accounts[4] }}
    )
    eventLogs2.forEach((log2) => {
      const amount = (log2.returnValues.amount)
      amt = Number(amount)
      actual2 += amt;
    });
    assert.isAbove(expected2,actual2,"Logs validation")
})
it("should disburse the fund as expected and delete the mapping instance - accountClosure function ", async function () {
  let instance =await Funding.deployed();
  bal1B = await web3.eth.getBalance(accounts[0])
  deployer1B = Number(bal1B)
  bal2B = await web3.eth.getBalance(accounts[1])
  receiver1B = Number(bal2B)

  let details1 = await instance.fundDetails.call(accounts[1]);
  com1 = details1.commission
  commission1 = Number(com1)
  bal1 = details1.balance;
  balance1 = Number(bal1);
  await instance.accountClosure(accounts[1]);
  bal1A = await web3.eth.getBalance(accounts[0])
  deployer1A = Number(bal1A)
  // Verify that the commission gets credited to the deployer account.
  // Cant equate with the balance plus commission because transaction cost
  // for the accountClosure gets deducted from the deployer account
  assert.isAbove(deployer1A,deployer1B,"Logs validation")
  bal2A = await web3.eth.getBalance(accounts[1])
  receiver1A = Number(bal2A)
  fund = balance1 - commission1
  // Verify that the fund gets credited to the charity requester
  // received fund minus commission is transferred to the requester.
  assert.equal(receiver1A,receiver1B+fund,"fund credit validation")

  bal3B = await web3.eth.getBalance(accounts[0])
  deployer2B = Number(bal3B)
  bal4B = await web3.eth.getBalance(accounts[2])
  receiver2B = Number(bal4B)
 
  let details2 = await instance.fundDetails.call(accounts[2]);
  com3 = details2.commission
  commission3 = Number(com3)
  bal3 = details2.balance;
  balance3 = Number(bal3);
  await instance.accountClosure(accounts[2]);
  bal3A = await web3.eth.getBalance(accounts[0])
  deployer2A = Number(bal3A)
  // Verify that the commission gets credited to the deployer account.
  // Cant equate with the balance plus commission because transaction cost
  // for the accountClosure gets deducted from the deployer account
  assert.isAbove(deployer2A,deployer2B,"Commission credit validation")
  bal4A = await web3.eth.getBalance(accounts[2])
  receiver2A = Number(bal4A)
  fund = balance3 - commission3
  // Verify that the fund gets credited to the charity requester
  // received fund minus commission is transferred to the requester.
  assert.equal(receiver2A,receiver2B+fund,"fund credit validation")
})
})

    

