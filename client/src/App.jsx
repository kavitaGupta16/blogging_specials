import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, NotFound } from './pages'
import { ForgotPassword, Login, Register } from './auth'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/auth'>
                    <Route path='login' element={ <Login /> } />
                    <Route path='register' element={ <Register /> } />
                    <Route path='forgotPassword' element={ <ForgotPassword /> } />
                    <Route path='resetPassword/:token' element={ <ForgotPassword reset={true} /> } />
                </Route>

                <Route path='*' element={ <NotFound/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App