import axios from 'axios'

const obtenerUsuario = async () => {
    // Se saca el token desde LS
    const token = localStorage.getItem('token');

    // Si no hay token se abandona la ejecucion de este metodo
    if (!token) return;

    try {
        // Se sacan los datos de la respuesta a la peticion
        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`,
            {   
                // Se actian los headers para usar el Bearer token
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        
        // Se da salida a los datos extraidos
        return data
    } catch( error ) { console.log(error) }
}

export {
    obtenerUsuario
}