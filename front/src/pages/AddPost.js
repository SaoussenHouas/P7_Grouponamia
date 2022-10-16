import Header from '../components/Header'
import HeaderMobile from '../components/HeaderMobile'

import { useState } from 'react'
import { addUserPost } from '../API/post'
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'


// Add post component
export default function AddPost() {
    const [post, setPost] = useState('')
    const [imagePost, setImagePost] = useState('')
    const [openSnackBar, setOpenSnackBar] = useState(false)
    let navigate = useNavigate()


function handleSnackBar(){
    return(
        <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={() => setOpenSnackBar(false)}>
            <Alert severity= "error">Ajoutez une photo et un texte</Alert>
        </Snackbar>
    )
}

    function onSubmit () {
        const token = JSON.parse(localStorage.getItem('session'))
        if( post!="" && imagePost !="") {
            const data = {
                userId: token.userId,
                description: post,
            }
            addUserPost(data, imagePost).then(() => { navigate('/homepage') })
        } else {
            setOpenSnackBar(true)
        }
    }

    function handlePicture(e){
        setImagePost(e.target.files[0])
    }
    
    return (
        <div>
            <Header />
            <HeaderMobile />
            {handleSnackBar()}
            <div className='addPost flex column'>
                
                <div className='postContent flex'>
                    <div className='addImg flex column align-center justify-center text-center'>
                        <div className='postTitle flex align-center justify-center column'>
                            <IconButton className="material-icons red" color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" onChange={handlePicture}/>
                                <PhotoCamera />
                            </IconButton>
                           
                            <h1>
                                {
                                    imagePost ? imagePost.name : "Cliquez pour télécharger la photo depuis votre appareil"
                                }
                            </h1>
                        </div>
                        <span>Recommandation: Utilisez des fichiers .jpg de haute qualité de moins de 20mo.</span>
                    </div>
                    
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        fullWidth
                        maxRows={4}
                        helperText="160 caractères maximum"
                        placeholder="Commencer votre post"
                        variant="standard"
                        onChange={(e) => {setPost(e.target.value)}}
                    />

                </div>

                <div className='postButton flex end'>
                    <button onClick={onSubmit}>Enregistrer</button>
                </div>    

            </div>
        </div>    
    )
}