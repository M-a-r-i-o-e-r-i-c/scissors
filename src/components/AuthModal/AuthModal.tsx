import { useState, ChangeEvent } from 'react';
import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const AuthModal = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setForm(oldForm => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleAuth = async () => {
    if (isSignIn) {
      try {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } catch (error) {
        console.error('Error signing in: ', error);
        // Handle the sign-in error here
      }
    } else {
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      try {
        await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
      } catch (error) {
        console.error('Error signing up: ', error);
        // Handle the sign-up error here
      }
    }
  };

  return (
    <Dialog open fullWidth>
      <DialogTitle>{isSignIn ? 'Sign in' : 'Sign up'}</DialogTitle>
      <DialogContent>
      {!isSignIn && (
          <>
            <TextField
              variant="filled"
              style={{ marginBottom: '24px' }}
              fullWidth
              type="text"
              value={form.username}
              name="username"
              onChange={handleChange}
              label="Username"
            />
            {/* <TextField
              variant="filled"
              fullWidth
              type="password"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              label="Confirm Password"
              error={error !== ''}
              helperText={error}
            /> */}
          </>
        )}
        <TextField
          variant="filled"
          style={{ marginBottom: '24px' }}
          fullWidth
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          variant="filled"
          fullWidth
          type="password"
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
          style={{ marginBottom: '24px' }}
        />
        {!isSignIn && (
          <>
            {/* <TextField
              variant="filled"
              style={{ marginBottom: '24px' }}
              fullWidth
              type="text"
              value={form.username}
              name="username"
              onChange={handleChange}
              label="Username"
            /> */}
            <TextField
              variant="filled"
              fullWidth
              type="password"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              label="Confirm Password"
              error={error !== ''}
              helperText={error}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Box
          mx={2}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Add a hover effect over the typography below */}
          <Typography onClick={() => setIsSignIn(oldValue => !oldValue)}>
            {isSignIn ? "Don't have an account?" : 'Already have an account?'}
          </Typography>
          <Button disableElevation variant="contained" onClick={handleAuth}>
            {isSignIn ? 'Sign in' : 'Sign up'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
