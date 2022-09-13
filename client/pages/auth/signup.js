import React, { useState, useEffect } from 'react'


const signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    return (
        <>
            <div className="container w-100">
                <h1>signup</h1>
                <form >
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </>
    )
}

export default signup