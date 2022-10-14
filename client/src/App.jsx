import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import { Login, Register } from './auth'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/auth'>
                    <Route path='login' element={ <Login /> } />
                    <Route path='register' element={ <Register /> } />
                </Route>

                <Route path='*' element={ <h1>NF</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App