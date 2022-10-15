import "./Auth.sass"
import { LoginIllustration } from '../assets'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from '../api/axios'

const Login = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.post("/user/login", {userName, password}, config)
            if (data.success === true) {
                alert("Login Successful!")
                localStorage.setItem("authToken", data.token)
                navigate("/")
            }
            
        } catch (error) {
            setError(error.response.data)
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }

    return (
        <section className="auth">
            <div className="auth__illustration">
                <LoginIllustration />
            </div>
            <div className="auth__form__cr">
                <form onSubmit={handleSubmit}>
                    <div className="logo__cr">
                        <span>Blogging Specials</span>
                    </div>
                    <div className="container">
                        { error && <p id="error__cr">{error}</p>}
                        <label htmlFor="login__userName">Username:</label>
                        <input 
                            type="text" 
                            name="login__userName" 
                            id="login__userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required />
                        <label htmlFor="login__password">Password:</label>
                        <input 
                            type="password" 
                            name="login__password" 
                            id="login__password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <Link to='/auth/forgotPassword' className="login__fp">Forgot Password</Link>
                        <input 
                            type="checkbox" 
                            name="remember"
                            id="remember"
                            checked={remember}
                            onChange={() => setRemember(!remember)} />
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
