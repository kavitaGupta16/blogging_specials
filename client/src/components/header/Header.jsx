import "./Header.sass"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Header = () => {
    const [loggedIn, setLoggedIn] = useState()
    useEffect(() => {
        localStorage.getItem('authToken') ? setLoggedIn(true) : setLoggedIn(false)        
    }, [])

    return (
        <header>
            <div className="header__logo__cr">
                <Link to='/' id="logo">Blogging Specials</Link>
            </div>
                { !loggedIn && 
                    <div className="header__right__cr">
                        <Link to='/auth/login' className="links">Login</Link>
                        <Link to='/auth/register' className="links">Register</Link>
                    </div>
                }
                { loggedIn && 
                    <div className="header__right__cr w30">
                        <Link to='/user/createPost' className="links">Create new post</Link>
                        <Link to= '/user/myBlogs' className="links">My Posts</Link>
                        <Link to='/user/profile' className="links">Profile</Link>
                        <Link to='/auth/logout' className="links">Log out</Link>
                    </div>
                }
        </header>
    )
}

export default Header
