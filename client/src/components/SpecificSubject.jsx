import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SubjectNotes } from './SubjectNotes'




export const SpecificSubject = () => {
    const { id } = useParams()
    const [Subjectlistdata, setsubjectlist] = useState([])
    useEffect(() => {

        axios.get(`http://localhost:5000/api/findidofsubject/${id}`)
            .then((res) => {
                setsubjectlist(res.data.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [id])



    return (
        <>
            <div className='nav'>

                <p> SubjectName: {Subjectlistdata.SubjectName}</p>
                <p>  TeachearName: {Subjectlistdata.TeachearName}</p>
                <p>  Description: {Subjectlistdata.Description}</p>

            </div>
            <SubjectNotes />
        </>

    )
}
