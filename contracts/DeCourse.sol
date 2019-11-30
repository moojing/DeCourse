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
    }
    
    mapping (uint => bool) courseToJoinState;
    mapping (address=>uint[]) addressToTeacherCourse; 
    mapping (address=>uint[]) addressToStudentCourse; 
    Course[]  public courses;
    
    modifier haventJoinTheCourse (uint courseId) {
        
        _; 
    }
    
    function createCourse (string memory _title, string memory _description, Role _role)  
        payable
        public 
        returns (address[] memory) {   
        
        address[] memory students ;
        uint newCourseId = courses.length;
        // students.push(msg.sender);

        Course memory newCourse = Course({
            id:newCourseId ,
            title:_title,
            description:_description,
            teacher:address(0),
            students:students
        });
        
        courses.push(newCourse); 

        if (_role == Role.Student) {
            // newCourse.students.push(msg.sender);
            courses[newCourseId].students.push(msg.sender);
            addressToStudentCourse[msg.sender].push(newCourseId);
        }else if (_role == Role.Teacher) {
            newCourse.teacher = msg.sender; 
            addressToTeacherCourse[msg.sender].push(newCourseId);
        }
        

        return  courses[newCourse.id].students;
        
    }
    
    
    function joinCourse(uint _courseId  , Role _role) 
        haventJoinTheCourse(_courseId)
        payable 
        public {
        
        if (_role == Role.Student) {
            courses[_courseId].students.push(msg.sender);             
            addressToStudentCourse[msg.sender].push(_courseId);
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
                       students[i] = students[students.length-1]; 
                       students.length--;
                       removeFromCourseStudent(targetCourse.id);
                   } 
               }
            }  
        
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
    
    function getRole (Role _role) public pure returns(Role){
        return Role(_role);
    }
   
    
}