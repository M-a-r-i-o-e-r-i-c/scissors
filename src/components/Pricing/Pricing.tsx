import { Typography, Box } from '@mui/material';
import './Pricing.css';

export const Pricing = () => {
  return (
    <Box id="plan">
      <Box className="pricing-header">
        <Typography variant="h2">
          A <span style={{ color: 'navy' }}>price perfect </span> for your
          needs.
        </Typography>
        <p>
          From catering for your personal, business, event, social needs, you
          can be rest assured we have you in mind in our pricing.
        </p>
      </Box>
      <Box className="pricing-container">
        <Box className="pricing-item">
          <Typography variant="h6">Basic</Typography>
          <Typography variant="h4">Free</Typography>
          <Typography variant="h6">Free plan for all users</Typography>
          <ul>
            <li>Unlimited Url Shortening</li>
            <li>Basic Link Analytics</li>
            <li>Customizable Short Links</li>
            <li>Standard Support</li>
            <li>Ad-supported</li>
          </ul>
        </Box>
        <Box className="pricing-item" id="recommended">
          <Typography variant="h6">Professional</Typography>
          <Typography variant="h4">$15/month</Typography>
          <Typography variant="h6">Ideal for business creators</Typography>
          <ul>
            <li>Enhanced link Analytics</li>
            <li>Custom Branded Domains</li>
            <li>Advanced Link Customization</li>
            <li>Priority Support</li>
            <li>Ad-free Experience</li>
          </ul>
        </Box>
        <Box className="pricing-item">
          <Typography variant="h6">Teams</Typography>
          <Typography variant="h4">$25/month</Typography>
          <Typography variant="h6">Share with up to 10 users</Typography>
          <ul>
            <li>Team Collaboration</li>
            <li>User Roles and Permissions</li>
            <li>Enhanced Security</li>
            <li>API Access</li>
            <li>Dedicated Account Manager</li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
};
