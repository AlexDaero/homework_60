import { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import './CountryInfo.css';
import { ICountry, IShortCountry } from '../../helpers/interfaces';

interface ICountryInfoProps {
    country: ICountry | null
}

const CountryInfo: FC<ICountryInfoProps> = ({ country }) => {
    const [borders, setBorders] = useState<string[]>([])

    useEffect(() => {
        setBorders([])
        if (country?.borders) {
            country?.borders.map(async (border) => {
                const response: AxiosResponse<IShortCountry[]> = await axios.get(`/alpha?codes=${border}`)
                setBorders(prev => [...prev, response.data[0].name.common])
            })
        }
    }, [country?.borders])

    return (
        <>
            {country
                ? <div>
                    <div>
                        <p>{country?.name.common}</p>
                        <p>Столица: {country?.capital}</p>
                        <p>Население: {country?.population}</p>
                        {country?.borders
                            ? <>
                                <p>Граничит с:</p>
                                {borders.map((item) => {
                                    return <p key={item}>{item}</p>
                                })}
                            </>
                            : null
                        }
                    </div>
                    <img src={country?.flags.png} alt={`flag_${country?.name.common}`} />
                </div>
                : null
            }
        </>
    )
}

export default CountryInfo