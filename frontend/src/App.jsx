import { Routes, Route } from 'react-router-dom'

import RegPage from "./pages/RegPage";
import LogPage from './pages/LogPage';

import logo from '../src/assets/img/logotip.jpg'


const App = () => {
    return (
        <>
            <header>
                <>
                    <img src={logo} alt="Логотип" id="logo" />
                </>
                <h1>Конференции.РФ</h1>
            </header>
            <main className='container'>
                <Routes>
                    <Route path='/' element={<RegPage />} />
                    <Route path='/log' element={<LogPage />} />
                </Routes>
            </main>
        </>
    )
}

export default App;