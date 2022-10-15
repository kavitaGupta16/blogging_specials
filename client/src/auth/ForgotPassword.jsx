import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(userName)
    }

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 5000)
    }, [error])
    

    return (       
        <form onSubmit={handleSubmit}>
            <div className="logo__cr">
                <span>Blogging Specials</span>
            </div>
            <div className="container">
                { error && <p id="error__cr">{error}</p>}
                <p className="info">Don't worry! It happens. Please enter the username associated with your account</p>
                <label htmlFor="register__userName">Username:</label>
                <input 
                    type="text" 
                    name="register__userName" 
                    id="register__userName"
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
    const param = useParams()
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // setError(userName)
    }

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 5000)
    }, [error])

    useEffect(() => {
        console.log(param)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <form onSubmit={handleSubmit}>
        <div className="logo__cr">
            <span>Blogging Specials</span>
        </div>
        <div className="container">
            { error && <p id="error__cr">{error}</p>}
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
            <input type="submit" value="Reset Password" />
        </div>
    </form>
    )
}

export default ForgotPassword