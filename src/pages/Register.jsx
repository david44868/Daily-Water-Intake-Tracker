import '../App.css';
import React from 'react';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import {useState} from 'react';
import { ref, set } from "firebase/database";

export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [samePassword, setSamePassword] = useState('');
    const navigate = useNavigate();
    const today = new Date().toLocaleString().split(',')[0].replace(/\//g, '-');

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(password !== samePassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userRef = ref(db, 'users/' + user.uid + "/" + today);
            const newUser = {
                waterIntake: 0
            }
            set(userRef, newUser);
            navigate("/home");
            alert("User successsfully created.");
            console.log(user);
        } catch (error) {
            console.log(error);
            alert("The email is already being in use.");
        }
    }

    return (
        <div class="title">
            <div class="container">
                <form onSubmit={handleSignUp}>
                    <label class="login">H₂Bro</label>
                    <p>Your friend to healthier drinking habits</p>
                    <input 
                        required type="email" 
                        name="email" 
                        placeholder="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='off'
                    />
                    <input required type="password" name="password" minlength="6" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input required type="password" name="samePassword" minlength="6" placeholder="reenter password" value={samePassword} onChange={(e) => setSamePassword(e.target.value)}/>
                    <button type="submit">Register</button>
                    <a href="/">Back</a>
                </form>
            </div>  
        </div>
    );
}