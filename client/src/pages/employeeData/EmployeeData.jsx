import { useState } from "react";
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Dialog,
  Box,
  IconButton,
  Container,
} from "@mui/material";
import DatasetIcon from "@mui/icons-material/Dataset";
import DataForm from "../../components/form/DataForm";
import DataFormEdit from "../../components/form/DataFormEdit";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily.js";
import { TABLE_CELL} from "../../data/Items";
import { UseEmployee } from "../../context/EmployeeContext";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from "@mui/icons-material/Send";
import Alert from "../../components/alerts/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import Title from "../../components/header/Title";
import { useNavigate } from "react-router-dom";

const rowsPerPage = 5;

function EmployeeData() {
  const [page, setPage] = useState(0);
  const [showDataForm, setShowDataForm] = useState(false);
  const [showDataFormEdit, setShowDataFormEdit] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState();
  const { Employees, deleteEmployee, getEmployee } = UseEmployee();
  const navigate = useNavigate();

  const handleAddData = () => {
    setShowDataForm(true);
  };

  const handleEditData = (employeeId) => {
    getEmployee(employeeId)
    .then((employee) => {
      setCurrentEmployee(employee);
      setShowDataFormEdit(true);
    });
  };

  const handleDeleteData = (employeeId) => {
    setSelectedEmployeeId([employeeId]);
    setShowAlert(true);
  };

  const handleConfirmDelete =  () => {
    deleteEmployee(selectedEmployeeId[0], () => {
      setSelectedEmployeeId([]);
      setShowAlert(false);
    });
  };

  const handleSaveData = () => {
    setSelectedEmployeeId([]);
    setShowDataForm(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectData = (EmployeeId) => {
    if (selectedEmployeeId.includes(EmployeeId)) {
      setSelectedEmployeeId(
        selectedEmployeeId.filter((id) => id !== EmployeeId)
      );
    } else {
      setSelectedEmployeeId([...selectedEmployeeId, EmployeeId]);
    }
  };

  const handleCloseDataForm = () => {
    setShowDataForm(false);
    setSelectedEmployeeId([]);
  };

  const handleCloseDataFormEdit = () => {
    setShowDataFormEdit(false);
    setSelectedEmployeeId([]);
  };

  return (
    <main>
      <Title title="Employee Data" Icon={DatasetIcon} />
      <Container component="section" >
        <Typography
          fontSize={25}
          mt={2}
          variant="body2"
          fontFamily={FONT_FAMILY}
        >
          Here you will place the employee information into the database.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xl={12} xs={12}>
            <Button 
            onClick={handleAddData}
            variant="outlined"
            endIcon={<SendIcon />}
            sx={{my:2}}
            >
              Add New Employee
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#339194" }}>
                    {TABLE_CELL.map((item) => (
                      <TableCell key={item.id} sx={{ textAlign: "left" }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}
                        >
                          {item.Title}
                        </Typography>
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}
                      >
                        Active
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}
                      >
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? Employees.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : Employees
                  ).map((employee) => (
                    <TableRow
                      key={employee.DNI}
                      hover
                      onClick={() => handleSelectData(employee._id)}
                    >
                      {TABLE_CELL.map((item) => (
                        <TableCell key={item.id} sx={{ textAlign: "left" }}>
                          <Typography
                            variant="body1"
                            sx={{ fontFamily: FONT_FAMILY }}
                          >
                            {item.Type === "Date"
                              ? new dayjs.utc(employee[item.Name]).format(
                                  "DD/MM/YYYY"
                                )
                              : employee[item.Name]}
                          </Typography>
                        </TableCell>
                      ))}
                      <TableCell
                        align="center"
                        sx={{ textAlign: "-webkit-center" }}
                      >
                        <Box
                          sx={{
                            width: 15,
                            height: 15, 
                            borderRadius: "50%",
                            backgroundColor: employee.Active ? "green" : "red",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", justifyContent: "right" }}>
                          <IconButton
                          onClick={()=> navigate(`/infoPage/${employee._id}`)}
                          >
                          <SearchIcon/>
                          </IconButton>
                          <IconButton
                            onClick={() => handleEditData(employee._id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteData(employee._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
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
        <Dialog open={showDataForm} onClose={handleCloseDataForm}>
          <DataForm 
          onSave={handleSaveData} 
          onClose={handleCloseDataForm} 
          />
        </Dialog>
        <Dialog open={showDataFormEdit} onClose={handleCloseDataFormEdit}>
          <DataFormEdit
            onSave={handleSaveData}
            onClose={handleCloseDataFormEdit}
            employee={currentEmployee}
          />
        </Dialog>
        <Alert
          dialog="Are you sure you want to eliminate this employee?"
          open={showAlert}
          onClose={() => setShowAlert(false)}
          onConfirm={handleConfirmDelete}
        />
      </Container>
    </main>
  );
}

export default EmployeeData;
