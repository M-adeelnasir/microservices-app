import { useEffect } from 'react'
import useRequest from '../../hooks/use-request'

const Signout = () => {
    const { doRequest } = useRequest({ method: 'delete', url: 'https://auth.dev/api/users/signout', onSuccess: () => Router.push('/') })

    useEffect(() => {
        doRequest()
    }, [])

    return (
        <div>Siging out...</div>
    )
}

export default Signout