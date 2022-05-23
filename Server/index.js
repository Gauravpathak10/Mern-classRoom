import express from 'express';
import bodyParser from 'body-parser';
import UserRoute from './Routes/users.route.js'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import Files from './model/FileUpload.js';



const app = express()
app.use(cors());
app.use('/files', express.static('files'))
app.use(bodyParser.json())
app.use('/', UserRoute)
app.use(express.urlencoded({ limit: '50mb', extended: true }))


mongoose.connect('Your_Url')
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
            name: req.file.fieldname,
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
