import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {Home} from "./pages/Home"
import {Account} from "./pages/Account"
import {auth} from "./firebase";
import { User } from 'firebase/auth';
import { CircularProgress, Box} from '@mui/material';

function App() {
  const [user, setUser]= useState<User | null>(null)
  const[initialLoad, setInitialLoad] = useState(true)
  

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
      setInitialLoad(false)
    })

  }, [])
  
  if(initialLoad){
    return (<Box mt={5} display="flex" alignItems="center" justifyContent="center">
      <CircularProgress/>
    </Box>)
  }

  return (
      <Router>
        <Routes>
        <Route path="/" element={user ? <Navigate to="/account" /> : <Home />} />
        <Route path="/account" element={user? <Account/>: <Navigate to="/" />}/>

        </Routes>
      </Router>
  );
}

export default App;
