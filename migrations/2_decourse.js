const DeCourse = artifacts.require("DeCourse");

module.exports = function(deployer) {
  deployer.deploy(DeCourse).then(()=>{
    console.log(DeCourse.address)
  });
};
