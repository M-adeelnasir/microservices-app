import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useRequest from '../../hooks/use-request'

const signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { doRequest, errors } = useRequest({ method: 'post', url: 'https://auth.dev/api/users/signup', body: { email, password } })

    const handleSubmit = async (e) => {
        e.preventDefault()
        doRequest()
    }

    return (
        <>
            <div className="container w-100">
                <h1>signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {errors}
                    <button className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </>
    )
}

export default signup