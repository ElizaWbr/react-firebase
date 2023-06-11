import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import Background from '../../components/Background';
import '../signup.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            if (email.match('@') && email.match(".com")) {
                console.log("Email válido.")
                if (password.length >= 6) {
                    console.log('Senha válida.')

                    await signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        navigate('/', { replace: true })
                    })
                    .catch((error) => {
                        console.log('Erro: ' + error)
                        setErrors('Email e/ou senha incorretos.')
                    })

                } else {
                    console.log('Senha muito curta.');
                    setErrors('Senha inválida.');
                    return;
                }
            } else {
                console.log('Email inválido.');
                setErrors('Email inválido.');
                return;
            }
        } else {
            console.log('Campo vazio.');
            setErrors('Todos os campos devem ser preenchidos.');
            return;
        }
    }

    return (
        <div className='container_signup'>
            <Background/>
            <div className='background_box'>
                <div className='logo'>
                    <h1 className='logo_left'>AFF</h1>
                    <h1>LIST</h1>
                </div>
                <span>Gerencie seus AFFazeres de forma fácil.</span>
                <hr className='hr_class'></hr>
                <form className='form' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.length > 0 ? (
                        <span className='has_error'>{errors}</span>
                    ) : (
                        <span className='empty_errors'></span>
                    )}
                    <button type='submit' className='button_submit'>
                        ACESSAR
                    </button>
                    <Link to="/register" className='button_link'>Não possui uma conta? Cadastre-se.</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
