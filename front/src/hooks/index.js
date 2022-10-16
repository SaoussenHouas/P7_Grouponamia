import {useState, useEffect} from 'react'

// Get the user token from the local storage
const token = JSON.parse(localStorage.getItem('session'))

// Function useIsAdmin check if the user is an admin
export function useIsAdmin(id) {
    const [isAdmin, setIsAdmin] = useState(false)
    const url = `http://localhost:3000/api/auth/${id}`
  
    useEffect(() => {
      if (!url) return
      async function fetchData() {
        try {
          const response = await fetch(url, {method: 'GET', headers: {'Authorization': token.token}})
          const data = await response.json()
          if(data.isAdmin){
            setIsAdmin(true)
          }
        } catch (err) {
          console.log(err)
        } 
      }
      fetchData()
    }, [url])
    return { isAdmin }
}