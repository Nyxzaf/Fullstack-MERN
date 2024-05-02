import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DatasetIcon from '@mui/icons-material/Dataset';
import TableViewIcon from '@mui/icons-material/TableView';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

export const ITEM = [
    {
        Title:"Home" ,SubTitle:"Home" ,Icon: <HomeIcon sx={{p:0.3}}/>,Path:"/"
    },
    {
        Title:"Data" ,SubTitle:"Operator Data" , Icon: <DatasetIcon/>,Path:"/Data"
    },
    {
        Title:"Tasks" ,SubTitle:"Table Task" , Icon: <PlaylistAddCheckIcon/>, Path:"/Task"
    },      
    {
        Title:"Tables" ,SubTitle:"General Table" , Icon: <TableViewIcon/>, Path:"/Tables"
    },      
    {
        Title:"Help" ,SubTitle:"Contact Us" , Icon: <ContactPhoneIcon sx={{p:0.3}}/>, Path:"/Help"
    }
]

export const FORM_ITEM = [
    {
        Title:"DNI", Name:"DNI" , grid:4,
    },
    {
        Title:"Name", Name:"Name" , grid:4
    },
    {
        Title:"Last Name", Name:"LastName" , grid:4
    },
    {
        Title:"Date of Birth", Name:"DateOfBirth" , grid:4, Type:"Date"
    },
    {
        Title:"Salary", Name:"Salary" , grid:4, Type:"Number"
    },
    {
        Title:"Phone", Name:"Phone" , grid:4
    },
    {
        Title:"Email", Name:"Email" , grid:6
    },
    {
        Title:"Position", Name:"Position" , grid:6
    },
]


