import { useState } from "react";
import {  Grid,  Button,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  TablePagination,  Paper,  Typography,  Dialog,  Checkbox,  Box,} from "@mui/material";
import DataForm from "../../components/form/DataForm";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import { FORM_ITEM } from "../../data/Items";
import { UseEmployee } from "../../context/EmployeeContext";


const rowsPerPage = 5;

function EmployeeData() {
  const [Data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [showDataForm, setShowDataForm] = useState(false);
  const [ selectedDataIds, setSelectedDataIds] = useState([]);

  const { Employees } = UseEmployee()
    
  const handleAddData = () => {
    setShowDataForm(true);
  };

  const handleEditData = () => {
    setShowDataForm(true);
  };

  const handleDeleteData = () => {
    const updatedData = Data.filter((data) => !selectedDataIds.includes(data.id));
    setData(updatedData);
    setSelectedDataIds([]);
  };

  const handleSaveData = (data) => {
    if (selectedDataIds.length === 1) {
      const updatedData = Data.map((item) => {
        if (item.id === selectedDataIds[0]) {
          return {
            ...item,
            ...data,
          };
        }
        return item;
      });
      setData(updatedData);
    } else {
      const newData = {
        id: Data.length + 1,
        ...data,
      };
      setData([...Data, newData]);
    }
    setShowDataForm(false);
    setSelectedDataIds([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectData = (DataId) => {
    if (selectedDataIds.includes(DataId)) {
      setSelectedDataIds(selectedDataIds.filter((id) => id !== DataId));
    } else {
      setSelectedDataIds([...selectedDataIds, DataId]);
    }
  };

  const isSelected = (DataId) => selectedDataIds.includes(DataId);

  const handleCloseDataForm = () => {
    setShowDataForm(false);
    setSelectedDataIds([]);
  };

  return (
    <Box sx={{ width: 'calc( 100% - 40px )' }}  pl={32}>
      <Grid container spacing={4}>
        <Grid item xl={12} xs={12} mt={2}>
          <Typography variant="h2" sx={{ fontFamily: FONT_FAMILY }}>
            Employees Data
            {
              Employees.map((employee)=> {
                return (
                  <div key={employee._id}>
                    {employee.Name}
                  </div>
                )
              })
            }
          </Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="center" mt={1}>
          <Grid item marginLeft={4} xs={12}>
            <Button onClick={handleAddData}>Add New Emmployee</Button>
            <Button onClick={handleEditData} disabled={selectedDataIds.length !== 1}>
              Edit data
            </Button>
            <Button onClick={handleDeleteData} disabled={selectedDataIds.length === 0} color="error">
              Delete data
            </Button>
          </Grid>
          <Grid item xs={12} xl={12 }>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#339194" }}>
                    {FORM_ITEM.map((item) => (
                      <TableCell key={item.Title} sx={{textAlign:"center"}}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}>
                          {item.Title}
                        </Typography>
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}>
                          Active
                      </Typography>
                    </TableCell>
                    <TableCell align="center">  
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}>
                        Select
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : Data
                  ).map((data) => (
                    <TableRow key={data._id} hover onClick={() => handleSelectData(data.id)} >
                      {FORM_ITEM.map((item) => (
                        <TableCell key={`${data.id}-${item.Title}`} sx={{textAlign:"center"}}>
                          <Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: "bold",  }} >
                            {data[item.Name]}
                          </Typography>
                        </TableCell>
                      ))}
                      <TableCell align="center" sx={{textAlign:"-webkit-center"}} >
                          <Box sx={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: data.Active ? "green" : "red" }} />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox checked={isSelected(data.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={Data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={showDataForm} onClose={handleCloseDataForm}>
        <DataForm onSave={handleSaveData} onClose={handleCloseDataForm} />
      </Dialog>
    </Box>
  );
}

export default EmployeeData;
