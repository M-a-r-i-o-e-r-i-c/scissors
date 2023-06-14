import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Account } from './pages/Account';
import { QrCode } from './components/QrCode/QrCode';
import MarkDownEditor from './components/MarkdownEditor/MarkDownEditor';
import Dashboard from './components/Dashboard/Dashboard';
import LinkRedirect from './components/LinkRedirect';
import { auth } from './firebase';
import { User } from 'firebase/auth';
import { CircularProgress, Box } from '@mui/material';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const { pathname } = useLocation();
  const [initialLoad, setInitialLoad] = useState(
    pathname === '/' || pathname === '/account' ? true : false
  );
  // console.log(location)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (initialLoad) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/account" /> : <Home />} />
      <Route
        path="/account/*"
        element={
          user ? (
            <Account>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/qr-code" element={<QrCode />} />
                <Route path="/editor" element={<MarkDownEditor />} />
              </Routes>
            </Account>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/:shortLink" element={<LinkRedirect />} />
    </Routes>
  );
}

export default App;
