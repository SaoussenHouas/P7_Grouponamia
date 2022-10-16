// Register
export function createUser(user) {
    const url = 'http://localhost:3000/api/auth/signup' 
    return fetch(
            url, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(user)
            })
            .then((response) => response.json())
            .catch((error) => console.error(error))
}

//Login
export function loginUser(user){
    const url = 'http://localhost:3000/api/auth/login' 
    return fetch(
            url, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(user)
            })
            .then((response) => response.json())
            .catch((error) => console.error(error))
}
