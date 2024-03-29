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

		let students = await courseContract.getStudentsByCourseId(0)
		console.log('students: ', students);

		assert.equal(students[0], accounts[1], "account[1] should be a student.");
	})
	
	
	it('a student account[1] should join and leave the course.', async ()=>{

		await courseContract.createCourse(
			'The First Course','I am the teacher in this course',0
		,{from:accounts[0],gas:6721975});

		let courses = await courseContract.getCourseStates()
		assert.equal(courses[0].teacher, accounts[0]); 
		let theFirstCourseId = courses[0].id;

		await courseContract.joinCourse(theFirstCourseId ,1,{
			from:accounts[1],
			gas:6721975,
			value:web3.utils.toWei("1", "ether")
		});

		courses = await courseContract.getCourseStates()
		assert.equal(courses[0].students[0], accounts[1]); 
		assert.equal(courses[0].courseBalance, web3.utils.toWei("1", "ether")); 
		
		await courseContract.leaveCourse(theFirstCourseId,{
			from:accounts[1],
			gas:6721975,
		});
		courses = await courseContract.getCourseStates()
		assert.equal(courses[0].courseBalance, 0); 
		let joinRes = await courseContract.isAddressInCourse(courses[0].id,accounts[1]) 
		
	 	assert.equal(joinRes,false,'accounts[1] should leave the course.')
		
	})
	it('a teacher account[2] sould joing the course.', async ()=>{

		await courseContract.createCourse(
			'The First Course','I am the student in this course',1
		,{from:accounts[0],gas:6721975,value:web3.utils.toWei("1", "ether")});

		let theFirstCourseId = 0;
		
		await courseContract.joinCourse(theFirstCourseId ,0,{
			from:accounts[2],
			gas:6721975,
			value:web3.utils.toWei("0.6", "ether")
		});

		let teacher = await courseContract.getTeacher(0)
		console.log('teacher: ', teacher);

		assert.equal(teacher, accounts[2], "account[1] should be a student.");
	})
	it('should set a name to address',async function(){
		await courseContract.setAddressName(accounts[0],'hello',{from:accounts[0]})
		let adressName = await courseContract.getAddressName(accounts[0],{from:accounts[0]})
		assert.equal(adressName,'hello','the name of accounts[0] should be hello')
	})

	// it('a student cant join the same course twice', async ()=>{
	// 	await courseContract.createCourse(
	// 		'The First Course','I am the teacher in this course',0
	// 	,{from:accounts[0],gas:6721975});
		
	// 	let courses = await courseContract.getCourseStates()
	// 	let theFirstCourseId = courses[0].id;
		

	// 	await courseContract.joinCourse(theFirstCourseId ,1,{
	// 		from:accounts[1],
	// 		gas:6721975,
	// 		value:web3.utils.toWei("1", "ether")
	// 	});

	// 	await courseContract.joinCourse(theFirstCourseId ,1,{
	// 		from:accounts[1],
	// 		gas:6721975,
	// 		value:web3.utils.toWei("1", "ether")
	// 	});

	// 	courses = await courseContract.getCourseStates()
	// 	console.log('courses: ', courses);

	// })

});