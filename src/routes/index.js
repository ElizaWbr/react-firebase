import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import Register from '../pages/register';
import Login from '../pages/login';

import Private from './private';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={ <Private> <Home/> </Private> }/>
            <Route path='/login' element={ <Login/> }/>
            <Route path='/register' element={ <Register/>}/>
        </Routes>
    )
}

export default RoutesApp;