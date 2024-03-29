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
        mapping (uint => uint) studentIndexToTuitionFee;
        mapping(address => bool) addressToJoinState;
        uint courseBalance;
    }
    struct CourseJoinState{
        uint id;
        string title;  
        string description;
        address teacher;
        address[] students;
        uint tuitionFee; 
        uint courseBalance;
    }
    event JoinCourse(
        address targetAddress
    );
    event CreateCourse(
        uint256 indexed _courseId, 
        CourseJoinState  _courseJoinState
    );

    event Refund(
        address indexed _student,
        uint _value,
        uint _courseRemainBalance
    );

    event SetName(string _username);
    
    event Deposit(
        address indexed _student,
        uint _value, 
        uint _courseRemainBalance
    );

    mapping(address=>string) addressToName;
    mapping (address=>uint[]) addressToTeacherCourse; 
    mapping (address=>uint[]) addressToStudentCourse; 
    mapping (address=>uint) public addressToTuitionFee;  
    Course[]  public courses;
    
    modifier haventJoinTheCourse (uint _courseId, Role _role) {
        if(_role == Role.Student){
            // for(uint i=0; i<addressToStudentCourse[msg.sender].length;i++){
                // uint  courseId  = addressToStudentCourse[msg.sender][i];
                //the courseId is the same as the courses index.
                require(courses[_courseId].addressToJoinState[msg.sender]  == false ,"Cant join the same course twice!");
            // } 
        }else if(_role == Role.Teacher){
            // for(uint i=0; i<addressToTeacherCourse[msg.sender].length;i++){
                // uint  courseId  = addressToTeacherCourse[msg.sender][i];
                require(courses[_courseId].addressToJoinState[msg.sender] == false , "Cant join the same course twice!");
            // } 
        }
        _; 
    }
    
    
    function createCourse (string memory _title, string memory _description, Role _role)  
        payable
        public 
        returns (CourseJoinState memory) {   
        
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
        
        CourseJoinState memory newCourseState = getCourseState(newCourseId); 
        emit CreateCourse(newCourseId,newCourseState) ;

        courses[newCourseId].addressToJoinState[msg.sender] = true; 

        if (_role == Role.Student) {
            require(msg.value >= newCourse.tuitionFee,"the student doesnt have enough fee.");
            //students.length is the student index before push into student array.
            courses[newCourseId].studentIndexToTuitionFee[students.length] = msg.value;
            courses[newCourseId].students.push(msg.sender);
            addressToStudentCourse[msg.sender].push(newCourseId);
            
            
        }else if (_role == Role.Teacher) {
            courses[newCourseId].teacher = msg.sender; 
            addressToTeacherCourse[msg.sender].push(newCourseId);
        }
        
            
        return  newCourseState;
        
    }
    
    
    function joinCourse(uint _courseId  , Role _role) 
        haventJoinTheCourse(_courseId,_role)
        payable 
        public {
        Course storage targetCourse = courses[_courseId]; 
        targetCourse.addressToJoinState[msg.sender] = true; 

        if (_role == Role.Student) {
            require(msg.value >= targetCourse.tuitionFee,"the student doesnt have enough fee.");
            targetCourse.students.push(msg.sender);             
            addressToStudentCourse[msg.sender].push(_courseId);
            //course fee
            targetCourse.studentIndexToTuitionFee[targetCourse.students.length-1] += msg.value;
            targetCourse.courseBalance += msg.value;
            emit Deposit(
                msg.sender,
                targetCourse.studentIndexToTuitionFee[targetCourse.students.length-1],
                targetCourse.courseBalance);

        }else if(_role == Role.Teacher){
            require (courses[_courseId].teacher == address(0),"The teacher is not empty!!"); 
            courses[_courseId].teacher = msg.sender; 
            addressToTeacherCourse[msg.sender].push(_courseId);
        }
        emit JoinCourse(msg.sender) ;

            
    } 

    
    function leaveCourse(uint _courseId  ) 
        payable 
        public 
        returns(uint) {
            Course storage targetCourse = courses[_courseId];       
            address[] storage students  = targetCourse.students;
            
                
            if (targetCourse.teacher==msg.sender){
                targetCourse.teacher = address(0);
                removeFromCourseTeacher(targetCourse.id);
            } else {
               for (uint i = 0; i<students.length; i++){
                   if(students[i]==msg.sender && targetCourse.addressToJoinState[msg.sender]==true){
                       //refund when a student leave the course
                       uint studentTuitionFee = targetCourse.studentIndexToTuitionFee[i];
                        msg.sender.transfer(studentTuitionFee);
                        // targetCourse.addressToJoinState[msg.sender]
                        
                        targetCourse.courseBalance -= studentTuitionFee;
                        emit Refund(msg.sender,studentTuitionFee,targetCourse.courseBalance ); 
                        targetCourse.studentIndexToTuitionFee[i] = 0; 
                        
                        removeFromCourseStudent(targetCourse.id);
                   } 
               }
            }
            courses[_courseId].addressToJoinState[msg.sender] = false; 
            
            return courses[_courseId].id;
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
    function getCourseStates() public view returns(CourseJoinState[] memory){
        CourseJoinState[] memory courseJoinStates = new CourseJoinState[](courses.length); 
        
        for (uint i=0; i<courses.length; i++){
            Course storage targetCourse  = courses[i];
            uint CourseId = i;
            address[] memory validStudents =  new address[](targetCourse.students.length);
            for (uint s=0;s<targetCourse.students.length;s++){
                if(isAddressInCourse(CourseId,targetCourse.students[s])==true){
                    validStudents[s] = targetCourse.students[s];
                }
            } 

            courseJoinStates[i] =  CourseJoinState({
                id: targetCourse.id,
                title: targetCourse.title,
                description: targetCourse.description,
                teacher: targetCourse.teacher,
                students: validStudents,
                tuitionFee: targetCourse.tuitionFee,
                courseBalance : targetCourse.courseBalance
          });
        }
        return courseJoinStates;   
    }
    function getCourseState(uint _courseId) public view returns(CourseJoinState memory){
          Course storage targetCourse = courses[_courseId];
          address[] memory validStudents =  new address[](targetCourse.students.length);
          for (uint i=0;i<targetCourse.students.length;i++){
              if(isAddressInCourse(_courseId,targetCourse.students[i])==true){
                  validStudents[i] = targetCourse.students[i];
              }
          } 
          CourseJoinState memory courseState =  CourseJoinState({
                id: targetCourse.id,
                title: targetCourse.title,
                description: targetCourse.description,
                teacher: targetCourse.teacher,
                students: validStudents,
                tuitionFee: targetCourse.tuitionFee,
                courseBalance : targetCourse.courseBalance
          });
          return courseState ;
    }
    
    function getStudentsByCourseId(uint _courseId) public view returns(address[] memory ){
        Course storage targetCourse = courses[_courseId] ; 
        uint  studentIndex = 0;
        address[] memory validStudent =new address[](targetCourse.students.length);

        for(uint i=0; i<targetCourse.students.length; i++){
            if( targetCourse.addressToJoinState[targetCourse.students[i]] == true){
                validStudent[studentIndex] = targetCourse.students[i];
                studentIndex+=1;
            }
        }
        return validStudent;     
    }
    
    function isAddressInCourse(uint _courseId, address _address) public view returns(bool){
            return courses[_courseId].addressToJoinState[_address];
    }

    function getTeacher(uint _courseId) public view returns(address ){
        return courses[_courseId].teacher;     
    }
    
    function withdraw() public {
        msg.sender.transfer(address(this).balance);
    }
    function getOwner() public view returns (address){
        return owner;
    }
    function getAddressName(address _address) public view  returns (string memory){
        return addressToName[_address];
    } 
    function setAddressName(address _address, string memory _name) public {
         addressToName[_address] = _name;  
         emit SetName(addressToName[_address]);
    } 
   
    
}