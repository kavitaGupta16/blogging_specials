import "./NotFound.sass"
import { NotFoundIllustration } from "../../assets"
import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <section id="not__found">
            <NotFoundIllustration />
            <span>Go to <Link to='/'>Home</Link></span>
        </section>
    )
}

export default NotFound