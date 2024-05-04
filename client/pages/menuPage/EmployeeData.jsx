import { useState } from "react";
import {  Grid,  Button,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  TablePagination,  Paper,  Typography,  Dialog,  Checkbox,  Box,} from "@mui/material";
import DataForm from "../../components/form/DataForm";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import { FORM_ITEM } from "../../data/Items";
import { UseEmployee } from "../../context/EmployeeContext";


const rowsPerPage = 5;

function EmployeeData() {
  const [page, setPage] = useState(0);
  const [showDataForm, setShowDataForm] = useState(false);
  const [ selectedDataIds, setSelectedDataIds] = useState([]);

  const { Employees ,setEmployees , deleteEmployee } = UseEmployee()



  const handleAddData = () => {
    setShowDataForm(true);
  };

  const handleEditData = () => {
    setShowDataForm(true);
  };

  const handleDeleteData = async() => {
    await Promise.all(selectedDataIds.map(async (id) => {
      await deleteEmployee(id);
    }));
    setSelectedDataIds([]);
    };

  const handleSaveData = (employee) => {
    if (selectedDataIds.length === 1) {
      const updatedData = Employees.map((item) => {
        if (item.id === selectedDataIds[0]) {
          return {
            ...item,
            ...employee,
          };
        }
        return item;
      });
      setEmployees(updatedData);
    } else {
      const newData = {
        id: Employees.length + 1,
        ...employee,
      };
      setEmployees([...Employees, newData]);
    }
    setShowDataForm(false);
    setSelectedDataIds([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectData = (EmployeeId) => {
    if (selectedDataIds.includes(EmployeeId)) {
      setSelectedDataIds(selectedDataIds.filter((id) => id !== EmployeeId));
    } else {
      setSelectedDataIds([...selectedDataIds, EmployeeId]);
    }
  };

  const isSelected = (EmployeeId) => selectedDataIds.includes(EmployeeId);

  const handleCloseDataForm = () => {
    setShowDataForm(false);
    setSelectedDataIds([]);
  };


  return (
    <Box sx={{ width: 'calc( 100% - 40px )' }}  pl={32}>
      <Grid container spacing={4}>
        <Grid item xl={12} xs={12} mt={2}>
          <Typography variant="h2" sx={{ fontFamily: FONT_FAMILY }}>
            Employee Data
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
              Edit Data
            </Button>
            <Button onClick={handleDeleteData} disabled={selectedDataIds.length === 0} color="error">
              Delete Data
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
                    ? Employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : Employees
                  ).map((employee) => (
                    <TableRow key={employee._id} hover onClick={() => handleSelectData(employee._id)} >
                      {FORM_ITEM.map((item) => (
                        <TableCell key={`${employee._id}-${item.Title}`} sx={{textAlign:"center"}}>
                          <Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: "bold",  }} >
                            {employee[item.Name]}
                          </Typography>
                        </TableCell>
                      ))}
                      <TableCell align="center" sx={{textAlign:"-webkit-center"}} >
                          <Box sx={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: employee.Active ? "green" : "red" }} />
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox checked={isSelected(employee._id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={Employees.length}
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
