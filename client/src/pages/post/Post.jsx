import "./Post.sass"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import axios from "../../api/axios"
import { Header } from "../../components"
import { DeleteIcon, EditIcon } from "../../assets"

const Post = () => {
    const postId = useParams('postId').postId
    const [data, setData] = useState() 
    const [comment, setComment] = useState('')
    const [owner, setOwner] = useState(false)
    const navigate = useNavigate()

    const getDetails = async() => {
        const { data } = await axios.get(`/blog/getBlog/${postId}`)
        setOwner(data.owner === localStorage.getItem('authToken'))
        setData(data)
    }

    const deletePost = async() => {
        // eslint-disable-next-line no-restricted-globals
        const consent = confirm("Are you sure, you want to delete this post!")
        if (consent) {
            const { data } = await axios.delete(`/blog/delete/${postId}`)
            if (data === 'Deleted') {
                navigate('/')
            }
        }
    }
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }

    const addComment = async(e) => {
        e.preventDefault()
        const { data } = await axios.post(`/blog/addComment/${localStorage.getItem('authToken')}/${postId}`, {comment}, config)
        console.log(data)
        if (data === 'Added comment') {
            alert(data)
            setComment('')
        }
    }
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigate('/auth/login')
        }
        getDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        data &&
        <main className="viewPost">
            <Header />
            <div className="postBody">
                <div className="left__cr">
                    <div className="title__cr">
                        <h1>{data.title}</h1>    
                        {owner &&
                            <div className="right">
                                <EditIcon onClick={() => navigate(`/user/updatePost/${postId}`)} />
                                <DeleteIcon onClick={() => deletePost()}/>
                            </div>
                        }
                    </div>
                    <h3>{data.summary}</h3>
                    <div className="content">
                        {data.body}
                    </div>
                </div>
                <div className="right__cr">
                    <h2>Comments</h2>
                    <form onSubmit={addComment}>
                        <input 
                            type="text"
                            placeholder="Add Comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <input type="submit" value="Comment"/>
                    </form>
                    {data.comments.length === 0 &&
                        <div className="nothing">
                            <p>No comments</p>
                        </div>
                    }
                    <div className="comments">
                        {data && data.comments.map(comment => {
                            return (
                                <div className="comments__cr" key={comment.by}>
                                    <h3>{comment.by}</h3>
                                    <p>{comment.comment}</p>
                                    <h3>{comment.by}</h3>
                                    <p>{comment.comment}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </main>
    )

}

export default Post