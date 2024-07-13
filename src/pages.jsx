import { useAuth } from './customhooks';
import { useNavigate } from "react-router-dom";
import "./pages.css"
import { useEffect } from 'react';

export default function Login() {
    const { accessToken, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken && accessToken !== "no") {
            navigate("/");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

   return(
   
    <div className='login-component'>
        <h2 className='login-header'>Chat App Login</h2>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
   )
  
}

