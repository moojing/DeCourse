pragma solidity ^0.5.2;

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
    mapping (address => Course ) addressToCourse;
    
    Course[]  public courses;
    
    function createCourse  (string memory _title, string memory _description) payable public {   
        address[] memory students;
        
        Course memory newCourse = Course({
            id:courses.length ,
            title:_title,
            description:_description,
            teacher:address(0),
            students:students
        });
        
        courses.push(newCourse); 
        courses[courses.length].students.push(msg.sender);
    }
    
    function joinCourse(address _course  , string memory _role) 
        payable 
        public {
        
    } 
    
    function leaveCourse(address _course  , string memory _role) 
        payable 
        public {
        
        }   
    
    
    
    
}