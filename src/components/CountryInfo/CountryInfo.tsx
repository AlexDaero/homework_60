import { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import './CountryInfo.css';
import { ICountry, IShortCountry } from '../../helpers/interfaces';
import Loader from 'react-ts-loaders'

interface ICountryInfoProps {
    country: ICountry | null
}

const CountryInfo: FC<ICountryInfoProps> = ({ country }) => {
    const [borders, setBorders] = useState<string[]>([])
    const [pageIsLoad, setPageIsLoad] = useState<Boolean>(false)

    useEffect(() => {
        setBorders([])
        if (country?.borders) {
            country?.borders.map(async (border) => {
                const response: AxiosResponse<IShortCountry[]> = await axios.get(`/alpha?codes=${border}`)
                setBorders(prev => [...prev, response.data[0].name.common])
            })
        }
    }, [country])

    return (
        <>
            {country
                ? <div className='CountryInfo'>
                    {!pageIsLoad
                        ? <Loader
                            type="ring"
                            size={200}
                            className="countries_page_loader"
                        />
                        : null
                    }
                    <div className='countryInfo_about'>
                        <h1 className='countryInfo_about_title'>{country?.name.common}</h1>
                        <p className='countryInfo_about_text'><b>Столица: </b>{country?.capital}</p>
                        <p className='countryInfo_about_text'><b>Население: </b>{country?.population} человек</p>
                        {country?.borders
                            ? <div className='countryInfo_about_borders'>
                                <b>Граничит с:</b>
                                <ul className=''>
                                    {borders.map((item) => {
                                        return <li key={item}>{item}</li>
                                    })}
                                </ul>
                            </div>
                            : <p className='countryInfo_about_text'><b>Не граничит с другими странами</b></p>
                        }
                    </div>
                    <img className='countryInfo_flag' src={country?.flags.png} alt={`flag_${country?.name.common}`} />
                </div>
                : null
            }
        </>
    )
}

export default CountryInfo