import axios from 'axios'
import React, { useState } from 'react'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { SiSuperuser } from 'react-icons/si'
import { useNavigate, useParams } from 'react-router-dom'

export const EditTeacher = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [dataTeacher, setdataTeacher] = useState({
        id: id,
        firstName: '',
        lastName: '',
        email: '',
        password: "",
    })


    //teacher
    const handleChangeteacherteacher = (event) => {
        const { name, value } = event.target
        setdataTeacher(prevInputStudent => {
            return {
                ...prevInputStudent,
                [name]: value
            }
        })
    }

    const SaveRegisterdatateacher = (e) => {
        e.preventDefault()
        if (dataTeacher.firstName === '' || dataTeacher.lastName === '' || dataTeacher.email === '' || dataTeacher.password === "") {
            return alert('All fields required')
        }
        axios.post(`http://localhost:5000/api/editTeacher/`, dataTeacher)

            .then((res) => {
                localStorage.setItem('User-data', dataTeacher.firstName)
                alert('Succesfully Updated')
                navigate(`/teacherProfile/${id}`)

            })
            .catch((err) => {
                console.log(err)
            })

    }
    return (
        <div>
            <nav className='nav'>
                <h3>Edit All your Credentials</h3>
                <a href={`/teacherProfile/${id}`} className='link-btn'>Go back</a>
            </nav>

            <div className='form-body-register'>
                <div className='register-head-sub'>
                    <p style={{ fontSize: "15px" }}>@Note : While editing you need to fill up all credentials if you wanna avoid some field  , kindly fill up the default data registered for that specific field</p>
                </div>
                <form className='form-register'>
                    <div className='login-input'>
                        <AiOutlineUser className='icon-log' />
                        <input type="text" required name="firstName" value={dataTeacher.firstName} placeholder='firstname' onChange={handleChangeteacherteacher} />
                    </div >
                    <div className='login-input'>
                        <SiSuperuser className='icon-log' />
                        <input type="text" required name="lastName" value={dataTeacher.lastName} placeholder='lastname' onChange={handleChangeteacherteacher} />
                    </div>
                    <div className='login-input'>
                        <AiOutlineMail className='icon-log' />
                        <input type="email" required name="email" value={dataTeacher.email} placeholder='Email' onChange={handleChangeteacherteacher} />
                    </div>
                    <div className='login-input'>
                        <RiLockPasswordFill className='icon-log' />
                        <input type="password" required name="password" value={dataTeacher.password} placeholder='passkey' onChange={handleChangeteacherteacher} />
                    </div>
                    <button type='submit' title='update' onClick={SaveRegisterdatateacher}>Update teacher</button>
                </form>
            </div>
        </div>
    )
}
