const fs = require('fs');

// destination.txt will be created or overwritten by default.
fs.copyFile('./build/contracts/DeCourse.json', 'src/services/abi.json', (err) => {
  if (err) throw err;
  console.log('Decourse.json was copied to abi.json');
});