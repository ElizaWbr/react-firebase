import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'
import { db, auth } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import Background from '../../components/Background';
import '../signup.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if (email !== '' && password !== '' && name !== '') {
            if (email.match('@') && email.match(".com")) {
                console.log("Email válido.")
                if (password.length >= 6) {
                    console.log('Senha válida.')

                    await createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        console.log('Usuário criado');

                        setDoc(doc(db, "users", auth.currentUser.uid),{
                            name: name,
                            email: email,
                        })
                        .then(() => {
                            console.log('Usuário Salvo');
                            navigate('/', {replace: true});
                        })
                        .catch((error) => {
                            console.log('Erro: ' + error);
                        })
                    })
                    .catch((error) => {
                        console.log('Erro: ' + error);
                        setErrors('Não foi possível concluir o cadastro.')
                    })

                } else {
                    console.log('Senha inválida.');
                    setErrors('A senha deve conter no mínimo 6 caracteres.');
                }
            } else {
                console.log('Email inválido.');
                setErrors('Insira um email válido.');
            }
        } else {
            console.log('Campo vazio.');
            setErrors('Todos os campos devem ser preenchidos.');
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
                <span>Vamos criar a sua conta!</span>
                <hr className='hr_class'></hr>
                <form className='form' onSubmit={handleRegister}>
                    <input
                        type='text'
                        placeholder='Nome Completo'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        CADASTRAR
                    </button>
                    <Link to="/login" className='button_link'>Já possui uma conta? Entrar.</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
