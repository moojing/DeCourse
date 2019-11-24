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
    
    mapping (address => string ) addressToName;
    mapping (address => Course ) addressToCourse;
    
    Course[]  public courses;
    
    function createCourse  (string memory _role) payable public {   
        address[] memory students;
        // students.push(msg.sender);
        // courses.push(new Course(courses.length ,'avn','kjashdkjahskd', students)); 
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