pragma solidity ^0.5.2;

contract deCourse{
    // mapping(address => uint) public balances;
    struct course{
        address teacher;
        mapping (string => address) student;
    }
    course[]  courses = new course[];
    // function getCourses public returns () 
}