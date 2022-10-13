import React, { useState } from "react";
import { useRouteLoaderData, useNavigate } from "react-router-dom";
import styles from '../styles/login.module.scss'
// import { HiUser} from '@react-icons/fa'
import { KeyIcon, UserIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid'
export default function Form({setCurrUser}) {
    const [showPass, setShowPass] = useState(false)
    const [userLogin, setUserLogin] = useState({
        user: '',
        pass: ''
    });
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const { user, pass } = userLogin
        checkCredentials(user, pass)
        

    }

    function checkCredentials(name, key) {
       
        const validPassword = name.replace(/[aeiou]/gi, '');
        console.log(name, key, validPassword)
        if (key === validPassword && name.length > 0) {
            
            setCurrUser({name: name, isLoggedIn: true})
            const location = {
                pathname: '/dashboard',
                state: { fromDashboard: true }
            }
            navigate(location.pathname, { replace: true })
        } else {
            setCurrUser({name: '', isLoggedIn: false})
            alert('Invalid credentials, please try again.')
            setUserLogin(prev => ({ ...prev, pass: '' }))
        }

    }

    const handleForm = (e) => {
        const { id, value } = e.target
        const validChars = value.replace(/[^a-zA-Z0-9 ]/g, '')
        setUserLogin(prev => ({ ...prev, [id]: validChars }))
        console.log(userLogin)
    }
    return (
        <div className={styles.login}>
            <h1>Volante Quick Connect</h1>
            <h3>Please login to your platform</h3>
            <form onSubmit={handleSubmit}>
                <section>
                    <h6>

                        <UserIcon />
                    </h6>
                    <input type="text" id="user" placeholder="Username" onChange={handleForm} value={userLogin.user}></input>
                </section>
                <section>
                    <h6>
                        <KeyIcon />

                    </h6>

                    <input type={showPass ? 'text' : 'password'} id="pass" placeholder="Password" onChange={handleForm} value={userLogin.pass}>

                    </input>


                    <h6 className={styles.right} onClick={() => setShowPass(c => !c)}>{!showPass ? <EyeSlashIcon /> : <EyeIcon />}</h6>
                </section>
                <button type="submit">LOGIN</button>
            </form>
            <a href='https://www.volantetech.com/contact/'>
            <p>Forgot your password?</p>
            </a>
        </div>
    );
}
