import BuildClient from '../api/build-client'


const LandingPage = ({ data }) => {

    return (
        <>
            {JSON.stringify(data)}
        </>
    )
}


LandingPage.getInitialProps = async (context) => {
    const client = await BuildClient(context)
    const { data } = await client.get('/api/users/currentuser')
    return { data }
}

export default LandingPage