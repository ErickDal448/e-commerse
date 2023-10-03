import axios from "axios"

export const api = axios.create({
    baseURL: "https://my-json-server.typicode.com/ErickDal448/Json-db/db"
})

export const buscar = async (url, setData = null) => {
    const respuesta = await api.get(url)
    if (setData) {
        setData(respuesta.data)
    } else {
        return respuesta.data;
    }
}

// Set-ExecutionPolicy Bypass -Scope Process -Force
// json-server --watch db.json --port=5000