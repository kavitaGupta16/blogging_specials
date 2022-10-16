import "./updatePost.sass"
import { Header } from "../../components"
import { useState, useEffect } from "react"
import axios from '../../api/axios'
import { useNavigate, useParams } from "react-router-dom"


const CreatePost = ({update=false}) => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const postId = useParams('postId').id

    const getDetails = async() => {
        const { data } = await axios.get(`/blog/getBlog/${postId}`)
        setTitle(data.title)
        setSummary(data.summary)
        setContent(data.body)
    }

    useEffect(() => {
        getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.patch(`/blog/update/${localStorage.getItem('authToken')}/${postId}`, {title, summary, content}, config)
            if (data === 'Blog updated') {
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
                    <input type="submit" name="" id="" value="Update blog" />
                </form>
            </div>   
        </main>
    )
}

export default CreatePost
