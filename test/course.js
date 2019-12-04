let DeCourse = artifacts.require("DeCourse");
let Web3 = require("web3");
let web3 = new Web3("http://localhost:8545");


const BN = web3.utils.BN;
const getBalance = async (address) => new BN(await web3.eth.getBalance(address));



let contractReceipt, ownerAddress, deployedContractAddress, DeCourseContract;
 
contract("DeCourse", accounts => {
    
    it("owner should be the one who is the contract deployer", async () =>{
        // DeCourseContract = new web3.eth.Contract(instance.abi, instance.address);
        DeCourseContract = await DeCourse.new({ from: accounts[0] });
        deployedContractAddress = DeCourseContract.address;
        ownerAddress = await DeCourseContract.getOwner();
        assert.equal(accounts[0], ownerAddress, "deployer is not owner");
    });
    
    

    it('should create a new course', async ()=>{
        await DeCourseContract.createCourse(
            'The First Course','I am the first student in this course',1
        ,{from:accounts[0],gas:6721975});

        let course = await   DeCourseContract.getCourses() 
        
        assert.equal(0, course[0].id, "deployer is not owner");
       
    })

    it('should join a course as a Student',async function() {

        let courses = await  DeCourseContract.getCourses()
        let firstCourse = courses[0]

        // const { logs } = await todos.addItem("test", { from: accounts[0], value: 0 });
        // const itemCount = await todos.getItemCount();
        
        let {logs} = await   DeCourseContract.joinCourse(firstCourse.id,1,{
            from:accounts[1],
            value:web3.utils.toWei("1", "ether") ,
            gas:6721975
        })
        
        const eventIndex = logs.findIndex(log => log.event === 'DepositToTuitionFee');
        console.log('Student join eventIndex: ', logs[eventIndex].args._value.toString());
        
        
        let newCourses = await   DeCourseContract.getCourses()
        
        assert.equal(newCourses[0].students[1],accounts[1], "there is no user join the first course as a student.")
    })

    it('should join a course as a Teacher',async function() {

        let courses = await  DeCourseContract.getCourses()
        let firstCourse = courses[0]
        
        await DeCourseContract.joinCourse(firstCourse.id,0,{
            from:accounts[2],
            value: web3.utils.toWei("1", "ether")}) 
        
        let newCourses = await   DeCourseContract.getCourses()
        
        assert.equal(newCourses[0].teacher,accounts[2], "there is no user join the first course as a student.")
    })

    it('A student should leave a course',async function(){
        let courses = await  DeCourseContract.getCourses()
 
        
        console.log('accounts[0]BalabceBeforeLeave',await web3.eth.getBalance(accounts[0]) )
        
        let {logs} = await  DeCourseContract.leaveCourse(courses[0].id,{
            from:accounts[0],
            gas:6721975
        })
        const eventIndex = logs.findIndex(log => log.event === 'Refund');
        console.log('leave_courseRemainBalance: ', logs[eventIndex].args._courseRemainBalance.toString());
   
        let coursesAfter = await  DeCourseContract.getCourses()
        
        console.log('accounts[0]BalabceAfterLeave',await web3.eth.getBalance(accounts[0]) )
        
        assert.equal(coursesAfter[0].students[0],accounts[1], "A student should leave the first course.")
    })
    
    it('should get some balance', async function(){

        // await DeCourseContract.methods.joinCourse(firstCourse.id,0).send({from:accounts[2]}) 
        let contractBalance =  await web3.eth.getBalance(deployedContractAddress) 
        console.log('contractBalance: ', contractBalance);
        assert.equal(contractBalance, "1000000000000000000", "contract has 1 ETH");
        
    })
    
    // it ('should get all balance',async function(){
    //     // let fee = await  DeCourseContract.methods.addressToTuitionFee(accounts[0]).call();
    //     let contractBalanceBefore =  await web3.eth.getBalance(deployedContractAddress) 

    //     await  DeCourseContract.methods.withdraw().send({from:accounts[0]})
        
    //     let accountBalance =  await web3.eth.getBalance(accounts[0]) 
        
    // }) 
    
});