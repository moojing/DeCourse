let DeCourse = artifacts.require("DeCourse");
let Web3 = require("web3");
let web3 = new Web3("http://localhost:8545");
let helloContract, ownerAddress, deployedContractAddress, DeCourseContract;

contract("DeCourse", accounts => {

    it("owner should be the one who is the contract deployer", async () =>
        await DeCourse.deployed().then(async instance => {
            deployedContractAddress = instance.address;
            DeCourseContract = new web3.eth.Contract(instance.abi, instance.address);
            ownerAddress = await DeCourseContract.methods.owner().call();
            assert.equal(accounts[0], ownerAddress, "deployer is not owner");
        })
    );
    
    

    it('should create a new course', async ()=>{
        await DeCourseContract.methods.createCourse(
            'The First Course','I am the teahcer in this course',0
        ).send({from:accounts[0],gas:6721975});

        let cousese = await   DeCourseContract.methods.courses(0).call() 
        
        assert.equal(0, cousese.id, "deployer is not owner");
       
    })

    it('should join a course as a Student',async function() {

        let courses = await  DeCourseContract.methods.getCourses().call() 
        let firstCourse = courses[0]
        
        await DeCourseContract.methods.joinCourse(firstCourse.id,1).send({from:accounts[1]}) 
        let newCourses = await   DeCourseContract.methods.getCourses().call() 
        
        assert.equal(newCourses[0].students[0],accounts[1], "there is no user join the first course as a student.")
    })

    it('should leave a course',async function(){
        let courses = await  DeCourseContract.methods.getCourses().call() 
        await  DeCourseContract.methods.leaveCourse(courses[0].id).send({from:accounts[0]})  
        let coursesAfter = await  DeCourseContract.methods.getCourses().call() 
        console.log('coursesAfter: ', coursesAfter);
    })

    
});