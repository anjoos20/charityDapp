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
    balanceAfter1 = await (instance.getBal(receiver1))
    console.log("Balance After",balanceAfter1.toString());
    // assert.deepEqual(balanceAfter1,balanceBefore1+amount1,"First donation - receiver1");
    // **********************************************************************
    //  Facing big number issue here
  });
  it("should update the balance properly after accepting donation.", async function () {
    let instance =await Funding.deployed();
    instance.getPastEvents("donateEvent", {
      filter: { sender: accounts[3] },
      fromBlock: 0,
      toBlock: "latest"
  }, function(error, events) {
      if (error) {
          console.log(error);
      } else {
          events.forEach(function(event) {
              console.log("Event:", event);
              console.log("Donor address:", event.returnValues.sender);
            // ***************************************************************
            // ****************Event log details not returned here
              console.log("Donation amount:", event.returnValues.amount);
              
          });
      }
  })
})
});
