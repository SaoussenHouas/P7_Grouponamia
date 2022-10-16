import mobileLogo from '../assets/mobile-logo.svg'
import { Link } from "react-router-dom"

export default function Header() {

    return(
        <div id="headerMobile" className="header flex align-center justify-center">
            <Link to="/homepage">
                <img src={mobileLogo} alt="" className="logo" />
            </Link>
        </div>
    )
}