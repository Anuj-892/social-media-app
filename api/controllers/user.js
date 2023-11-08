const {pool} = require('../util/db')

const getUser = async (req,res)=>{
    const {userId} = req.params;
    try{        
        let q='SELECT * FROM users WHERE users.uid=?;'
        const [response] = await pool.query(q,[userId])
        const {password,...others} = response[0]
        res.status(200).json(others)
    }
    catch(err){
        res.status(500).json(err)
    }
}

const refetchUser = async(req,res) => {
    const {id} = req.userData;
    try{        
        let q='SELECT * FROM users WHERE users.uid=?;'
        const [response] = await pool.query(q,[id])
        const {password,...others} = response[0]
        res.status(200).json(others)
    }
    catch(err){
        res.status(500).json(err)
    }
}

// const updateUser = async (req,res)=>{
//     try{
//         if(req.body.password){
//             const salt=await bcrypt.genSalt(10)
//             req.body.password=await bcrypt.hashSync(req.body.password,salt)
//         }
//         const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
//         res.status(200).json(updatedUser)

//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// }

// const deleteUser = async (req,res)=>{
//     try{
//         await User.findByIdAndDelete(req.params.id)
//         await Post.deleteMany({userId:req.params.id})
//         await Comment.deleteMany({userId:req.params.id})
//         res.status(200).json("User has been deleted!")

//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// }

module.exports={
    getUser,
    refetchUser
    // updateUser,
    // deleteUser

}