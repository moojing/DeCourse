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
    mapping (address => uint[] )  addressToCourseId;
    mapping (uint => bool) courseToJoinState;
    
    //courseToJoinState[addressToCourseId[address 0x123]]
    // addressToCourseId[]
    
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
        returns (address[] memory) {   
        
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
        return  courses[newCourse.id].students;
        
    }
    
    
    function joinCourse(uint _courseId  , Role _role) 
        haventJoinTheCourse(_courseId)
        payable 
        public {
        
        if (_role == Role.Student) {
            courses[_courseId].students.push(msg.sender);             
        }else if(_role == Role.Teacher){
            courses[_courseId].teacher = msg.sender; 
        }
            
    } 
    
    function leaveCourse(uint _courseId  ) 
        payable 
        public 
        returns(uint[] memory) {
            Course storage targetCourse = courses[_courseId];       
            uint[] storage userCourses = addressToCourseId[msg.sender];
            
            if (targetCourse.teacher==msg.sender){
                targetCourse.teacher = address(0);
            } 

            for (uint i = 0; i<userCourses.length; i++){
                if (userCourses[i] == targetCourse.id){
                  delete userCourses[i]; 
                } 
            }
            
            return userCourses;
        }   
    
    function getCourse(uint _courseid) public view returns(Course memory){
          return courses[_courseid] ;
    }
    
    function getStudent(uint _courseid) public view returns(address[] memory ){
        return courses[_courseid].students;     
    }
    
    function getRole (Role _role) public pure returns(Role){
        return Role(_role);
    }
    function getAddressToCourseId () public returns (uint[] memory){
        return  addressToCourseId[msg.sender];
    }  
    
}