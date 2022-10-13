import React from 'react'
import Weather from '../components/Weather'
import Welcome from '../components/Welcome'
import styles from '../styles/weather.module.scss'
import Logo from '../media/logo-white.png'
import { useRouteLoaderData, useNavigate } from "react-router-dom";

function Dashboard({currUser}) {
  let navigate = useNavigate();

  const handleLogOut = () => {
    const location = {
      pathname: '/volante/',
      state: { fromDashboard: true }
    }
    navigate(location.pathname, { replace: true })
  }


  return (
    <div className='dashboard'>
      <div className={styles.nav}>
        <img src={Logo} alt="volante logo" style={{width: '126px'}} className={styles.logo}/>
      <h5 onClick={handleLogOut} className={styles.logOut}>Log Out</h5>
      </div>
        <Welcome currUser={currUser}/>
        <Weather />
    </div>
  )
}

export default Dashboard