const Post = require('../model/Post')
const fs = require('fs'); // Node module for images
const User = require('../model/User')
const jwt = require('jsonwebtoken')


      //Créer un post

  exports.createPost = async (req, res, next) => {
    // Renforcer la Securité : Verification de l'Utilisateur connecté
    const token = req.headers.authorization.split(" ")[0];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const usrId = decodedToken._id;
    const userParam  = req.params.id;
    if(userParam ==! usrId) return res.status(400).send('Utilisateur erroné');

// Crée un objet avec req.body
    const postObject = JSON.parse(req.body.post)

    // Create a new post
    const post = new Post({
        ...postObject, // copy the object and add the rest

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        usersLiked: [],
        
    })
    // Enregistrez le message et envoyez la réponse
    try {
      post.save()
      res.send({message: "Post créé"})
    } catch(err) {
          res.status(401).send(err)
    }
}

   // Récupérer tous les posts
   exports.getAllPost = (req, res, next) => {
    // Renforcer la Securité : Verification de l'Utilisateur connecté
    const token = req.headers.authorization.split(" ")[0];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const usrId = decodedToken._id;
    const userParam  = req.params.id;
    console.log(usrId);

    if(userParam ==! usrId) return res.status(400).send('Utilisateur erroné');
  
    User.findOne({ _id: usrId }).then((connectedUser) => { 
        console.log(connectedUser.isAdmin);
  
        Post.find()
          .then((posts) => res.status(200).json(posts))
          .catch((error) =>
            res.status(400).json({
              error,
            })
          ); 
    });
  };

    // Récupérer ONE POST
    
    exports.getOnePost = (req, res, next) => {
    // Renforcer la Securité : Verification de l'Utilisateur connecté
    const token = req.headers.authorization.split(" ")[0];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const usrId = decodedToken._id;
    const userParam  = req.params.id;
    if(userParam ==! usrId) return res.status(400).send('Utilisateur erroné');
  
    // Trouver l'ID de publication que nous voulons dans la base de données
    Post.findOne({
        _id: req.params.id
    })

    // Return the post
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({
    error
    }));
};

    // UPDATE A POST 
  exports.modifyPost = (req, res, next) => {
    // Renforcer la Securité : Verification de l'Utilisateur connecté
    const token = req.headers.authorization.split(" ")[0];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const usrId = decodedToken._id;
    const userParam  = req.params.id;
    if(userParam ==! usrId) return res.status(400).send('Utilisateur erroné');

    let postObject = {}

    // S'il y a une modification d'image
    req.file ? (

        // Trouver l'ID de la publication à mettre à jour
        Post.findOne({
            _id: req.params.id
        }).then((post) => {
            const filename = post.imageUrl.split('/images/')[1]
            fs.unlinkSync(`images/${filename}`) // Supprimer l'ancienne image de la base de données
        }),
      
      // Mettre à jour l'objet de publication avec la nouvelle image
      postObject = {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }  
    ) : ( // sinon, mettez simplement à jour l'objet avec les nouvelles valeurs
      postObject = {
        ...req.body
      }
    )

    // Mettre à jour le post avec les nouveaux paramètres
    Post.updateOne(
        {
          _id: req.params.id
        }, {
          ...postObject,
          _id: req.params.id
        }
    )

    // Envoyez la réponse
    .then(() => res.status(200).json({
    message: 'Post modifiée !'
    }))
    .catch((error) => res.status(400).json({
    error
    }))
}



 // Supprimer un post 
  exports.deletePost = (req, res, next) => {
    // Renforcer la Securité : Verification de l'Utilisateur connecté
    const token = req.headers.authorization.split(" ")[0];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const usrId = decodedToken._id;
    const userParam  = req.params.id;
    if(userParam ==! usrId) return res.status(400).send('Utilisateur erroné');

    // Find the ID of the sauce we want to delete
    Post.findOne({
        _id: req.params.id
    })

    .then(post => {
        const filename = post.imageUrl.split('/images/')[1] // Get the image url, split around the name of the file
        fs.unlink(`images/${filename}`, () => { // Delete the file and then, the rest

            Post.deleteOne({
                _id: req.params.id
            })
            .then(() => res.status(200).json({
                message: 'Post supprimé !'
            }))
            .catch(error => res.status(400).json({
                error
            }))
        })
    })

    .catch(error => res.status(500).json({
    error
    }));
}


// LIKE A POST                                   
  exports.likePost = (req, res, next) => {
    // Renforcer la Securité : Verification de l'Utilisateur connecté
    const token = req.headers.authorization.split(" ")[0];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userParam = decodedToken._id;
    
    let like = req.body.like;
    let userId = req.body.userId;
    let postId = req.params.id;

    if(userId ==! userParam) return res.status(400).send('Utilisateur erroné'); 
   
    // Adding 1 like
    if (like === 1) { 
      Post.updateOne({
          _id: postId
        }, {
          $push: {
            usersLiked: userId
          },
          $inc: {
            likes: +1
          }
        })
        .then(() => res.status(200).json({
          message: '1 like added !'
        }))
        .catch((error) => res.status(400).json({
          error
        }))
    }

    // Update like or dislike
    if (like === 0) {
      Post.findOne({
          _id: postId
        })
        .then((post) => {
          if (post.usersLiked.includes(userId)) { 
            Post.updateOne({
                _id: postId
              }, {
                $pull: {
                  usersLiked: userId
                },
                $inc: {
                  likes: -1
                }
              })
              .then(() => res.status(200).json({
                message: '-1 like'
              }))
              .catch((error) => res.status(400).json({
                error
              }))
            }
          })
    }
}                              