import { useState } from "react";
import {  Grid,  Button,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  TablePagination,  Paper,  Typography,  Dialog,  Checkbox,  Box,} from "@mui/material";
import DataForm from "../../components/form/DataForm";
import DataFormEdit from "../../components/form/DatFormEdit";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import { FORM_ITEM } from "../../data/Items";
import { UseEmployee } from "../../context/EmployeeContext";



const rowsPerPage = 5;

function EmployeeData() {
  const [ page, setPage] = useState(0);
  const [ showDataForm, setShowDataForm] = useState(false);
  const [ showDataFormEdit , setShowDataFormEdit] = useState(false);
  const [ selectedEmployeeId, setSelectedEmployeeId] = useState([]);
  const [ currentEmployee, setCurrentEmployee] = useState();
  const { Employees ,setEmployees , deleteEmployee , getEmployee } = UseEmployee()



  const handleAddData = () => {
    setShowDataForm(true);
  }

  const handleEditData = async() => {
      setShowDataFormEdit(true)
      setCurrentEmployee(await getEmployee(selectedEmployeeId[0]))
  };
  

  const handleDeleteData = async() => {
    await Promise.allSettled(selectedEmployeeId.map(deleteEmployee));
    setSelectedEmployeeId([]);
  };

  const handleSaveData = (employee) => {
    if (selectedEmployeeId.length === 1) {
      const updatedData = Employees.map((item) => {
        if (item.id === selectedEmployeeId[0]) {
          return {
            ...item,
            ...employee,
          };
        }
        return item;
      });
      setEmployees(updatedData);
      setShowDataFormEdit(false);
    } else {
      const newData = {
        ...employee,
      };
      setEmployees([...Employees, newData]);
    }
    setShowDataForm(false);
    setSelectedEmployeeId([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectData = (EmployeeId) => {
    if (selectedEmployeeId.includes(EmployeeId)) {
      setSelectedEmployeeId(selectedEmployeeId.filter((id) => id !== EmployeeId));
    } else {
      setSelectedEmployeeId([...selectedEmployeeId, EmployeeId]);
    }
  };

  const isSelected = (EmployeeId) => selectedEmployeeId.includes(EmployeeId);

  const handleCloseDataForm = () => {
    setShowDataForm(false);
    setSelectedEmployeeId([]);
  };

  const handleCloseDataFormEdit = () => {
    setShowDataFormEdit(false);
    setSelectedEmployeeId([]);
  };


  return (
    <Box sx={{ width: 'calc( 100% )' }}  pl={{xl:32,lg:32, md:5, xs:5}} pr={2}>
      <Grid container spacing={4}>
        <Grid item xl={12}  mt={2}>
          <Typography variant="h2" sx={{ fontFamily: FONT_FAMILY }}>
            Employee Data
          </Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="center" mt={1}>
          <Grid item marginLeft={4} xs={12}>
            <Button onClick={handleAddData}>Add New Emmployee</Button>
            <Button onClick={handleEditData} disabled={selectedEmployeeId.length !== 1}>
              Edit Data
            </Button>
            <Button onClick={handleDeleteData} disabled={selectedEmployeeId.length === 0} color="error">
              Delete Data
            </Button>
          </Grid>
          <Grid item xs={12} xl={12 }>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#339194" }}>
                    {FORM_ITEM.map((item) => (
                      <TableCell key={item.id} sx={{textAlign:"center"}}>
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
                    ? Employees.slice(page * rowsPerPage,   page * rowsPerPage + rowsPerPage)
                    : Employees
                  ).map((employee) => (
                    <TableRow key={employee.DNI} hover onClick={() => handleSelectData(employee._id)} >
                      {FORM_ITEM.map((item) => (
                        <TableCell key={item.id} sx={{textAlign:"center"}}>
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
        <DataForm onSave={handleSaveData} onClose={handleCloseDataForm}/>
      </Dialog>
      <Dialog open={showDataFormEdit} onClose={handleCloseDataFormEdit}>
        <DataFormEdit onSave={handleSaveData} onClose={handleCloseDataFormEdit} employee={currentEmployee} />
      </Dialog>
    </Box>
  );
}

export default EmployeeData;
