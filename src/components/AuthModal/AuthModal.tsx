import { useState, ChangeEvent, MouseEventHandler } from 'react';
import { auth, googleProvider } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import './AuthModal.css';
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
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';

interface AuthModalProp {
  handleClose: MouseEventHandler<HTMLButtonElement>;
}

export const AuthModal = ({ handleClose }: AuthModalProp) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setForm(oldForm => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (form.username == '') {
          setError('Please enter a username');
          return;
        }

        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (error) {
      console.log('Error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred. Please try again.');
      }
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <Dialog open fullWidth onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {isSignIn ? 'Sign in' : 'Sign up'}
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box width="100%" style={{ textAlign: 'center' }}>
          <Button
            style={{
              width: '100%',
              border: '2px solid blue',
              marginBottom: '10px',
            }}
            startIcon={<GoogleIcon />}
            onClick={signInWithGoogle}
          >
            {' '}
            {loading ? (
              <CircularProgress size={22} sx={{ color: '#fff' }} />
            ) : (
              'Sign in with Google'
            )}
          </Button>
          <Typography
            variant="h6"
            style={{ marginBottom: '20px' }}
            textAlign="center"
          >
            ---OR---
          </Typography>
        </Box>
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
            <TextField
              variant="filled"
              fullWidth
              type="password"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              label="Confirm Password"
              // error={error !== ''}
              // helperText={error}
            />
          </>
        )}

        <Box mt={0} color="red">
          <Typography>{error}</Typography>
        </Box>
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
          <Typography
            onClick={() => setIsSignIn(oldValue => !oldValue)}
            className="account"
          >
            {isSignIn ? "Don't have an account?" : 'Already have an account?'}
          </Typography>
          <Button
            disableElevation
            variant="contained"
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: '#fff' }} />
            ) : isSignIn ? (
              'Sign in'
            ) : (
              'Sign up'
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
