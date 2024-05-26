const express = require('express')
const mongoDB = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const authRouter = require('./router/auth')
const userRouter = require('./router/user')
const postRouter = require('./router/posts')
const multer = require('multer')
const path = require('path')

dotenv.config()


//Middeleware 
app.use(express.json()) // using for postman 
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'))
app.use(cors())
app.use('/images', express.static(path.join(__dirname,'public/images')))

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
cb(null,'public/images')
    },
    filename:(req,file,cb)=> {
        const fileName = Date.now() + file.originalname
        cb(null,fileName);
    }
})
const upload = multer({storage})

app.post("/api/upload", upload.single('file'), (req,res) => {
    try{   
    return res.status(200).json({fileName:req.file.filename });
    }catch(err){
      return  res.status(400).json(err + '.')
    }
})

app.use('/api/auth/', authRouter)
app.use('/api/users/', userRouter)
app.use('/api/posts', postRouter)

mongoDB.connect(process.env.MONGODB_URL).then(() => {
    console.log('mongoDB is connceted...!')
}).catch((err) => {
console.log(err + 'fix the error')
})

app.listen('5001', () => {
    console.log('Backend is running...!')
})

