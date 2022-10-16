import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreatePost, Home, NotFound, Post, UpdatePost } from './pages'
import { ForgotPassword, Login, Logout, Profile, Register } from './auth'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route>
                    <Route path='/auth'>
                        <Route path='login' element={ <Login /> } />
                        <Route path='forgotPassword' element={ <ForgotPassword /> } />
                        <Route path='resetPassword/:token' element={ <ForgotPassword reset={true} /> } />
                        <Route path='register' element={ <Register /> } />
                        <Route path='logout' element={ <Logout /> }/>
                    </Route>
                </Route>
                <Route >
                    <Route path='/post/:postId' element={ <Post /> }/>
                    <Route path='/user/profile' element={ <Profile /> } />
                    <Route path='/user/createPost' element={ <CreatePost /> } />
                    <Route path='/user/updatePost/:id' element={ <UpdatePost /> } />
                    <Route path='/user/myBlogs' element={ <Home my={true} /> } />
                </Route>
                <Route path='*' element={ <NotFound/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App