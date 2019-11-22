pragma solidity ^0.5.2;

contract deCourse{
    // mapping(address => uint) public balances;
    struct member{
        address teacher;
        mapping (string => address) student;
    }
}