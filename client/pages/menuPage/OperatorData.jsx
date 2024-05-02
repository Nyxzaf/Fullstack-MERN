import { useState } from "react";
import { Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TablePagination, Paper, Typography, Dialog } from "@mui/material";
import DataForm from "../../components/form/DataForm";
import { FONT_FAMILY } from '../../assets/fonts/FontFamily'; 
import { FORM_ITEM } from "../../data/Items";

const rowsPerPage = 5;

function OperatorData() {
  const [Data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [showDataForm, setShowDataForm] = useState(false);
  const [selectedDataIds, setSelectedTaskIds] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const handleAddData = () => {
    setShowDataForm(true);
    setSelectedData(null);
  };

  const handleEditData = () => {
    setShowDataForm(true);
  };

  const handleDeleteData = () => {
    const updatedTasks = Data.filter(data => !selectedDataIds.includes(data.id));
    setData(updatedTasks);
    setSelectedTaskIds([]);
  };

  const handleSaveData = (data) => {
    if (selectedData) {
      const updatedTasks = Data.map(data => {
        if (data.id === selectedData.id) {
          return {
            ...data,
            DNI: data.DNI,
            Name: data.Name,
            LastName: data.LastName,
            Email: data.Email,
            DateOfBirth: data.DateOfBirth,
            Phone: data.Phone,
            Salary: data.Salary,
            Position: data.Position,
            Description: data.Description,
          };
        }
        return data;
      });
      setData(updatedTasks);
    } else {
      const newData = {
        id: Data.length + 1,
        DNI: data.DNI,
        Name: data.Name,
        LastName: data.LastName,
        Email: data.Email,
        DateOfBirth: data.DateOfBirth,
        Phone: data.Phone,
        Salary: data.Salary,
        Position: data.Position,
        Description: data.Description,
      };
      setData([...Data, newData]);
    }
    setShowDataForm(false);
    setSelectedData(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectData = (DataId) => {
    if (selectedDataIds.includes(DataId)) {
      setSelectedTaskIds(selectedDataIds.filter(id => id !== DataId));
    } else {
      setSelectedTaskIds([DataId]);
    }
    const DataToEdit = Data.find(data => data.id === DataId);
    setSelectedData(DataToEdit);
  };

  const isSelected = (DataId) => selectedDataIds.includes(DataId);

  const handleCloseDataForm = () => {
    setShowDataForm(false);
    setSelectedData(null); 
  };


  return (
      <Grid item xl={9} xs={12} ml={{xl:8,xs:0}} > 
        <Grid container spacing={4}>
          <Grid item xl={12} xs={12} mt={4}>
            <Typography variant="h2" sx={{ fontFamily: FONT_FAMILY }}>Operator Data</Typography>
          </Grid>
          <Grid container spacing={2} justifyContent="center" mt={1}>
            <Grid item marginLeft={4} xs={12}>
              <Button onClick={handleAddData}>Add New data</Button>
              <Button onClick={handleEditData} disabled={selectedDataIds.length !== 1}>
                Edit data
              </Button>
              <Button onClick={handleDeleteData} disabled={selectedDataIds.length === 0} color="error">
                Delete data
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#339194' }}>
                    {
                      FORM_ITEM.map(item =>{
                        return (
                            <TableCell key={item.Title}>
                              <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>
                                {item.Title}
                              </Typography>
                            </TableCell>
                        )
                      })
                    }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {(rowsPerPage > 0
                    ? Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : Data
                  ).map((data) => (
                    <TableRow key={data.id} hover onClick={() => handleSelectData(data.id)}>
                      <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{data.id}</Typography></TableCell>
                      <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{data.DNI}</Typography></TableCell>
                      <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{data.Name}</Typography></TableCell>
                      <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{data.LastName}</Typography></TableCell>
                      <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{data.DateOfBirth}</Typography></TableCell>
                      <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{data.Salary}</Typography></TableCell>
                      <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{data.Phone}</Typography></TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{data.Email}</Typography>
                      </TableCell>                                   
                      <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{data.pOSI}</Typography></TableCell>
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
          <DataForm onSave={handleSaveData} onClose={handleCloseDataForm} DataToEdit={selectedData} />
        </Dialog>
      </Grid>
  );
}

export default OperatorData