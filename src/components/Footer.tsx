import { Typography, Box } from '@mui/material';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
// import LinkedinIcon from '@mui/icons-material/Linkedin';
import FacebookIcon from '@mui/icons-material/Facebook';

export const Footer = () => {
  return (
    <div
      style={{
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        padding: '0',
        maxHeight: '2vh',
        borderTop:"2px solid black",
        marginLeft:"0",
        marginRight:"0"
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'black',
          }}
        >
          <ContentCutIcon />
          Scissors
        </Typography>
        <Box
          style={{
            display: 'flex',
            margin: '10px',
          }}
        >
          <TwitterIcon />
          <InstagramIcon />
          {/* <LinkedinIcon /> */}
          <FacebookIcon />
        </Box>
      </Box>

      <small style={{ background: 'transparent' }}>
        &copy;Copyright Scissors 2023
      </small>
    </div>
  );
};
