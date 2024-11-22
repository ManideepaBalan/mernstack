import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch all projects from the API.
 */
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getPortfolios = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolios`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };

// You can add more functions here for other API endpoints, e.g., addProject, deleteProject, etc.
export const getPortfoliosByUserId= async (userid : string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolios/${userid}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectByProjectId = async (projectId: any) =>{
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`);
   // console.log(123);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
   // console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const updateProjectByProjectId = async (projectId: any, project: any) =>{
  try {
    const response = await axios.put(`${API_BASE_URL}/editProjects/${projectId}`, project);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error Updating projects:", error);
    throw error;
  }
};

export const deleteProjectByProjectId = async (projectId : any) =>{
  try {
    const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error Updating projects:", error);
    throw error;
  }
};