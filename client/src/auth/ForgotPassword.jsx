import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "../api/axios"
import { ForgotPasswordIllustration } from "../assets"

const ForgotPassword = ({ reset= false}) => {
    return (
        <section className="auth">
            <div className="auth__illustration">
                <ForgotPasswordIllustration />
            </div>
            <div className="auth__form__cr">
                { reset ? <ResetPasswordForm /> : <ForgotPasswordForm /> }
            </div>
        </section>
    )
}

const ForgotPasswordForm = () => {
    const [error, setError] = useState('')
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`/user/forgotPassword/${userName}`)
            if (data === 'Found') {
                navigate(`/auth/resetPassword/${userName}`)
            }
        } catch (err) {
            console.log(err)
            if (err.response.status === 401) {
                setError(err.response.data)
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 5000)
    }, [error])
    

    return (       
        <form onSubmit={handleSubmit}>
            <div className="logo__cr">
                <Link to='/' id="logo">Blogging Specials</Link>
            </div>
            <div className="container">
                { error && <p id="error__cr">{error}</p>}
                <p className="info">Don't worry! It happens. Please enter the username associated with your account</p>
                <label htmlFor="forgot__userName">Username:</label>
                <input 
                    type="text" 
                    name="forgot__userName" 
                    id="forgot__userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required />
                <input type="submit" value="Forgot Password" />
                <p>Go back to <Link to='/auth/login'>Login</Link></p>
            </div>
        </form>
    )
}

const ResetPasswordForm = () => {
    const userName = useParams().token
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (password === confPassword) {
            const config = {
                header: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post(`/user/resetPassword/${userName}`, { password }, config)
            if (data === 'Updated') {
                alert("Password updated")
                navigate('/auth/login')
            }
        } else {
            setError("Passwords don't match")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 5000)
    }, [error])
    
    return (
        <form onSubmit={handleSubmit}>
        <div className="logo__cr">
            <Link to='/' id="logo">Blogging Specials</Link>
        </div>
        <div className="container">
            { error && <p id="error__cr">{error}</p>}
            <label htmlFor="forgot__password">Password:</label>
                        <input 
                            type="password" 
                            name="forgot__password" 
                            id="forgot__password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <label htmlFor="forgot__cf__password">Confirm Password:</label>
                        <input 
                            type="password" 
                            name="forgot__cf__password" 
                            id="forgot__cf__password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            required />
            <input type="submit" value="Reset Password" />
        </div>
    </form>
    )
}

export default ForgotPassword