import Header from '../components/Header/Header';
import { DataGrid,GridRenderCellParams , GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import React , {useEffect, useState} from 'react';
import { getUsers } from '../services/apiService';
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
    try {
       const usersData = await getUsers(); // Call the API service function
       setUsers(usersData); // Set the fetched projects data to state
       console.log(users);
    } catch (error) {
       console.error("Failed to fetch users:", error);
    } finally {
       setLoading(false); // Set loading to false after data is fetched
    }
    };

    // fetchUsers();
    // const viewProfile = async (rowData) => {
    //   try {
    //      const usersData = await getUsersById(); // Call the API service function
    //      setUsers(usersData); // Set the fetched projects data to state
    //      console.log(users);
    //   } catch (error) {
    //      console.error("Failed to fetch users:", error);
    //   } finally {
    //      setLoading(false); // Set loading to false after data is fetched
    //   }
    //   };
    fetchUsers();
 }, []);

 const columns = [
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params : GridRenderCellParams ) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // Navigate to a route in the app
          navigate(`/userProfile/${params.row.id}`);
        }}
      >
        Go to Profile
      </Button>
    ),
  }
];

// const rows = users.map((item, index) => ({
//   id: index + 1, // Add a unique ID for each row
//   firstName: item['firstName'],
//   lastname: item['lastname'],
// }));

const rows =
  users.map((user,index) => (
    { id: user['_id'],
     firstName:user['firstname'],lastName:user['lastname'] }
  ));
 // { id: users['_id'], firstName: 'DataGridPro', lastName: 'is Awesome' },
 // { id: 3, firstName: 'MUI', lastName: 'is Amazing' },


    return (
       
        <div className='dashboard'>
             <Header />
            <h1>User details</h1>
            {loading ? (
          <p>Loading Users...</p>
        ) : (
            <div style={{ height: 300, width: '100%' }}>
               <DataGrid rows={rows} columns={columns} />
            </div>
        )}
        </div>
    )
}

export default Dashboard;