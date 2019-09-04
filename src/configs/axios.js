import axios from 'axios'
import config from './config'


const instance = axios.create({})

instance.defaults.baseURL = config.apiURL

instance.interceptors.request.use(config => {

    let token = localStorage.getItem('access_token')
    console.log('Interceptando requisição: ', config)
    console.log('token: ', token)

    // config.data = {
    //     ...config.data,
    //     curso: 'Vue JS'
    // }

    // config.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`
    config.headers.common['Authorization'] = `Bearer ${token}`
    // config.headers.put['Meu-Cabecalho'] = `Curso VueJS`

    return config
}, error => {
    console.log("Erro ao fazer requisição: ", error)
    return Promise.reject(error)
})

// instance.interceptors.response.use(response => {
//     console.log("Interceptando resposta...", response)
//     if (Array.isArray(response.data)) {
//         response.data = response.data.slice(1,3)
//     }
//     return response
// }, error => {
//     console.log('Erro capturado no interceptador de respostas: ', error)
//     return Promise.reject(error)
// })

export default instance

// axios.defaults.baseURL = config.apiURL

// export default axios