import "./Home.sass"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <main>
            <header>
                <div className="header__logo__cr">
                    <span>Blogging Specials</span>
                </div>
                <div className="header__central__cr">
                    {/* <input type="text" name="search__bar" /> */}
                </div>
                <div className="header__right__cr">
                    <Link to='/auth/login'>Login</Link>
                    <Link to='/auth/register'>Register</Link>
                </div>
            </header>
        </main>
    )
}

export default Home
