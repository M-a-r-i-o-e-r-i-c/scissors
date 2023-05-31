import {useState, ChangeEvent} from 'react';
import { TextField, Typography, Button} from '@mui/material';
import {auth} from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const Body =() =>{
    const [form, setForm] = useState({
        email:'',
        password:'',
    })

    const handleChange = (event:ChangeEvent<HTMLInputElement>):void => setForm (oldForm => ({
        ...oldForm,
        [event.target.name]:event.target.value
    }))

    const handleSignUp = async ()=>{
        try{
            await createUserWithEmailAndPassword(auth, form.email, form.password)
        } catch(error){
            console.error('Error signing up: ', error);
            // Handle the sign-up error here
          }
    }
    const handleSignIn = async ()=>{
        try{
            await signInWithEmailAndPassword(auth, form.email, form.password)
        } catch(error){
            console.error('Error signing up: ', error);
            // Handle the sign-up error here
          }
    }


    return(<>
        <Typography>Home</Typography>
        <TextField  value = {form.email} name="email" onChange={handleChange} label="Email"/>
        <TextField type="password" value = {form.password} name="password" onChange={handleChange}label="Password"/>
        <Button onClick={handleSignUp}>Sign up</Button>
        <Button onClick={handleSignIn}>Sign in</Button>
    </>
    )

}