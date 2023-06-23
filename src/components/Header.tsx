import ContentCutIcon from '@mui/icons-material/ContentCut';
import { Typography, Box, Button} from '@mui/material';

export const Header =() =>{
    return(
        <Box sx ={{display:"flex", alignItem:"center", justifyContent:"space-between"}}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <ContentCutIcon/>Scissors
        </Typography> 
        <Button>Login/Signup</Button>
        </Box>
    )

}