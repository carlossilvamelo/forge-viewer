import axios from "axios"

const OBJECT_URL = "https://developer.api.autodesk.com/oss/v2/buckets/rqodjejxqjw7ryc4lzy4offvc0apa4jl_tutorial_bucket"

const AUTH_URL = "https://developer.api.autodesk.com/authentication/v1/authenticate"
const TOKEN_KEY = "auth-token-key"
const CREDENTIALS = {
    client_id: "RqOdjEJxQjw7rYC4lzY4oFfvc0Apa4Jl",
    client_secret: "UO3oOV1SrxI9VpAR",
    grant_type: "client_credentials",
    scope: "data:read data:write data:create bucket:create bucket:read"
}


export const authenticateUser = async () => {

    const params = new URLSearchParams()
    params.append("client_id", CREDENTIALS.client_id)
    params.append("client_secret", CREDENTIALS.client_secret)
    params.append("grant_type", CREDENTIALS.grant_type)
    params.append("scope", CREDENTIALS.scope)

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    await axios.post(AUTH_URL, params, config)
        .then(function (response) {
            console.log(response)
            localStorage.setItem(TOKEN_KEY, response.data.access_token)
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const isAuthenticated = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    return token ? true : false
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const uploadFile = async (file) => {
    
    const fileLength = file[0].size
    const fileName = file[0].name
    const url = `${OBJECT_URL}/objects/${fileName}`
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": getToken(),
            "Content-Length": fileLength
        }
    }
    await axios.put(url, file, config)
        .then(function (response) {
            console.log(response)
            localStorage.setItem(TOKEN_KEY, response.data.access_token)
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

}