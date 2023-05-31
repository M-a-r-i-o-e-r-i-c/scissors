import {useState, ChangeEvent, MouseEventHandler} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ShortenUrlModalProp{
    handleClose: MouseEventHandler<HTMLButtonElement>;
    createShortenLink:(name: string, longUrl: string) => Promise<void>;
}

export const ShortenUrlModal = ({handleClose, createShortenLink}:ShortenUrlModalProp)=>{
    const [form, setForm] = useState({
        name:'',
        longUrl:'',
    })

    const handleChange = (event:ChangeEvent<HTMLInputElement>):void => setForm (oldForm => ({
        ...oldForm,
        [event.target.name]:event.target.value
    }))

    const handleSubmit = async ()=>{
       try{
        await createShortenLink(form.name, form.longUrl )
       }catch(error){
        console.error(error)
       }
    }

    return(
        <Dialog open={true} fullWidth onClose={handleClose}>
            <DialogTitle>

            <Box display="flex" alignItems="center" justifyContent="space-between">
            Shorten URL
                <IconButton size="small" onClick={handleClose}>

                <CloseIcon/>
                </IconButton>

            </Box>
            </DialogTitle>
            <DialogContent>
                <TextField value={form.name} name="name" onChange={handleChange} sx={{mb:3}} fullWidth variant="filled" label="name"/>
                <TextField value={form.longUrl} name="longUrl" onChange={handleChange} fullWidth variant="filled" label="Long URL"/>

            </DialogContent>
            <DialogActions>
                <Button sx={{mr:2}} variant="contained" onClick={handleSubmit}>Create Short URL</Button>
            </DialogActions>
        </Dialog>

    )
}