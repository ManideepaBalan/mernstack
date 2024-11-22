import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getProjectByProjectId, updateProjectByProjectId } from '../services/apiService';
import Header from '../components/Header/Header';
import { useLocation } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';


const EditProjects = () => {
  const { projectId } = useParams(); // Assuming the route has :projectId as a param
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.user_id || '';

  // Local state for form data
  const [project, setproject] = useState({
    portfolioname: '',  
    portfoliodescription: '',
    portfoliolink: '',
    user_id:'',
  });

  // Fetch the existing project data when the component mounts
  useEffect(() => {
    const fetchproject = async () => {
      if(projectId && projectId!=null && projectId!=undefined){
        try {
  //const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
        const projectData = await getProjectByProjectId(projectId); // Call the API service function
          setproject(projectData);
        } catch (error) {
          console.error("Error fetching project:", error);
        }
    }
    };

    fetchproject();
  }, [projectId]);
  

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setproject((prevproject) => ({
      ...prevproject,
      [name]: value,
      user_id: userId,
    }));
  };
  

  // Handle form submission
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
     // await axios.put(`http://localhost:5000/api/projects/${projectId}`, project);
     if(projectId && projectId != null && projectId != undefined) {
      const projectData = await updateProjectByProjectId(projectId, project);
      alert('project updated successfully!');
      navigate(`/userProfile/${projectData['userid']}`);

     } else {
      console.log(123);
      console.log(project);
      const projectData =  await axios.post(`http://localhost:5000/api/addProjects`, project);
      alert('project added successfully!');
      //navigate(`/userProfile/${projectData['userid']}`);

     }

    } catch (error) {
      console.error("Error updating project:", error);
      alert('Failed to update project. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <h2>{projectId ? "Edit project" : "Add project"}</h2>
      <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        //width: '400px',
        margin: 'auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
          {/* Text Input */}
      <TextField
        label="Project Name:"
        variant="outlined"
        name="portfolioname"
        value={(project.portfolioname  && project.portfolioname!= null && project.portfolioname != undefined) ? (project.portfolioname) : ""}
        onChange={handleChange}
        fullWidth
        required
      />
        <TextField
        label="Project Description :"
        variant="outlined"
        name="portfoliodescription"
        value={(project.portfoliodescription  && project.portfoliodescription!= null && project.portfoliodescription != undefined) ? project.portfoliodescription : ""}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        required
      />
            {/* Text Input */}
      <TextField
        label="Project Website Link:"
        variant="outlined"
        name="portfoliolink"
        value={(project.portfoliolink && project.portfoliolink!= null && project.portfoliolink != undefined) ? project.portfoliolink : ""}
        onChange={handleChange}
        fullWidth
        required
      />
        
        <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
        </Box>
    </div>
  );
};

export default EditProjects;
