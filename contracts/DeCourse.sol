pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

contract deCourse{
    // mapping(address => uint) public balances;
    struct Course{
        uint id;
        string title;  
        string description;
        address teacher;
        address[] students;
    }
    enum Role { Student, Teacher }
    
    mapping (address => string ) addressToName;
    mapping (address => uint[] ) addressToCourseId;
    
    Course[]  public courses;
    
    modifier haventJoinTheCourse (uint courseId) {
         uint[] memory userCourses = addressToCourseId[msg.sender];
        
        for(uint i =0; i<userCourses.length;i++){
            require(courseId != userCourses[i]);
        } 
        _; 
    }
    function createCourse  (string memory _title, string memory _description, Role _role)  
        payable
        public 
        returns (Role  role) {   
        
        address[] memory students;
        
        Course memory newCourse = Course({
            id:courses.length ,
            title:_title,
            description:_description,
            teacher:address(0),
            students:students
        });
        
        courses.push(newCourse); 
        addressToCourseId[msg.sender].push(newCourse.id);
        
        if (_role == Role.Student) {
            courses[newCourse.id].students.push(msg.sender);
        }else if (_role == Role.Teacher) {
            courses[newCourse.id].teacher = msg.sender; 
        }
        return  Role.Teacher;
        
    }
    
    function joinCourse(uint _courseId  , Role _role) 
        haventJoinTheCourse(_courseId)
        payable 
        public {
        
        
    } 
    
    function leaveCourse(address _course  , string memory _role) 
        payable 
        public {
        
        }   
    
    
    
    
}