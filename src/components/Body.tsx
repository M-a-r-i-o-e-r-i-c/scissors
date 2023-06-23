import { Typography, Button, Box } from '@mui/material';
import {AuthModal} from "../components/AuthModal/AuthModal"

export const Body = () => {
  return (
    <Box border="1px solid red" height="80vh">
      <AuthModal/>
          <Box>
            <Typography variant="h4">
              Optimize Your Online Experience with Our Advanced URL Shortening
              Solution
            </Typography>
            <Typography>
              Personalize your shortened URLs to align with your brand identity.
              Utilize custom slugs, branded links, and domain customization
              options to reinforce your brand presence and enhance user
              engagement
            </Typography>
            <Box>
              <Button> Get Started For Free</Button>
              <Button> Learn More</Button>
            </Box>
          </Box>
          {/* URL shortener fields */}
    </Box>
  );
};
