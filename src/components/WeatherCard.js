import React, { useState, useEffect } from 'react'
import styles from '../styles/card.module.scss'
function WeatherCard({ city, periods = [{}], state }) {
    const [temperature, setTemperatures] = useState({})
    const [fahrenheitActive, setFahrenheitActive] = useState(true)

    useEffect(() => {
        const TO_CELSIUS = (temp) => (temp - 32) * 0.5556
        setTemperatures({ fahrenheit: periods[0]?.temperature, celsius: TO_CELSIUS(periods[0]?.temperature) })
    }, [])


    return (


        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <img src={periods[0].icon} alt="" />
                <h1>{city}</h1>
                <p>{state}</p>
            </div>
            <div className={styles.cardForecast}>
                <h1
                    onClick={() => setFahrenheitActive(p => !p)}>
                    {fahrenheitActive ? `${temperature.fahrenheit}ºF` : `${temperature.celsius?.toFixed(1)}ºC`}</h1>
                <h3>{periods[0].name}</h3>
                <h4>{periods[0].shortForecast}</h4>
                <p>{periods[0].detailedForecast}</p>
            </div>
        </div >

    )

}

export default WeatherCard