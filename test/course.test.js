let DeCourse = artifacts.require("DeCourse");
let Web3 = require("web3");
let web3 = new Web3("http://localhost:8545");


const BN = web3.utils.BN;
const getBalance = async (address) => new BN(await web3.eth.getBalance(address));



let contractReceipt, ownerAddress, DeCourseContract;

contract("DeCourse", accounts => {
	let courseContract;

	beforeEach('setup contract for each test', async () => {
	  courseContract = await DeCourse.new({from:accounts[0]});
	});

	it("owner should be the one who is the contract deployer", async () =>{
		ownerAddress = await courseContract.getOwner();
		assert.equal(accounts[0], ownerAddress, "deployer is not owner");
	});



	it('should create a new course', async ()=>{
		await courseContract.createCourse(
			'The First Course','I am the first student in this course',1,{
			from:accounts[0],
			gas:6721975,
			value:web3.utils.toWei("1", "ether")});
		let first_course_students = await courseContract.getStudentsByCourseId(0); 
		console.log('first_course_students: ', first_course_students);
		
		assert.equal(first_course_students[0],accounts[0],"the first course should has a student")

		await courseContract.createCourse(
			'The Second Course','I am the teacher in this course',0,{  
			from:accounts[0],
			gas:6721975,
			value:web3.utils.toWei("1", "ether")});

		let course = await courseContract.getCourseStates()

		assert.equal(1, course[1].id, "there should be two courses.");

	})


	it('a student account[1] sould joing the course.', async ()=>{

		await courseContract.createCourse(
			'The First Course','I am the teacher in this course',0
		,{from:accounts[0],gas:6721975});

		 
		let theFirstCourseId = 0;
		
		await courseContract.joinCourse(theFirstCourseId ,1,{
			from:accounts[1],
			gas:6721975,
			value:web3.utils.toWei("1", "ether")
		});

		let course = await  courseContract.getCourseStates()

		let students = await courseContract.getStudentsByCourseId(0)
		console.log('students: ', students);

		assert.equal(students[0], accounts[1], "account[1] should be a student.");
	})

	

});