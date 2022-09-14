import axios from 'axios'
const LandingPage = () => {

    return (
        <h1>Yes</h1>
    )
}


LandingPage.getInitialProps = async ({ req }) => {
    if (typeof window === 'undefined') {
        //we are on server side
        console.log("i am runing on server side");
        const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
            headers: req.headers
        })
        console.log(data);
        return { data }
    }
    else {
        //we are in browser
        const { data } = await axios.get('https://auth.dev/api/users/currentuser')
        console.log(data);
        return { data }

    }
    return {}
}

export default LandingPage