import {useState, useEffect} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {Home} from "./pages/Home"
import {Account} from "./pages/Account"
import LinkRedirect from "./components/LinkRedirect";
import {auth} from "./firebase";
import { User } from 'firebase/auth';
import { CircularProgress, Box} from '@mui/material';


function App() {
  const [user, setUser]= useState<User | null>(null)
  const {pathname} = useLocation();
  const[initialLoad, setInitialLoad] = useState(pathname ==="/" || pathname ==="/account"? true:false )
  // console.log(location)
  

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
      setInitialLoad(false)
    })

  }, [])
  
  if(initialLoad){
    return (<Box sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
      <CircularProgress/>
    </Box>)
  }

  return (

        <Routes>
        <Route path="/" element={user ? <Navigate to="/account" /> : <Home />} />
        <Route path="/account" element={user? <Account/>: <Navigate to="/" />}/>
        <Route path="/:shortLink" element={<LinkRedirect/>}/>


        </Routes>
      
  );
}

export default App;
