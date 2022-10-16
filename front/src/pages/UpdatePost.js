import Header from '../components/Header'
import HeaderMobile from '../components/HeaderMobile'

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { updatePost, getOnepost } from '../API/post'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'


// Update post component
export default function UpdatePost() {
    const { postId } = useParams();
    const [post, setPost] = useState('')
    const [imagePost, setImagePost] = useState(null)
    let navigate = useNavigate()
    
    // const isOwner = storage.userId === post.userId

    useEffect(() => {
        getOnepost(postId).then(res => {
            setPost(res.description)
            setImagePost(res.imageUrl)
        })
    }, [])


    function update(){
        const token = JSON.parse(localStorage.getItem('session'))
        const data = {
            userId: token.userId,
            description: post,
        }
        updatePost(postId, data, imagePost).then(() => { navigate('/homepage') })
    }

    function handlePicture(e){
        setImagePost(e.target.files[0])
    }

    function handleDescription(e){
        setPost(e.target.value)
    }

    return (
        <div>
            <Header />
            <HeaderMobile />
            
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
                        value={post}
                        onChange={handleDescription}
                    />

                </div>
            
                <div className='postButton flex end'>
                    <button onClick={update}>Modifier</button>
                </div>   

            </div>
        </div>    
    )
}