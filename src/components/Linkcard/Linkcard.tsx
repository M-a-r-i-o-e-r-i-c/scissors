import { MouseEventHandler, memo, useState } from 'react';
import { shallowEqual } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCodeIcon from '@mui/icons-material/QrCode';
import axios from 'axios';

interface LinkCardProps {
  // id: string;
  name: string;
  longUrl: string;
  shortLink: string;
  createdAt: string;
  totalClicks: number;
  sources: string[];
  linkId: string;
  userId: string;
  deleteLink: MouseEventHandler<HTMLButtonElement>;
  copyLink: (shortUrl: string) => void;
}

const LinkCard = memo(
  ({
    name,
    longUrl,
    shortLink,
    createdAt,
    totalClicks,
    sources,
    // linkId,
    // userId,
    deleteLink,
    copyLink,
  }: LinkCardProps) => {
    // console.log("link card prop")

    const shortUrl = `${window.location.host}/${shortLink}`;
    const safeSources = sources || [];

    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };

    const generateQRCode = async (shortUrl: string) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://quickchart.io/qr?text=${encodeURIComponent(
            shortUrl
          )}&size=200`,
          {
            responseType: 'blob',
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${name}_QRCode.png`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);

        setSnackbarMessage('QR code generated successfully!');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error generating QR code:', error);
        setSnackbarMessage('Error generating QR code. Please try again.');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box my={2}>
          <Typography variant="overline">Created at {createdAt}</Typography>
          <Box>
            <Typography variant="h5">{name}</Typography>
            <Typography>{longUrl}</Typography>
          </Box>
          <Box display="flex">
            <Typography color="blue">{shortUrl}</Typography>
            <Button
              size="small"
              variant="outlined"
              sx={{ ml: 2, color: 'blue' }}
              onClick={() => copyLink(shortUrl)}
              startIcon={<FileCopyIcon />}
              title="Copy"
            ></Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ ml: 2, color: 'red' }}
              onClick={deleteLink}
              startIcon={<DeleteIcon />}
              title="Delete"
            ></Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={() => generateQRCode(shortUrl)}
              disabled={loading}
              startIcon={<QrCodeIcon />}
              title="Generate QR Code"
            ></Button>
            {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            action={
              <Button
                color="secondary"
                size="small"
                onClick={handleCloseSnackbar}
              >
                Close
              </Button>
            }
          />
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
        <Box>
          <Typography variant="overline">Sources</Typography>
          <Box
            display="flex"
            flexDirection="column"
            overflow="auto"
            maxHeight="200px"
            gap={1}
          >
            {safeSources.map((source, index) => (
              <Chip key={index} label={source} />
            ))}
          </Box>
        </Box>
        {/* <CustomDomain userId={userId} linkId={linkId} /> */}
      </Box>
    );
  },
  shallowEqual
);
export default LinkCard;
