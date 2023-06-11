import { Link } from 'react-router-dom';
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth';
import Icon from '@mdi/react';
import { mdiLogoutVariant } from '@mdi/js';
import './header.css';

function Header() {

    async function handleLogout(){
        await signOut(auth)
    }


    return (
            <div className='header'>
                <div className='header_left'>
                    <Icon path={mdiLogoutVariant} size={1.5}/>
                </div>
                <Link className='logo_header' to="/">
                    <h1 className='logo_header_left'>AFF</h1>
                    <h1>LIST</h1>
                </Link>
                <div className='header_right' onClick={handleLogout}>
                    <Icon path={mdiLogoutVariant} size={1.5} title='Sair.'/>
                </div>
            </div>
    )
}

export default Header;