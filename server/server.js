const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const Portfolios = require('./models/portfolios');
const Users = require('./models/users');
// Enable CORS
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB connection
mongoose.connect('mongodb+srv://pdeepu294:12rg1A0485@cluster0.nfhz3.mongodb.net/portfolio', 
    { 
         useNewUrlParser: true,
         useUnifiedTopology: true 
    })
    .then(() => console.log('***** MongoDB connected'))
    .catch(err => console.log(err));

// Mock data for your projects
// const projects = [
//     {
//       id: 1,
//       name: 'PNC Inc',
//       description: 'A banking website for end users to access their accounts',
//       link: 'http://pnc.com'
//     },
//     {
//       id: 2,
//       name: 'Macys',
//       description: 'Its a shopping website of United states.',
//       link: 'http://macys.com'
//     },
//     {
//       id: 3,
//       name: 'Kastech',
//       description: 'An internal website used by the employee',
//       link: 'http://kastech.com'
//     }
//   ];


// Define a GET route to fetch all projects
app.get('/api/portfolios', async (req, res) => {
  try {
    const projects = await Portfolios.find(); // Fetch all projects
    res.json(projects);
    
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    console.log("Error 500");
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find(); // Fetch all users
    console.log(res.json);
    res.json(users);
    
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    console.log("Error 500");
  }
});

app.get('/api/users/:firstname', async (req, res) => {
  try {
    const firstname = req.params.firstname;
    const users = await Users.find({ firstname: new RegExp(`^${firstname}$`, 'i') }); // Fetch all users
    res.json(users);
    
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    console.log("Error 500");
  }
});

// Route to get user by ID
app.get('/api/portfolios/:userid', async (req, res) => {
  console.log(req.params.userid);
  const userid = req.params.userid;
 // const userid = userId.toString(); // Assuming `user` is already defined
  try {
    console.log(userid);
    const projects = await Portfolios.find({user_id :userid });
    console.log(projects);
      //const portfolios = await Portfolio.find({ portfolioname: new RegExp(`^${portfolioname}$`, 'i') });
      if (projects) {
        res.json(projects);
      } else {
         res.status(404).json({ error: 'User related Projects not found' });
      }
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//route to get project by project Id
// Route to get user by ID
app.get('/api/projects/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  
 // const userid = userId.toString(); // Assuming `user` is already defined
  try {
    const project = await Portfolios.findById(projectId);
      //const portfolios = await Portfolio.find({ portfolioname: new RegExp(`^${portfolioname}$`, 'i') });
      if (project) {
        res.json(project);
      } else {
         res.status(404).json({ error: ' Project not found based on project Id' });
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Portfolio
app.put('/api/editProjects/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    console.log(req);
    // Validate ObjectId
    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ error: 'Invalid portfolio ID format' });
    }

    // Find and update the portfolio
    const updatedPortfolio = await Portfolios.findByIdAndUpdate(
      projectId,
      req.body, // The updated fields, e.g., { title: 'New Title' }
      { new: true, runValidators: true } // Return the updated document
    );

    if (updatedPortfolio) {
      res.json(updatedPortfolio);
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API Route to Add New Project
app.post('/api/addProjects', async (req, res) => {
  try {
    console.log(123);
    console.log(req.body);
    const { portfolioname, portfoliodescription, portfoliolink, user_id } = req.body;
    const newProject = new Portfolios({ portfolioname, portfoliodescription , portfoliolink, user_id });
console.log(456);
console.log(newProject);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Delete Portfolio
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const portfolioId = req.params.id;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(portfolioId)) {
      return res.status(400).json({ error: 'Invalid portfolio ID format' });
    }

    // Find and delete the portfolio
    const deletedPortfolio = await Portfolios.findByIdAndDelete(portfolioId);

    if (deletedPortfolio) {
      res.json({ message: 'Portfolio deleted successfully' });
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
app.listen(PORT, () => {
    
    console.log(`Server is running on port ${PORT}`);
});

