const Funding = artifacts.require("Funding");


contract("Funding", function (accounts) {
  it("should deploy the contract properly", async function () {
    let instance =await Funding.deployed();
    console.log("contract address:", instance.address);
    return assert.typeOf(instance.address,'string');
  });
  it("should store the details of the new cause in the receiver-struct mapping", async function () {
    let instance =await Funding.deployed();
    const receiver = accounts[1];
    cause = "medical";
    targetLimit = "9000000000000000000";
    commission = "2000000000000000000";
    await instance.setDetails(receiver,cause,targetLimit,commission);
    let result1 = await instance.fundDetails.call(receiver);
    console.log("cause:",result1.cause)
    console.log("balance:",result1.balance)
    console.log("targetLimit:",result1.targetLimit.toString())
    console.log("commission:",result1.commission.toString())
    assert.equal(result1.cause,cause);
    assert.equal(result1.targetLimit,targetLimit);
    assert.equal(result1.balance,0);
    assert.equal(result1.commission,commission)
  });
  it("should update the balance properly after accepting donation", async function () {
    
    let instance =await Funding.deployed();
    const receiver = accounts[1];
    const sender1 = accounts[2];
    const amount1 = 4000000000000000000
    balanceBefore1 = await (instance.getBal(receiver))
    console.log("Balance before",balanceBefore1.toString());
    await instance.acceptDonation(receiver,{
      from: sender1,
      value: amount1
    });
    balanceAfter1 = await (instance.getBal(receiver))
    console.log("Balance After",balanceAfter1.toString());
    const sender2 = accounts[3];
    const amount2 = 5000000000000000000
    balanceBefore2 = await (instance.getBal(receiver))
    console.log("Balance before",balanceBefore2.toString());
    await instance.acceptDonation(receiver,{
      from: sender2,
      value: amount2
    });
    balanceAfter2 = await (instance.getBal(receiver))
    console.log("Balance After",balanceAfter2.toString());
    const sender3 = accounts[4];
    const amount3 = 3000000000000000000
    balanceBefore3 = await (instance.getBal(receiver))
    console.log("Balance before",balanceBefore3.toString());
    await instance.acceptDonation(receiver,{
      from: sender3,
      value: amount3
    });
    balanceAfter3 = await (instance.getBal(receiver))
    console.log("Balance After",balanceAfter3.toString());
  });
});
