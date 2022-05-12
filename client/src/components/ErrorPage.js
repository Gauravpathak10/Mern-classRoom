import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './Styles/All.css'

export const ErrorPage = () => {
    const { id } = useParams()
    return (
        <div className='error-page'>
            <img src={require('../Assets/error.png')} alt="" />
            <Link>Go Back</Link>
        </div>
    )
}
