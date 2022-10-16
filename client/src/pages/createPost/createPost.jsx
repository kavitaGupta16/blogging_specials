import "./createPost.sass"
import { Header } from "../../components"
import { useState } from "react"
import axios from '../../api/axios'
import { useNavigate } from "react-router-dom"


const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.post(`/blog/create/${localStorage.getItem('authToken')}`, {title, summary, content}, config)
            if (data === 'Blog created') {
                alert(data)
                navigate('/')
            }
            
        } catch (error) {
            setError(error.response.data)
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }
    return (
        <main className="postMain">
            <Header />
            <div className="postBody">
                <h1>Create new post</h1>
                <form onSubmit={handleSubmit}>
                    { error && <p id="error__cr">{error}</p>}
                    <input 
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <input
                        type="text"
                        placeholder="Enter Summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)} />
                    <textarea 
                        placeholder="Write..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}>
                    </textarea>
                    <input type="submit" name="" id="" value="Create blog" />
                </form>
            </div>   
        </main>
    )
}

export default CreatePost
