const express = require("express");
const mongoose = require('mongoose');
const Company = require("./models/company.model.js");
const cors = require('cors');
require('dotenv').config();
const dbPassword = process.env.DB_PASS;
const dbUser = process.env.DB_USER;

const app = express();
app.use(express.json());
app.use(cors());

// app.listen(3000,()=>{
//     console.log("server active on port 3000")
// });


// api testing
app.get('/',(req,res)=>{
  res.send("Hello from Node API UPDATE");
});
// works


app.get ('/api/companies', async(req,res) => {
  const { industry, minRating } = req.query;
  const filter = {};

  // add other filters if added to html
  if (industry) filter.industry = industry; 
  if (minRating) filter.rating = { $gte: parseFloat(minRating) }; 

  try {
      const companies = await Company.find(filter).sort({ wg_certified: -1, rating: -1 }); // sorting by our certification first and then the rating in order
      res.json(companies);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});
// finally works in insomnia

// post saves something
app.post('/api/companies', async (req,res)=>{
  try{
      // wanting to save the product- adding aync bc await - going to take time
      const companies = await Company.create(req.body)
      res.status(200).json(companies);
  } catch(error){
      res.status(500).json({message: error.message});
  }
  // console.log(req.body);
  // res.send(req.body);
});

// app.put to update- didnt get to it yet
app.get('/api/companies/:id', async (req, res) => {
  const companyId = req.params.id;

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

mongoose.set('debug', true);

// mongodb connection
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@hhwagegap.9apkj.mongodb.net/Node-API?retryWrites=true&w=majority&appName=hhwageGap`)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log("Mongoose connection + server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Connection failed", err);
    console.error('Error stack:', err.stack);
  });
