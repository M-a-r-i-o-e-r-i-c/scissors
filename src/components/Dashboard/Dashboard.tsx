import { useState, Fragment, useEffect, useCallback} from 'react';
import { Button, Typography, Box, Divider, Snackbar } from '@mui/material';
import LinkCard from '../Linkcard/Linkcard';
import { ShortenUrlModal } from '../Modal/ShortenUrlModal';
import {nanoid} from 'nanoid';
import copy from "copy-to-clipboard";
import {auth} from  "../../firebase";
import {getFirestore, getDocs, doc, addDoc, collection, Timestamp, deleteDoc} from "firebase/firestore";



interface Link{
  id: string;
  name: string;
  longUrl: string;
  shortLink: string;
  createdAt: Timestamp;
  totalClicks: number;
  // sources: string[]; // Add the sources field
  
}
// console.log(auth.currentUser?.uid);


const Dashboard = () => {
  const [newLinkToaster, setNewLinkToaster] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const userId = auth.currentUser?.uid;
   

  const handleCreateShortLink = async (name:string, longUrl:string)=>{
    const link = {
      name, longUrl, createdAt:Timestamp.now(), shortLink:nanoid(6), totalClicks:0, 
      // sources:[]
    }

    const firestore = getFirestore(); // Create a Firestore instance

    
    if (userId) {
      const userDocRef = doc(firestore, 'users', userId); // Get the user document reference
      const linksCollectionRef = collection(userDocRef, 'links'); // Get the links collection reference
      try {
        const response = await addDoc(linksCollectionRef, link);
        // console.log('Document written with ID: ', response.id);
        // Handle the response here
        setLinks((links)=>[...links, {...link, id:response.id}])
        
     
      } catch (error) {
        console.error('Error adding document: ', error);
        // Handle the error here
      }
    } else {
      alert("User does not exist")
    }
    setOpenModal(false);

    
    
    
    

  }

  useEffect(()=>{
    const db = getFirestore();
    const fetchLinks = async()=>{
      if (userId) {
        const userDocRef = doc(db, 'users', userId); // Get the user document reference
        const linksCollectionRef = collection(userDocRef, 'links'); // Get the links collection reference
        try {
          const querySnapshot = await getDocs(linksCollectionRef);
          const tempLinks:Link[] = []
          querySnapshot.forEach((doc) => {
            const data = doc.data() as Omit<Link, 'id'>;
            tempLinks.push({...data,
              id: doc.id})
            // console.log(doc.id, " => ", doc.data());
          });
          // console.log(tempLinks)
          setLinks(tempLinks)
          // Handle the response here
        } catch (error) {
          console.error('Error retrieving documents: ', error);
          // Handle the error here
        }
      } else {
        alert("User does not exist")
      }
    }
    fetchLinks()
    
  }, [userId]);

  const handleDeleteLink = useCallback(async (linkDocID:string) => {
    if (!userId) {
      console.error("User does not exist");
      return;
    }

    const firestore = getFirestore(); // Create a Firestore instance
    const userDocRef = doc(firestore, 'users', userId); // Get the user document reference
    const linksCollectionRef = collection(userDocRef, 'links'); // Get the links collection reference
    const linkDocRef = doc(linksCollectionRef, linkDocID); // Get the document reference for the link
    try {
      await deleteDoc(linkDocRef); // Delete the link document
      setLinks(links.filter(link => link.id !== linkDocID)); // Remove the link from the state
    } catch (error) {
      console.error('Error deleting document: ', error);
      // Handle the error here
    }
    // console.log(linkDocID);
  }, [userId, links])


  const handleCopy = useCallback((shortUrl:string)=>{
    copy(shortUrl)
    setNewLinkToaster(true)
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <Snackbar open = {newLinkToaster} onClose={()=>setNewLinkToaster(false)} autoHideDuration = {2000} message="Link copied to clipboard"/>
      {openModal && <ShortenUrlModal createShortenLink={handleCreateShortLink} handleClose={() => setOpenModal(false)} />}
      <Box display="flex" sx={{ mb: 2, alignItems: 'center' }}>
        <Typography
          variant="h1"
          style={{ fontSize: '35px', fontWeight: 'bold' }}
          sx={{ mr: 2 }}
        >
          Links
        </Typography>
        <Button
          sx={{ backgroundColor: 'blue', color: 'whitesmoke','&:hover': {
      backgroundColor: 'lightblue',}}}
          onClick={() => setOpenModal(true)}
        >
          Create New
        </Button>
      </Box>
      <Box>
        {links.sort((prevLink, nextLink)=> {
          const prevDate = prevLink.createdAt instanceof Timestamp ? prevLink.createdAt.toDate() : prevLink.createdAt;
          const nextDate = nextLink.createdAt instanceof Timestamp ? nextLink.createdAt.toDate() : nextLink.createdAt;
          return nextDate.getTime() - prevDate.getTime();
        }).map((link, index) => (
          <Fragment key={link.id}>
            <LinkCard
              {...link}
              createdAt={link.createdAt? link.createdAt.toDate().toLocaleString() : ''}
              deleteLink={()=>handleDeleteLink(link.id)}
              copyLink ={handleCopy}
            />
            {index !== links.length - 1 ? <Divider /> : null}
          </Fragment>
        ))}
      </Box>
    </div>
  );
};

export default Dashboard;
