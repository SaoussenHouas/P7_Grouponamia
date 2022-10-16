import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import Edit from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import ImageListItem from '@mui/material/ImageListItem'

import { useState } from 'react'
import { Link } from "react-router-dom"
import {remove, likePost} from '../API/post'

// Post component
export default function Post({post, refreshPost, userId, isAdmin}){
    const arrayLikes = post.usersLiked
    const [session] = useState(JSON.parse(localStorage.getItem('session')))
    const isOwner = session.userId === post.userId

    // Function removePost delete a post
    function removePost(){
        remove(post._id).then( () => { refreshPost() })
    }

    // Function handleLike manage like post
    function handleLike (){
        //If user is in arrayLikes = false, false === 0, so -1 like
        const isLiked = !arrayLikes.includes(userId) // includes return a boolean
        likePost(post._id, userId, isLiked).then( () => { refreshPost() })
    }

    return(
       <ImageListItem className="post-card">
            <img 
                className='post-card__image'
                alt={post.imageUrl} 
                src={post.imageUrl}
                srcSet={post.imageUrl}
                loading="lazy"
             />
            <div className='post-card__content'>
                <div className="post-card__content--text">
                    <p>{post.description}</p>
                </div>
                <div className="post-card__content--interact flex between">
                        <div className="like material-icons grey">
                            <IconButton className="material-icons grey" aria-label="like" size="small" onClick={handleLike}>
                                {
                                    arrayLikes.includes(userId) ? <ThumbUpIcon/> : <ThumbUpOffAltIcon />
                                }
                            </IconButton>
                            <span>{post.likes}</span>
                        </div>
                        
                        {
                            (isOwner || isAdmin) && ( // && here = return
                                <div className="more">
                                    <Link to={`/updatePost/${post._id}`}>
                                        <IconButton className="material-icons grey" aria-label="delete" size="small">
                                            <Edit />
                                        </IconButton>
                                    </Link>
                                    <IconButton 
                                        className="material-icons grey" 
                                        aria-label="delete" 
                                        size="small" 
                                        onClick={removePost}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ) 
                        }
                        
                </div>
            </div>
            
       </ImageListItem>
    )
}
