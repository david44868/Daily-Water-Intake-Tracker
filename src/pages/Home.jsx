import '../App.css';
import GaugeChart from 'react-gauge-chart';
import React, { useState, useEffect } from 'react';
import PopUpModal from '../components/PopUpModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ref, set, onValue } from "firebase/database";

export default function Home() {

    const [open, setOpen] = useState(false);
    const [percent, setPercent] = useState(0);
    const [realPercent, setRealPercent] = useState(0);
    const notify = () => toast.success("Daily requirement has been met.");
    const [isNotified, setIsNotified] = useState(false);
    const navigate = useNavigate();
    const today = new Date().toLocaleString().split(',')[0].replace(/\//g, '-');
    const [userId, setId] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };
  
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setId(user.uid);
                const userRef = ref(db, 'users/' + user.uid + "/" + today);
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val().waterIntake;
                    setRealPercent(data);
                    if(data >= 100)
                        setPercent(1);
                    else
                        setPercent(data / 100);
                });      
            } 
            else {
                console.log("user is not logged in");
                navigate("/");
            }
        });
         
    }, [])

    const handleSubmit = (waterAmount) => {
        if(percent + (waterAmount / 16) >= 1) {
            setPercent(1);
            set(ref(db, 'users/' + userId + "/" + today), {
                waterIntake: realPercent + (waterAmount / 16 * 100)
            });
            setRealPercent(realPercent + (waterAmount / 16 * 100));
            if(!isNotified) {
                notify();
                setIsNotified(true);
            } 
        }
        else {
            setPercent(percent + (waterAmount / 16));
            set(ref(db, 'users/' + userId + "/" + today), {
                waterIntake: realPercent + (waterAmount / 16 * 100),
            });
            setRealPercent(realPercent + (waterAmount / 16 * 100));
        }
        handleClose();
    };

    const logout = () => {   
        auth.signOut()
            .then(() => {
                navigate("/");
                alert("Logout successful.")
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    return (
        <div>
            <div class="title">
                <h1>How's My Water?</h1>
                <div class="upper-right">
                    <p class="date">{today}</p>
                    <button
                        type="button"
                        class="my-button"
                        onClick={logout}
                    >
                        Log Out
                    </button>
                </div>
                <GaugeChart id="gauge-chart3" 
                    nrOfLevels={30} 
                    colors={['#EA4228', '#F5CD19', '#5BE12C']}
                    style={{ width: "50%", minWidth: "600px"}} 
                    arcWidth={0.3}
                    percent={percent} 
                    hideText
                    textColor={["#87CEEB"]}
                />
                <span class="text">
                    {realPercent}%
                    <br/>
                    {realPercent * 16 / 100} / 16 cups
                </span>
                <button class="my-button" onClick={handleOpen}>Add Water</button>
                <PopUpModal open={open} onClose={handleClose} onSubmit={handleSubmit} />
            </div>
            <div class="ocean">
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
            <ToastContainer 
                position="bottom-left"
                autoClose={false}
            />
        </div>
    );
}
