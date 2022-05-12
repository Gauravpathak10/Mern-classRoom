import StudentData from "../model/StudentData.js"
import jwt from 'jsonwebtoken'
import TeacherData from "../model/TeacherUser.js"

export const createUserStudent = async (req, res) => {
    const dataDuplicate = await StudentData.findOne({ email: req.body.email })
    if (dataDuplicate) {
        return res.status(422).json({
            message: "already exists",
            status: false
        })
    }
    let userData = { email: req.body.email, ClassCode: req.body.ClassCode, firstName: req.body.firstName, lastName: req.body.lastName, }
    const addUserAfterCheck = await StudentData.create(userData)
    res.status(200).json({
        data: addUserAfterCheck,
        status: true,
        message: "Sucessfully created"
    })
}

export const findProfiledataStudent = (req, res) => {
    StudentData.find({ AddedTeacherId: req.params.id }, function (err, data) {
        if (err) {
            res.status(422).json({
                status: false,
                message: "not found"
            })
        }
        else {
            res.status(200).json({
                message: "data found",
                status: true,
                data: data
            });
        }
    })
}

//find by id of student
export const findbyidofStudent = async (req, res) => {
    try {
        const result = await StudentData.findById(req.params.id)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        res.status(422).json({
            error: 'not done '
        })
    }
}

//Login
export const LoginUserStudent = async (req, res) => {
    // console.log('Hello')
    const { email, ClassCode } = req.body;
    // console.log(email, password)

    if (!email) {
        res.status(422).json({
            status: false,
            message: "Email Required"
        })
    }
    if (!ClassCode) {
        res.status(422).json({
            status: false,
            message: "ClassCode Required"
        })
    }

    let users = await StudentData.findOne({
        email: email,
        ClassCode: ClassCode
    });
    if (users && users._id) {
        let Token = jwt.sign({ id: users._id }, 'keyforNodereactProject')
        res.status(200).json({
            message: "Logged in Successfully",
            status: true,
            Token: Token,
            data: users
        })
    }
    if (!users) {
        res.status(422).json({
            message: "Invalid Credentials",
            status: false,
        });

    }
}
//Relational data pass
export const MergeidStudnenttoTeacher = async (req, res) => {
    try {
        let TeacherId = await TeacherData.findById(req.params.id)
        console.log(TeacherId)
        let StdData = { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, ClassCode: req.body.ClassCode, AddedTeacherId: TeacherId._id, }
        let newStudentData = await StudentData.create(StdData)
        console.log(newStudentData)
        return res.status(200).json({
            message: "Successfully merged student",
            data: newStudentData,
            status: true
        });
    }
    catch (error) {
        return res.status(422).json({
            message: "not merged ",
            status: false
        });
    }

}
//edit Profile student
// UpdateStudentProfile
export const UpdateStudentProfile = (req, res) => {
    const option = { new: true }
    StudentData.findByIdAndUpdate(req.body.id, req.body, option, function (err, data) {
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
//delete student 
export const DeleteStudentdata = (req, res) => {
    StudentData.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(422).json({
                message: "data deleted for student",
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

