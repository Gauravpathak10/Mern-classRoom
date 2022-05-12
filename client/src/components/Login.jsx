import axios from 'axios';
import React, { useState } from 'react'
import './Styles/All.css'
import { AiOutlineUser } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Link } from 'react-router-dom';

export const Login = () => {
    const [toggleState, setToggleState] = useState(2);


    const [Studentdata, setStudentdata] = useState({
        email: "",
        ClassCode: ''
    })
    const [data, setdata] = useState({
        email: '',
        password: "",
    })


    //teacher login
    const VerifyBtnTeacher = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/login', data)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('Token', res.data.Token);
                    var Role = res.data.data.Role;
                    localStorage.setItem('Role', Role)
                    var data = JSON.stringify(res.data.data);
                    localStorage.setItem('User-Creditinals', data);
                    localStorage.setItem('User-data', res.data.data.firstName)
                    window.location.href = `/home/${res.data.data._id}`
                }
                else {
                    window.location.href = `/login`
                }
            })

            .catch((err) => {
                alert(err.response.data.message)
            })
    }



    //student login
    const VerifybtnStudent = (c) => {
        c.preventDefault()
        axios.post('http://localhost:5000/api/studentlogin', Studentdata)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('Token', res.data.Token);
                    var data = JSON.stringify(res.data.data);
                    var Role = res.data.data.Role;
                    localStorage.setItem('Role', Role)
                    localStorage.setItem('User-Creditinals', data);
                    localStorage.setItem('User-data', res.data.data.firstName)
                    window.location.href = `/home/${res.data.data.AddedTeacherId}`
                }
                else {
                    window.location.href = `/login`
                }
            })

            .catch((err) => {
                alert(err.response.data.message)
            })
    }






    //Toggle Button
    const toggleTab = (index) => {
        setToggleState(index);
    };
    //Save Teacher
    function handleChange(event) {
        const { name, value } = event.target
        setdata(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    //Student
    function handleChangeStudent(event) {
        const { name, value } = event.target
        setStudentdata(prevInputStudent => {
            return {
                ...prevInputStudent,
                [name]: value
            }
        })
    }
    return (
        <div>
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Student
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    Teacher
                </button>
            </div>
            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content  active-content" : "content"}
                >
                    <p style={{ textAlign: "center", margin: 'unset', color: 'black' }}>Join Class</p>
                    <hr />
                    <div className='form-container-login'>
                        <form style={{ textAlign: "center" }}>
                            <img src={require('../Assets/profile.png')} alt="profile" />
                            <div className='login-input'>
                                <AiOutlineUser className='icon-log' />
                                <input name='email' placeholder='email' value={Studentdata.email} onChange={handleChangeStudent} />
                            </div>
                            <div className='login-input'>
                                <RiLockPasswordFill className='icon-log' />
                                <input name='ClassCode' type='password' placeholder='ClassCode' value={Studentdata.ClassCode} onChange={handleChangeStudent} />
                            </div>
                            <button onClick={VerifybtnStudent}>Login</button>
                        </form>
                    </div>
                </div>

                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                >
                    <p style={{ textAlign: "center", margin: 'unset', color: 'black' }}>Log into existing class</p>
                    <hr />
                    <div className='form-container-login'>
                        <form style={{ textAlign: "center" }}
                        >
                            <img src={require('../Assets/profile.png')} alt="profile" />
                            <div className='login-input'>
                                <AiOutlineUser className='icon-log' />
                                <input name='email' placeholder='email' value={data.email} onChange={handleChange} />
                            </div>
                            <div className='login-input'>
                                <RiLockPasswordFill className='icon-log' />
                                <input name='password' type='password' placeholder='password' value={data.password} onChange={handleChange} />
                            </div>
                            <button className='link-btn' onClick={VerifyBtnTeacher}>Login</button>
                            <Link to={`/`} className='link-btn'>register</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
