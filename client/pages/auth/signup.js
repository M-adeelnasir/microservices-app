import React, { useState, useEffect } from 'react'
import axios from 'axios'

const signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await axios.post('https://auth.dev/api/users/signup', { email, password })
            console.log(res);

        } catch (err) {
            // console.log(err.response.data.errors);
            setErrors(err.response.data.errors)
        }
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
                    {errors.length > 0 && <div className="alert alert-danger">
                        <ul className="my-0">
                            {errors.map((err, index) => (
                                <li key={index}>{err.message}</li>
                            ))}
                        </ul>
                    </div>}
                    <button className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </>
    )
}

export default signup