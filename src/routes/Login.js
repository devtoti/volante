import React from 'react'
import Form from '../components/Form'
import styles from '../styles/login.module.scss'
import Logo from '../media/logo-white.png'
import Illustration from '../media/volante-illustration.png'

function Login({setCurrUser}) {
  return (
<div className={styles.container}>

<div className={styles.col1}>
    <img src={Logo} alt="" className={styles.logo}/>
    <img src={Illustration} alt="" className={styles.illustration}/>
</div>
<div className={styles.col2}><Form setCurrUser={setCurrUser} />
<h4 className={styles.copyrights}>2022 © Volante Quick Connect, Volante Technologies Inc.</h4></div>
</div>
  )
}

export default Login