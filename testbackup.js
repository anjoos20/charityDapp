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
    assert.equal(result1.targetLimit,targetLimit1,"target validated");
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
    assert.equal(result2.cause,cause2,"cause validated");
    assert.equal(result2.targetLimit,targetLimit2,"target validated");
    assert.equal(result2.balance,0, "balance validated");
    assert.equal(result2.commission,commission2,"commission validated")
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
    await instance.acceptDonation(receiver1,{
      from: sender1,
      value: amount1
    });
    balanceAfter1 = await (instance.getBal(receiver1))
    assert.equal(balanceAfter1,balanceBefore1+amount1,"First donation validated - receiver1");
    const sender2 = accounts[4];
    const amount2 = 5000000000000000000
    balanceBefore2 = await (instance.getBal(receiver1))
    await instance.acceptDonation(receiver1,{
      from: sender2,
      value: amount2
    });
    balanceAfter2 = await (instance.getBal(receiver1))
    assert.equal(balanceAfter2,balanceBefore2+amount2,"Second donation validated - receiver1");
    const sender3 = accounts[5];
    const amount3 = 3000000000000000000
    balanceBefore3 = await (instance.getBal(receiver1))
    await instance.acceptDonation(receiver1,{
      from: sender3,
      value: amount3
    });
    balanceAfter3 = await (instance.getBal(receiver1))
    assert.equal(balanceAfter3,balanceBefore3+amount3,"Third donation validated - receiver1");
    console.log("For the second receiver")
    balance2Before1 = await (instance.getBal(receiver2))
    console.log("Balance before",balance2Before1.toString());
    await instance.acceptDonation(receiver2,{
      from: sender1,
      value: amount21
    });
    balance2After1 = await (instance.getBal(receiver2))
    console.log("Balance After",balance2After1.toString());

    balance2Before2 = await (instance.getBal(receiver2))
    console.log("Balance before",balance2Before2.toString());
    await instance.acceptDonation(receiver2,{
      from: sender2,
      value: amount22
    });
    balance2After2 = await (instance.getBal(receiver2))
    console.log("Balance After",balance2After2.toString());
  });
  it("should disburse the fund as expected and delete the mapping instance", async function () {
    let instance =await Funding.deployed();
    bal1B = await web3.eth.getBalance(accounts[0])
    // deployerB = web3.utils.fromWei(bal1B ,'ether')
    // console.log("deployerBalance before closure",deployerB);
    bal2B = await web3.eth.getBalance(accounts[1])
    receiverB = web3.utils.fromWei(bal2B ,'ether')
    console.log("receiverBalance before closure",receiverB);

    let details1 = await instance.fundDetails.call(accounts[1]);
    com1 = web3.utils.fromWei(details1.commission ,'ether')
    console.log("commission1 : ",com1);
    balance1 = web3.utils.fromWei(details1.balance ,'ether')
    console.log("targetAmount1: ",balance1);
    await instance.accountClosure(accounts[1]);
    bal1A = await web3.eth.getBalance(accounts[0])
    // deployerA = web3.utils.fromWei(bal1A ,'ether')
    // console.log("deployerBalance before closure",deployerA);
    bal2A = await web3.eth.getBalance(accounts[1])
    exp = bal2B + com1;
    receiverA = web3.utils.fromWei(bal2A ,'ether')
    console.log("receiverBalance before closure",receiverA);

    // assert.equal(bal2B,exp)
    
  })
  });
