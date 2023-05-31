import { Box, Typography, Button} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

interface LinkCardProps {
  // id: string;
  name: string;
  longUrl: string;
  shortLink: string;
  createdAt: string;
  totalClicks: number;
}

export const LinkCard = ({
  name,
  longUrl,
  shortLink,
  createdAt,
  totalClicks,
}: LinkCardProps) => {
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
            {window.location.host}/{shortLink}
          </Typography>
          <Button size="small" variant="outlined" sx={{ml:2, color:"blue"}}>
            Copy
          </Button>
          <Button size="small" variant="outlined" sx={{ml:2, color:"red"}}>
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
};
