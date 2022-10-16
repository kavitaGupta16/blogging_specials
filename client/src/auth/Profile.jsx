import "./Auth.sass"
import { ProfileIllustration } from '../assets'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from '../api/axios'

const Profile = () => {
    const navigate = useNavigate()
    const [update, setUpdate] = useState(false)
    const [userName, setUserName] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [error, setError] = useState('')

    const getDetails = async() => {
        try {
            const { data } = await axios.get(`/user/getUserDetails/${localStorage.getItem('authToken')}`)        
            setUserName(data.userName)
            setName(data.name)
            setEmail(data.email)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const killUser = async(e) => {
        e.preventDefault()
        // eslint-disable-next-line no-restricted-globals
        const consent = confirm("Are you sure you want to delete your account!\nAll your post will also be deleted")
        if (consent) {
            const { data } = await axios.delete(`/user/delete/${localStorage.getItem('authToken')}`)
            if (data === 'Deleted') {
                localStorage.removeItem('authToken')
                navigate('/auth/register')
            }
        }

    }

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
            const { data } = await axios.patch(`/user/update/${localStorage.getItem('authToken')}`, 
                    {userName, name, email, password}, config)
            if (data === 'Updated') {
                alert("Updated successfully!")
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
                <ProfileIllustration />
            </div>
            <div className="auth__form__cr">
                <form onSubmit={handleSubmit}>
                    <div className="logo__cr">
                        <Link to='/' id="logo">Blogging Specials</Link>
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
                            disabled
                            required />
                        <label htmlFor="register__name">Name:</label>
                        <input 
                            type="text" 
                            name="register__name" 
                            id="register__name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={!update} />
                        <label htmlFor="register__email">Email Address:</label>
                        <input 
                            type="email" 
                            name="register__email" 
                            id="register__email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={!update} />
                        <label htmlFor="register__password">New Password:</label>
                        <input 
                            type="password" 
                            name="register__password" 
                            id="register__password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={password.length > 1}
                            disabled={!update} />
                        <label htmlFor="register__cf__password">Confirm Password:</label>
                        <input 
                            type="password" 
                            name="register__cf__password" 
                            id="register__cf__password"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            required={password.length > 1}
                            disabled={!update} />
                        { update
                            ? <input type="submit" value="Save" />
                            : <button onClick={() => setUpdate(!update)}>Update</button>
                        }
                        <button id="deleteBtn" onClick={killUser}>Delete Account</button>
                        <p>Go back to <Link to='/'>Home</Link></p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Profile
