pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/math/SafeMath.sol";


contract DeCourse {
    // mapping(address => uint) public balances;
    address public owner;

    constructor() public{
        owner = msg.sender;
    }


    enum Role { Teacher,Student  }
 
    struct Course{
        uint id;
        string title;  
        string description;
        address teacher;
        address[] students;
        uint tuitionFee; 
        uint courseBalance;
    }

    event CreateCourse(
        uint256 indexed _courseId, 
        string _description,
        string _title
    );

    event Refund(
        address indexed _student,
        uint _value,
        uint _courseRemainBalance
    );
    event DepositToTuitionFee(
        address indexed _student,
        uint _value, 
        uint _courseRemainBalance
    );

    mapping (uint => bool) courseToJoinState;
    mapping (address=>uint[]) addressToTeacherCourse; 
    mapping (address=>uint[]) addressToStudentCourse; 
    mapping (address=>uint) public addressToTuitionFee;  
    Course[]  public courses;
    
    modifier haventJoinTheCourse (uint _courseId, Role _role) {
        if(_role == Role.Student){
            for(uint i=0; i<addressToStudentCourse[msg.sender].length;i++){
                require(courseToJoinState[addressToStudentCourse[msg.sender][i]] == false ,"Cant join the same course twice!");
            } 
        }else if(_role == Role.Teacher){
            for(uint i=0; i<addressToTeacherCourse[msg.sender].length;i++){
                require(courseToJoinState[addressToTeacherCourse[msg.sender][i]] == false , "Cant join the same course twice!");
            } 
        }
        _; 
    }
    
    
    function createCourse (string memory _title, string memory _description, Role _role)  
        payable
        public 
        returns (Course[] memory) {   
        
        address[] memory students ;
        uint newCourseId = courses.length;
        // students.push(msg.sender);

        Course memory newCourse = Course({
            id:newCourseId ,
            title:_title,
            description:_description,
            teacher:address(0),
            students:students,
            tuitionFee:1 ether,
            courseBalance:0
        });
        
        courses.push(newCourse); 
        
        courseToJoinState[newCourseId] = true; 

        if (_role == Role.Student) {
            // newCourse.students.push(msg.sender);
            courses[newCourseId].students.push(msg.sender);
            addressToStudentCourse[msg.sender].push(newCourseId);
        }else if (_role == Role.Teacher) {
            newCourse.teacher = msg.sender; 
            addressToTeacherCourse[msg.sender].push(newCourseId);
        }
        emit CreateCourse(newCourseId,courses[newCourseId].title, courses[newCourseId].description) ;
        return  courses;
        
    }
    
    
    function joinCourse(uint _courseId  , Role _role) 
        haventJoinTheCourse(_courseId,_role)
        payable 
        public {
        Course storage targetCourse = courses[_courseId]; 
        if (_role == Role.Student) {
            require(msg.value >= targetCourse.tuitionFee,"the student doesnt have enough fee.");
            targetCourse.students.push(msg.sender);             
            addressToStudentCourse[msg.sender].push(_courseId);
            //course fee
            addressToTuitionFee[msg.sender] += msg.value;
            targetCourse.courseBalance += msg.value;
            emit DepositToTuitionFee(msg.sender,addressToTuitionFee[msg.sender],targetCourse.courseBalance);
        }else if(_role == Role.Teacher){
            require (courses[_courseId].teacher == address(0),"The teacher is not empty!!"); 
            courses[_courseId].teacher = msg.sender; 
            addressToTeacherCourse[msg.sender].push(_courseId);
        }


            
    } 

    
    function leaveCourse(uint _courseId  ) 
        payable 
        public 
        returns(Course memory) {
            Course storage targetCourse = courses[_courseId];       
            address[] storage students  = targetCourse.students;
            
                
            if (targetCourse.teacher==msg.sender){
                targetCourse.teacher = address(0);
                removeFromCourseTeacher(targetCourse.id);
            } else {
                
                
               for (uint i = 0; i<students.length; i++){
                   if(students[i]==msg.sender){
                       //refund when a student leave the course
                        msg.sender.transfer(addressToTuitionFee[msg.sender]);
                        targetCourse.courseBalance -= addressToTuitionFee[msg.sender];
                        emit Refund(msg.sender,addressToTuitionFee[msg.sender],targetCourse.courseBalance ); 
                        addressToTuitionFee[msg.sender] = 0; 
                        
                       
                       students[i] = students[students.length-1]; 
                       students.length--;
                       removeFromCourseStudent(targetCourse.id);
                   } 
               }
            }

            courseToJoinState[_courseId] = false; 
            return targetCourse;
    }   
     

    
     
    function removeFromCourseTeacher  (uint _courseId) private {
        uint[] storage teacherCourse =  addressToTeacherCourse[msg.sender]; 
        for (uint i=0; i<teacherCourse.length;i++){
            if(teacherCourse[i]==_courseId){
               teacherCourse[i] = teacherCourse[teacherCourse.length-1];
               teacherCourse.length--;
            }
        }
    }
    function removeFromCourseStudent  (uint _courseId) private {
        uint[] storage studentCourse =  addressToStudentCourse[msg.sender]; 
        for (uint i=0; i<studentCourse.length;i++){
            if(studentCourse[i]==_courseId){
               studentCourse[i] = studentCourse[studentCourse.length-1];
               studentCourse.length--;
            }
        }
    }
    function getCourses() public view returns(Course[] memory){
          return courses ;
    }
    
    function getStudent(uint _courseid) public view returns(address[] memory ){
        return courses[_courseid].students;     
    }
    
    function getTeacher(uint _courseid) public view returns(address ){
        return courses[_courseid].teacher;     
    }
    
    function withdraw() public {
        msg.sender.transfer(address(this).balance);
    }
    function getOwner() public view returns (address){
        return owner;
    }
   
    
}