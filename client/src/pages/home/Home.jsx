import "./Home.sass"
import { useEffect, useState } from "react"
import { Header, SinglePost } from "../../components"
import axios from "../../api/axios"

const Home = ({my=false}) => {
    const [blogs, setBlogs] = useState()

    const fetchAll = async() => {
        let url
        if (my) {
            url = `/blog/my/${localStorage.getItem('authToken')}`
        } else {
            url = '/blog/getAll'
        }
        const { data } = await axios.get(url)
        setBlogs(data)
    }

    useEffect(() => {
        fetchAll()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main>
            <Header />
            {my && <h1 className="myPosts">My Posts</h1> }
            <div className="homeBody">
            { blogs && blogs.map((element) => 
                <SinglePost 
                    key={element._id}
                    id={element._id}
                    src="sample.jpg"
                    title={element.title}
                    body={element.summary} 
                /> )
            }
            </div>            
        </main>
    )
}

export default Home
