import axios from 'axios'
import { useState } from 'react'
import Router from 'next/router'


export default ({ method, url, body, onSuccess }) => {
    const [errors, setErrors] = useState(null)
    const doRequest = async () => {
        try {
            setErrors(null)
            const res = await axios[method](url, body)
            if (res && onSuccess) {
                Router.push('/')
            }
            return res.data
        } catch (err) {
            setErrors(<div className="alert alert-danger">
                <ul className="my-0">
                    {err.response && err.response.data.errors.map((err, index) => (
                        <li key={index}>{err.message}</li>
                    ))}
                </ul>
            </div>)
        }
        // throw err
    }

    return { doRequest, errors }
}