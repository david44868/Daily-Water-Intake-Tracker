import '../App.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Welcome() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            alert("Login successful.");
            console.log(user);
        })
        .catch((error) => {
            alert("Wrong email or password.");
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    return (
        <div class="title">
            <div class="container">
                <form action="/home" method="POST">
                    <label class="login">H₂Bro</label>
                    <p>Your friend to healthier drinking habits</p>
                    <input 
                        required 
                        type="email" 
                        name="username" 
                        autoComplete='off'
                        placeholder="username" 
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input 
                        required 
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button 
                        type="submit"
                        onClick={login}
                    >
                        Login
                    </button>
                    <a href="/register">Register</a>
                </form>
            </div>  
        </div>
    );
}