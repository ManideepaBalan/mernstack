import React, { useEffect, useState } from 'react';
import { getPortfolios, getPortfoliosByUserId, deleteProjectByProjectId } from '../../services/apiService';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

//import axios from 'axios';

// Define the prop type for userId
interface UserProfiletProps {
  userId?: string;
}

const Projects: React.FC<UserProfiletProps> = ({ userId }) => {

//const Projects = () => {
   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

  // Fetch project data from the API
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/portfolio')
//       .then(response => {
//          console.log("aadsdfsdfsaffs")
//         setProjects(response.data);
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the project data!", error);
//       });
//   }, []);

   useEffect(() => {
      const fetchPortfolios = async () => {
      try {
        if(userId && userId !=null && userId != undefined){
          
          const portfolioData = await getPortfoliosByUserId(userId); // Call the API service function
          setProjects(portfolioData); // Set the fetched projects data to state

        }else {
          const portfolioData = await getPortfolios(); // Call the API service function
          setProjects(portfolioData); // Set the fetched projects data to state
        }
      } catch (error) {
         console.error("Failed to fetch projects:", error);
      } finally {
         setLoading(false); // Set loading to false after data is fetched
      }
      };

      fetchPortfolios();
   }, []);

    // Handle form submission
  const deleteProject = async (projectId : any) => {
    try {
     // await axios.put(`http://localhost:5000/api/projects/${projectId}`, project);
      const projectData = await deleteProjectByProjectId(projectId);
      alert('project deleted successfully!');
      navigate(`/userProfile/${projectData['userid']}`);
     // navigate('/projects'); // Redirect to the projects list page after updating
    } catch (error) {
      console.error("Error updating project:", error);
      alert('Failed to update project. Please try again.');
    }
  };
  
  const handleNavigateToSendUserId = () => {
    navigate('/addProject', { state: { user_id: userId } });
  };

  return (
    <div id="projects">
      <Header />
      <section>
      <h2>My Projects</h2>
      <Box>
        <Button onClick={() => {handleNavigateToSendUserId()}}>Add Project</Button>
      </Box>  
      {loading ? (
          <p>Loading projects...</p>
        ) : (
          projects.map((project) => (
            <div key={project['_id']}>
              <Box   sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px',
                            borderBottom: '1px solid #ccc',
                          }}>
              <Box>
                  <h3>{project['portfolioname']}</h3>
                  <p>{project['portfoliodescription']}</p>
                  <a href={project['portfoliolink']} target="_blank" rel="noopener noreferrer">{project['portfoliolink']}</a>
              </Box>
              <Box>
                  <Button onClick={() => {
                  // Navigate to a route in the app
                  navigate(`/editProjects/${project['_id']}`);
                }}>Edit</Button>
                  <Button onClick={() => {deleteProject(project['_id'])}}>Delete</Button>        
                </Box>
             </Box>
            </div>
           
           
          ))
        )}
      </section>
    </div>
  );
}

export default Projects;


