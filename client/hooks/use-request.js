import axios from 'axios'
import { useState } from 'react'


export default ({ method, url, body }) => {
    const [errors, setErrors] = useState(null)
    const doRequest = async () => {
        try {
            const res = await axios[method](url, body)
            return res.data
        } catch (err) {
            setErrors(<div className="alert alert-danger">
                <ul className="my-0">
                    {err.response.data.errors.map((err, index) => (
                        <li key={index}>{err.message}</li>
                    ))}
                </ul>
            </div>)
        }
    }

    return { doRequest, errors }
}