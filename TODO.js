//TODO: catching errors when id involved

//TODO: <p> spaces

//TODO:http://127.0.0.1:1000/profile http://127.0.0.1:1000/username

//TODO: profile and admin/user roles

//TODO: https://stackoverflow.com/questions/59798437/how-to-generate-a-slug-everytime-an-article-is-created-and-saved-in-the-database

//TODO: change user schema to user id and add username to it



//TO Ask when url username or something and go to newBlogers adds it to url

// if i want to add followers/following in profile page I can send all users and check if the id = follower.id display it 


/* 
router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
*/





//TODO: toggle buttons and js files
//TODO: add blogs [{}] to all users 
//TODO: show user's blogs only
//TODO: followers/following, blogers, likes, favorites,