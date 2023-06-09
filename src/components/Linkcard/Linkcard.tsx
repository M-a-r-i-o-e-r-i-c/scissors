import {MouseEventHandler, memo} from 'react';
import { shallowEqual } from 'react-redux';
import { Box, Typography, Button} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';


interface LinkCardProps {
  // id: string;
  name: string;
  longUrl: string;
  shortLink: string;
  createdAt: string;
  totalClicks: number;
  deleteLink:MouseEventHandler<HTMLButtonElement>;
  copyLink:(shortUrl:string)=> void;
}


const LinkCard = memo(({
  name,
  longUrl,
  shortLink,
  createdAt,
  totalClicks,
  deleteLink,
  copyLink,
}: LinkCardProps) => {
  // console.log("link card prop")
  const shortUrl = `${window.location.host}/${shortLink}`
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box my={2}>
        <Typography variant="overline">Created at {createdAt}</Typography>
        <Box>
        <Typography variant="h5">{name}</Typography>
        <Typography>{longUrl}</Typography>

        </Box>
        <Box display="flex">
          <Typography color="blue">
            {shortUrl}
          </Typography>
          <Button size="small" variant="outlined" sx={{ml:2, color:"blue"}} onClick={()=>copyLink(shortUrl)}>
            Copy
          </Button>
          <Button size="small" variant="outlined" sx={{ml:2, color:"red"}} onClick={deleteLink}>
            Delete
          </Button>
        </Box>
      </Box>
      <Box>
        <Box>
          <Box display="flex" justifyContent="center">
            <Typography>{totalClicks}</Typography>
            <BarChartIcon />
          </Box>
          <Typography variant="overline">Total Clicks</Typography>
        </Box>
      </Box>
    </Box>
  );
}, shallowEqual);
export default LinkCard;