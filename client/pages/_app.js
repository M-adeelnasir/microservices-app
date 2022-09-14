import Head from "next/head";
import BuildClient from "../api/build-client";

const AppComponent = ({ Component, pageProps }) => {
    return (<>

        <Head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
        </Head>

        <>

            <Component {...pageProps} />
        </>
    </>)
}



AppComponent.getInitialProps = async (context) => {
    // console.log(context.ctx.req);
    const client = await BuildClient(context.ctx)
    const { data } = await client.get('/api/users/currentuser')
    // console.log(data);
    let pageProps;
    if (context.Component.getInitialProps) {
        pageProps = await context.Component.getInitialProps(context.ctx)
    }
    return { data, pageProps }
}

export default AppComponent