import data from './data.json';

export const buscar = (url, setData = null) => {
    // Elimina la barra inicial y divide la URL en sus partes
    const parts = url.substring(1).split('/');
    let info;

    // Busca los datos en db
    if (parts.length === 1) {
        // Si solo hay una parte, devuelve todos los datos de esa categoría
        info = data[parts[0]];
    } else if (parts.length === 2) {
        // Si hay dos partes, busca el elemento con el id especificado
        info = data[parts[0]].find(item => item.id === parseInt(parts[1]));
    }

    if (setData) {
        setData(info);
    } else {
        return info;
    }
}
