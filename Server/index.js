import express from 'express';
import bodyParser from 'body-parser';
import UserRoute from './Routes/users.route.js'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import Files from './model/FileUpload.js';



const app = express()
app.use(cors());
app.use(cookieParser())
app.use('/files', express.static('files'))
app.use(bodyParser.json())
app.use('/', UserRoute)
app.use(express.urlencoded({ limit: '50mb', extended: true }))


<<<<<<< HEAD
// default url = mongodb+srv://gaurav:gaurav@cluster0.1twlr.mongodb.net/myClassroom?retryWrites=true&w=majority

mongoose.connect('mongodb://localhost:27017/MernClassroom')
=======
mongoose.connect('Your_Url')
>>>>>>> 982b05b90a8e129c8909abe7c88cdb13a2cd3107
    .then(() => {
        console.log('connected')
    })
    .catch((err) => {
        console.log(err)
    })


const filestorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './files')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

const upload = multer({ storage: filestorage })
app.post('/single/:id', upload.single('files'), (req, res) => {
    // const url = `${req.protocol}://${req.get('host')}`;
    // console.log(url)
    try {
        const newNote = new Files({
            title: req.body.title,
            name: req.file.path,
            path: req.file.destination,
            subjectid: req.params.id,
            path: 'http://localhost:5000/' + req.file.path,
            announcements:req.body.announcements

        })
        newNote.save()
        res.send('single file uploaded' + newNote)
    } catch (error) {
        res.send(error)

    }


})


app.listen(5000, function () {
    console.log('Example app listening on port 5000 !');
});
