import axios from 'axios'

export default async ({ req }) => {
    if (typeof window === 'undefined') {
        const { data } = await axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
        return data
    }
}