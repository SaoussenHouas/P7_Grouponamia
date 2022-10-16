import Logo from '../assets/logo.svg'

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { createUser } from '../API/auth'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'


// Register function (to create a user)
export default function Register(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [openSnackBar, setOpenSnackBar] = useState(false)
    let navigate = useNavigate();

    function submitRegisteration(){
        if(email !== "" && password !== ""){
            const user = {
                email: email,
                password: password
            }
            createUser(user).then((res) => {
                if(res && res.message){
                    navigate('/login', { replace: true })
                } else {
                    setOpenSnackBar(true)
                }
            }).catch((err) => { console.log(err, 'errors')})
        } else {
            setOpenSnackBar(true)
        }
    }

    function handleSnackBar(){
        return(
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
                <Alert severity= "error">Veuillez vérifier votre email ou votre mot de passe</Alert>
            </Snackbar>
        )
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
                    <button disabled={email === "" && password === ""} onClick={submitRegisteration}>S'inscrire</button>
                    <p className="message">Vous avez déjà un compte?
                        <Link to="/login"> Se connecter</Link>
                    </p>
                </div>
            </div>
            {handleSnackBar()}
        </div>
    )
}