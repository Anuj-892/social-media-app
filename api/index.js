const express =require('express');
const app=express()
const cors=require('cors')
const multer=require('multer')
const cookieParser=require('cookie-parser')
const path = require('path')

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials",true);
  next();
})
app.use(express.json())
// app.use("/images",express.static())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')
const postRoute=require('./routes/posts')
const likesRoute=require('./routes/likes')
const commentsRoute=require('./routes/comments')
const connectionsRoute=require('./routes/connections')

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentsRoute)
app.use("/api/likes",likesRoute)
app.use("/api/connections",connectionsRoute)

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"/uploads"))
      },

      filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
      }
})

const upload=multer({storage:storage})
app.post("/api/images",upload.single("file"),(req,res)=>{
        const file = req.file;
        res.status(200).json(file.filename);
})

app.listen(5000,()=>{
    console.log('listening');
});
