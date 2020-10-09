import bcrypt from 'bcrypt';

//just sample code to generate hashed password before storing to db.. 
async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash('1234', salt);
  console.log(hashpassword);
}

run();
