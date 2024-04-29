import HomeIcon from '@mui/icons-material/Home';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DatasetIcon from '@mui/icons-material/Dataset';
import TableViewIcon from '@mui/icons-material/TableView';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

export const ITEM = [
    {
        Title:"Home" ,SubTitle:"Home" ,Icon: <HomeIcon/> 
    },
    {
        Title:"Data" ,SubTitle:"Operator Data" , Icon: <DatasetIcon/> 
    },
    {
        Title:"Tasks" ,SubTitle:"Table Task" , Icon: <PlaylistAddCheckIcon/> 
    },      
    {
        Title:"Tables" ,SubTitle:"General Table" , Icon: <TableViewIcon/> 
    },      
    {
        Title:"Help" ,SubTitle:"Contact Us" , Icon: <ContactPhoneIcon/> 
    }
]

export const ITEM_2 = [
    {
        Title:"Data" ,SubTitle:"Operator Data" , Icon: <DatasetIcon sx={{p:0.2}} /> 
    },
    {
        Title:"Tasks" ,SubTitle:"Table Task" , Icon: <PlaylistAddCheckIcon/> 
    },      
    {
        Title:"Tables" ,SubTitle:"General Table" , Icon: <TableViewIcon/> 
    },      
    {
        Title:"Help" ,SubTitle:"Contact Us" , Icon: <ContactPhoneIcon sx={{p:0.2}}/>
    }
]