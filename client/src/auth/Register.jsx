import "./Auth.sass"
import { RegisterIllustration } from '../assets'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <section className="auth">
            <div className="auth__illustration">
                <RegisterIllustration />
            </div>
            <div className="auth__form__cr">
                <form>
                    <div className="logo__cr">
                        <span>Blogging Specials</span>
                    </div>
                    <div className="container">
                        <label htmlFor="register__userName">Username</label>
                        <input 
                            type="text" 
                            name="register__userName" 
                            id="register__userName"
                            required />
                        <label htmlFor="register__name">Name:</label>
                        <input 
                            type="text" 
                            name="register__name" 
                            id="register__name"
                            required />
                        <label htmlFor="register__email">Email Address:</label>
                        <input 
                            type="email" 
                            name="register__email" 
                            id="register__email"
                            required />
                        <label htmlFor="register__password">Password:</label>
                        <input 
                            type="password" 
                            name="register__password" 
                            id="register__password"
                            required />
                        <label htmlFor="register__cf__password">Confirm Password:</label>
                        <input 
                            type="password" 
                            name="register__cf__password" 
                            id="register__cf__password"
                            required />
                        <input type="submit" value="Register" />
                        <p>Already a user? <Link to='/auth/login'>Login</Link></p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register
