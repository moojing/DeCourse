pragma solidity ^0.5.2;

contract deCourse{
    // mapping(address => uint) public balances;
    struct Course{
        address teacher;
        address[] student; 
        mapping (address => string ) name;
    }
    Course[]  public courses;
    function createCourse  (string memory _role) payable public  {
        // courses.push(new Course());
    }  
    // function getCourses public returns () 
}