import React, { useState, useEffect, useRef} from "react";
import cities from '../cities.json';
import WeatherCard from "./WeatherCard";
import styles from '../styles/weather.module.scss'
import { PlusCircleIcon } from '@heroicons/react/24/solid'

const fetchData = async (latitude, longitude) => {
    const lat = latitude
    const lon = longitude
    const response = await fetch(
        `https://api.weather.gov/points/${lat},${lon}`
    );
    if (response.status !== 200) throw new Error(500)
    const data = await response.json();
    const { gridX, gridY } = data.properties
    const response2 = await fetch(`https://api.weather.gov/gridpoints/TOP/${gridX},${gridY}/forecast`)
    if (response2.status !== 200) throw new Error(500)
    const data2 = await response2.json();
    return data2.properties
}

export default function Weather() {
    const [apiData, setApiData] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [cards, setCards] = useState({});
    const [userInput, setUserInput] = useState('');
    const [isLoaded, setIsLoaded] = useState(true)
    const [showError, setShowError] = useState(false)

    const ref = useRef()
    useEffect(() => {
        if (userInput === '') setFilteredCities([])
        else {
            const searchMatches = cities.filter((elem, id) => elem.city.toLowerCase().includes(userInput))
            setFilteredCities(searchMatches.slice(0,16))
        }
    }, [userInput])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowError(false)
        }, 2000)
        return () => clearTimeout(timeout)
    }, [showError])

    const displayCities = (e) => {
        const { value } = e.target
        const userCity = value.toLowerCase()
        setUserInput(userCity)
    }


    const handleClick = async (lat, lon, city, state) => {
        setShowError(false)
        try {
            const properties = await fetchData(lat, lon)
            console.log(properties)
            if (properties) {
                setCards(prev => ({ ...prev, [city]: { state, ...properties } }))
            }
        } catch (err) {
            setShowError(true)
        }
    }

    return (
        <div className={styles.weather}>
            {isLoaded &&
                <>
                    {/* <h1>Temperature</h1> */}
                    <div>
                        <input type="text" value={userInput} placeholder="Search city" onChange={displayCities} ref={ref}/>
                    </div>
                    <div className={styles.container}>
                        {filteredCities.map(elem => {
                            const { city, state, latitude: lat, longitude: lon } = elem
                            return (
                                <div className={styles.chip} onClick={() => handleClick(lat, lon, city, state)}>
                                    <p>{city}</p>
                                </div>
                            )
                        })}
                    </div>
                    {showError && <p className={styles.errorMsg}>Oh no, something went wrong while fetching your data. Please try again.</p>}

                    <section className={styles.cardsPreview}>

                        {Object.entries(cards).map(([city, value], ix) => <WeatherCard key={ix} city={city} {...value} />)}
                    </section>

                </>}
            {!isLoaded && 'Loading dashboard...'}

            {Object.keys(cards).length === 0 &&
                <div className={styles.mockupCard}>
                    <h4>
                        Search and select your desired city within the US
                    </h4>
                    <PlusCircleIcon onClick={()=> ref.current.focus()}/>
                </div>
            }
        </div>
    )
}

