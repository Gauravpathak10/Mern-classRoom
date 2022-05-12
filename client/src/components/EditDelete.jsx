import axios from 'axios'
import React, { useState } from 'react'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { SiSuperuser } from 'react-icons/si'
import { useNavigate, useParams } from 'react-router-dom'



export const EditDelete = () => {
    const dataParse = JSON.parse(localStorage.getItem('User-Creditinals'))
    const USerid = dataParse._id
    const navigate = useNavigate()

    const { id } = useParams()


    const [data, setdata] = useState({
        id: USerid,
        firstName: '',
        lastName: '',
        email: '',
        ClassCode: "",
    })


    const SaveRegisterdata = (e) => {
        e.preventDefault()
        if (data.firstName === '' || data.lastName === '' || data.email === '' || data.ClassCode === "") {
            return alert('All fields required')
        }
        axios.post(`http://localhost:5000/api/editStd/`, data)

            .then((res) => {
                localStorage.setItem('User-data', data.firstName)
                alert('Succesfully Updated')
                navigate(`/userProfile/${id}`)

            })
            .catch((err) => {
                console.log(err)
            })


    }

    const handleChangeteacherStudent = (event) => {
        const { name, value } = event.target
        setdata(prevInputStudent => {
            return {
                ...prevInputStudent,
                [name]: value
            }
        })
    }




    return (
        <div>
            <nav className='nav'>
                <h3>Edit All your Credentials</h3>
                <a href={`/userProfile/${id}`} className='link-btn'>Go back</a>
            </nav>
            <div className='form-body-register'>
                <div className='register-head-sub'>
                    <p style={{ fontSize: "15px" }}>@Note : While editing you need to fill up all credentials if you wanna avoid some field , kindly fill up the default data registered for that specific field</p>
                </div>
                <form className='form-register'>
                    <div className='login-input'>
                        <AiOutlineUser className='icon-log' />
                        <input type="text" required name="firstName" value={data.firstName} placeholder='firstname' onChange={handleChangeteacherStudent} />
                    </div >
                    <div className='login-input'>
                        <SiSuperuser className='icon-log' />
                        <input type="text" required name="lastName" value={data.lastName} placeholder='lastname' onChange={handleChangeteacherStudent} />
                    </div>
                    <div className='login-input'>
                        <AiOutlineMail className='icon-log' />
                        <input type="email" required name="email" value={data.email} placeholder='Email' onChange={handleChangeteacherStudent} />
                    </div>
                    <div className='login-input'>
                        <RiLockPasswordFill className='icon-log' />
                        <input type="password" required name="ClassCode" value={data.ClassCode} placeholder='classcode' onChange={handleChangeteacherStudent} />
                    </div>
                    <button type='submit' onClick={SaveRegisterdata}>Update student</button>
                </form>
            </div>
        </div>
    )
}
