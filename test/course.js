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
       
            console.log('accounts[0]',accounts[0])
            courseResult = await DeCourseContract.methods.createCourse(
                'asdasd','asdad',0
            ).send({from:accounts[0]});

            console.log('courseResult: ', courseResult);
            assert.equal(0, courseResult.id, "deployer is not owner");
       
    })
});