// db.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

export const db = async () => { 
  await mongoose.connect(
	"mongodb://127.0.0.1:27017/reactdb",	{
	        useNewUrlParser: true
	    }
	);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/reactdb');` if your database has auth enabled
};

