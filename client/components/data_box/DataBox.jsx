
import { Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {FONT_FAMILY} from '../../assets/Fonts/FontFamily'
import { getPostsRequest } from '../../api/Posts';
import { useState , useEffect } from 'react';
  


export default function DataBox() {
  const [Post, setPost] = useState([]);

  const getPosts= async () => {
    const res = await getPostsRequest()
    setPost(res.data)
  }

  useEffect(() => {
    getPosts()
  }, []);


  return (
    <Grid item xs={12} lg={8}>
        <Paper sx={{ borderRadius:"20px"}} elevation={4} >
            <DataGrid 
            editMode="row" 
            rows={rows} 
            columns={columns} 
            sx={{
              borderRadius: "20px",
              '& .MuiDataGrid-columnHeaderTitle': {
                fontFamily: FONT_FAMILY
              },
              '& .MuiDataGrid-cell': {
                fontFamily: FONT_FAMILY 
              }
            }}  
            hideFooterPagination 
            hideFooter 
            disableColumnMenu/>
        </Paper>
        {
          Post.map(post =>(
            <div key={post.DNI}>
              {post.DNI}  
              {post.Name}
              {post.LastName}
            </div>
          ))
        }
    </Grid>                                   
  );    
}

const columns = [
  {
    field: 'DNI',
    headerName: 'DNI',
    align: 'center',
    headerAlign:"center",
    editable: true,
  },
  {
    field: 'Name',
    headerName: 'Name',
    type: 'text',
    editable: true,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'LastName',
    headerName: 'Last Name',
    type: 'Text',
    align: 'center',
    headerAlign: 'center',
    editable: true,
  },
  {
    field: 'Age',
    headerName: 'Age',
    type: 'Number',
    align: 'center',
    headerAlign: 'center',
    editable: true,
  },
  {
    field: 'DateOfBirth',
    headerName: 'Date of Birth',
    type: 'date',
    align: 'center',
    headerAlign: 'center',
    editable: true,
  }
];

const rows = [
  {
    id:1,
    DNI: 12345678,
    Name:"angelo",
    LastName: "ahoque",
    Age:23,
    DateOfBirth: new Date("1990-01-01"),
  },
  {
    id:2,
    DNI: 12345678,
    Name:"angelo",
    LastName: "bhoque",
    Age:23,
    DateOfBirth: new Date("1990-01-01"),
  },
  {
    id:3,
    DNI: 12345678,
    Name:"angelo",
    LastName: "Choque",
    Age:23,
    DateOfBirth: new Date("1990-01-01"),
  },
  {
    id:4,
    DNI: 12345678,
    Name:"angelo",
    LastName: "dhoque",
    Age:23,
    DateOfBirth: new Date("1990-01-01"),
  },
  {
    id:5  ,
    DNI: 12345678,
    Name:"angelo",
    LastName: "ehoque",
    Age:23,
    DateOfBirth: new Date("1990-01-01"),
  }
];