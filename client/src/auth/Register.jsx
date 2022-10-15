import "./Auth.sass"
import { RegisterIllustration } from '../assets'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from '../api/axios'

const Register = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        if (password !== confPassword) {
            setError("Passwords don't match")
            setTimeout(() => {
                setError("")
            }, 5000)
            return
        }
        try {
            const { data } = await axios.post("/user/register", 
                    {userName, name, email, password}, config)
            if (data === 'User created') {
                alert("Registration successful!")
                navigate("/auth/login")
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
                <RegisterIllustration />
            </div>
            <div className="auth__form__cr">
                <form onSubmit={handleSubmit}>
                    <div className="logo__cr">
                        <span>Blogging Specials</span>
                    </div>
                    <div className="container">
                        { error && <p id="error__cr">{error}</p>}
                        <label htmlFor="register__userName">Username</label>
                        <input 
                            type="text" 
                            name="register__userName" 
                            id="register__userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required />
                        <label htmlFor="register__name">Name:</label>
                        <input 
                            type="text" 
                            name="register__name" 
                            id="register__name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />
                        <label htmlFor="register__email">Email Address:</label>
                        <input 
                            type="email" 
                            name="register__email" 
                            id="register__email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <label htmlFor="register__password">Password:</label>
                        <input 
                            type="password" 
                            name="register__password" 
                            id="register__password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <label htmlFor="register__cf__password">Confirm Password:</label>
                        <input 
                            type="password" 
                            name="register__cf__password" 
                            id="register__cf__password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
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
