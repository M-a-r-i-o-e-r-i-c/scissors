import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc, updateDoc} from 'firebase/firestore';
import { Box, Typography, CircularProgress } from '@mui/material';

interface LinkData {
  longUrl: string;
  userId: string;
  link: string;
  totalClicks: number;
}

const LinkRedirect = () => {
  const { shortLink } = useParams<{ shortLink: string }>();
  const [loading, setLoading] = useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchLinkDoc = async () => {
      if (typeof shortLink === 'string') {
        const linkDocRef = doc(firestore, 'links', shortLink);
        const linkDoc = await getDoc(linkDocRef);
        if (linkDoc.exists()) {
            let { longUrl, userId, link} = linkDoc.data();
            const userLinkDocRef = doc(firestore, 'users', userId, 'links', link);
            const userLinkDoc = await getDoc(userLinkDocRef);
            const userData = userLinkDoc.data() as LinkData;
            const { totalClicks: userTotalClicks } = userData;
            const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i;
            
            if (urlRegex.test(longUrl)) {
                if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
                  longUrl = 'http://' + longUrl;
                }
                if (longUrl.startsWith('www.')) {
                  longUrl = 'http://' + longUrl;
                }
                try {
                  await fetch(longUrl, { method: 'HEAD', mode: 'no-cors' });
                  await updateDoc(userLinkDocRef, {
                    totalClicks: userTotalClicks + 1,
                  });
                    window.location.replace(longUrl);
                  } catch (error) {
                    setLoading(false);
                    console.error('Error caught while redirecting:', error);
                    return;
                  }
              } else {
                setLoading(false);
                console.log('Invalid URL');
              }
            } else {
              setLoading(false);
              console.log('Document not found');
            }
      }
    };

    fetchLinkDoc();
  }, [shortLink]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
      textAlign="center"
    >
      {loading ? (
      <>
        <CircularProgress />
        <Typography variant="h6">Redirecting to link</Typography>
      </>
    ) : (
      <>
        <Typography variant="h6">
          Sorry, we couldn't access the link you requested. Please try again later.
        </Typography>
      </>
    )}
    </Box>
  );
};

export default LinkRedirect;
