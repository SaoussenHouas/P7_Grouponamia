import { Link, useNavigate } from "react-router-dom"

export default function Header() {
    let navigate = useNavigate()

    function logOut(){
        localStorage.clear();
        navigate('/login')
    }

    return(
            <div id="mobileNav" className="flex column justify-center align-center text-center">            
                <Link className="addButton" to="/AddPost">Ajouter un post</Link>
                <button onClick={logOut}>Se déconnecter</button>
            </div>
    )
}