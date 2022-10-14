import "./Auth.sass"
import { LoginIllustration } from '../assets'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <section className="auth">
            <div className="auth__illustration">
                <LoginIllustration />
            </div>
            <div className="auth__form__cr">
                <form>
                    <div className="logo__cr">
                        <span>Blogging Specials</span>
                    </div>
                    <div className="container">
                        <label htmlFor="login__email">Email Address:</label>
                        <input 
                            type="email" 
                            name="login__email" 
                            id="login__email"
                            required />
                        <label htmlFor="login__password">Password:</label>
                        <input 
                            type="password" 
                            name="login__password" 
                            id="login__password"
                            required />
                        <Link to='/auth/forgotPassword' className="login__fp">Forgot Password</Link>
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                        <input type="submit" value="Login" />
                        <p>New here? <Link to='/auth/register'>Register</Link></p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login
