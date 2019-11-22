pragma solidity ^0.5.2;

contract deCourse{
    // mapping(address => uint) public balances;
    struct course{
        address teacher;
        mapping (string => address) student;
    }
    course[]  public courses;
    function createCourse public (string memory _role) payable  {
    
    }  
    // function getCourses public returns () 
}