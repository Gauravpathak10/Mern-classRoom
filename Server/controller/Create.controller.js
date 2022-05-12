import TeacherData from "../model/TeacherUser.js"
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {
    const dataDuplicate = await TeacherData.findOne({ email: req.body.email })
    if (dataDuplicate) {
        return res.status(422).json({
            message: "already exists",
            status: false
        })
    }
    const addUserAfterCheck = await TeacherData.create(req.body)
    res.status(200).json({
        data: addUserAfterCheck,
        status: true,
        message: "Sucessfully created"
    })
}

//login 

export const LoginUser = async (req, res) => {
    // console.log('Hello')
    const { email, password } = req.body;
    // console.log(email, password)

    if (!email) {
        res.status(422).json({
            status: false,
            message: "Email Required"
        })
    }
    if (!password) {
        res.status(422).json({
            status: false,
            message: "Password Required"
        })
    }

    let users = await TeacherData.findOne({
        email: email,
        password: password
    });
    if (users && users._id) {
        let Token = jwt.sign({ id: users._id }, 'keyforNodereactProject')
        return res.status(200).json({
            message: "Logged in Successfully",
            status: true,
            Token: Token,
            data: users
        })
    }
    if (!users) {
        return res.status(422).json({
            message: "Invalid Credentials",
            status: false,
        });

    }
}
//find
export const findAllTeachers = (req, res) => {
    TeacherData.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            res.status(422).json({
                message: "UnSucessfully",
                status: false
            })
        }
        else {
            res.status(200).json({
                message: "SuccessFully created",
                status: true,
                data: data
            })
        }
    })
}
//edit Profile
export const UpdateTeacherProfiledata = (req, res) => {
    const option = { new: true }
    TeacherData.findByIdAndUpdate(req.body.id, req.body, option, function (err, data) {
        if (err) {
            return res.status(500).json({
                message: "failed updating",
                status: false
            })
        }
        else {
            return res.status(200).json({
                message: "success",
                status: true,
                data: option
            })
        }

    })
}
//delete teacher 
export const DeleteTacherdata = (req, res) => {
    TeacherData.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(422).json({
                message: "data deleted for teacher",
                status: false
            })
        }
        res.status(200).json({
            message: "deleting data failed ",
            status: true,
            data: data
        })
    })
}

