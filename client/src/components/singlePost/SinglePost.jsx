import "./SinglePost.sass"
import { useNavigate } from "react-router-dom"

const SinglePost = ({ id, src, title, body }) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/post/${id}`)   
    }

    return (
        <div className="card" onClick={() => handleNavigate()}>
            <div className="banner">
                <img src={require(`../../assets/${src}`)} alt="asd" />
            </div>
            <div className="body">
            <h2 className="title">{ title }</h2>
                <div className="content">
                    <p>
                        { body }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SinglePost
