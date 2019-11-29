let DeCourse = artifacts.require("DeCourse");
let Web3 = require("web3");
let web3 = new Web3("http://localhost:8545");
let helloContract, ownerAddress, deployedContractAddress, DeCourseContract;

contract("DeCourse", accounts => {

  
    it("owner should be the one who contract deployer", async () =>
        await DeCourse.deployed().then(async instance => {
            deployedContractAddress = instance.address;
            DeCourseContract = new web3.eth.Contract(instance.abi, instance.address);
            ownerAddress = await DeCourseContract.methods.owner().call();
            console.log('ownerAddress: ', ownerAddress);
            assert.equal(accounts[0], ownerAddress, "deployer is not owner");
        })
    );
    
    it('should create a new course', async ()=>{
            
            web3.eth.getBalance(accounts[0])
            .then(console.log);

            await DeCourseContract.methods.createCourse(
                'asdasd','asdad',0
            ).send({from:accounts[0],gas:6721975});
            let cousese = await   DeCourseContract.methods.courses(0).call() 
            
            assert.equal(0, cousese.id, "deployer is not owner");
       
    })
});