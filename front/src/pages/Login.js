import Logo from '../assets/logo.svg'

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { loginUser } from '../API/auth'

import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'


// Function Login to log a user
export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [openSnackBar, setOpenSnackBar] = useState(false)
    let navigate = useNavigate()

    function handleSnackBar(){
        return(
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
                <Alert severity= "error">Veuillez vérifier votre email ou votre mot de passe</Alert>
            </Snackbar>
        )
    }

    function handleLogin(){
        if (email !=="" && password != "") {
            const user = {
                email: email,
                password: password
            }
            loginUser(user).then(res => {
                if(res && res.token && res.userId){
                    const userInfo = {
                        token : res.token,
                        userId: res.userId
                    }
                    localStorage.setItem('session', JSON.stringify(userInfo));
                    navigate('/homepage')
                } else {
                    setOpenSnackBar(true)
                }
            })
        } else {
            setOpenSnackBar(true)
        }
    }

    return(
        <div className="login-page flex column">
            <div className="form flex align-center justify-center column">
                
                <img src={Logo} alt=""/>
                
                <div className="inputs flex column">
                    <div className="email-input">
                        <span>Email</span>
                        <input type="text" placeholder="" onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>

                    <div className="pass-input">
                        <span>Password</span>
                        <input type="password" placeholder="" onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                </div>
                

                <div className="button flex align-center column">
                    <button onClick={handleLogin}>Se connecter</button>
                    <p className="message">Pas encore de compte?
                        <Link to="/register"> Créez un compte</Link>
                    </p>
                </div>
            </div>
            {handleSnackBar()}
        </div>
    )
}