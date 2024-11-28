import { useEffect, useState } from "react";
import './CountriesPage.css'
import axios, { AxiosResponse } from "axios";
import { ICountry, IShortCountry } from "../../helpers/interfaces";
import CountriesList from "../../components/CountriesList/CountriesList";
import CountryInfo from "../../components/CountryInfo/CountryInfo";
import Loader from 'react-ts-loaders'

axios.defaults.baseURL = 'https://restcountries.com/v3.1/'

const CountriesPage: React.FunctionComponent = (): React.ReactElement => {
    const [countriesList, setCountriesList] = useState<IShortCountry[]>([])
    const [targetCountry, setTargetCountry] = useState<ICountry | null>(null)
    const [borders, setBorders] = useState<string[]>([])
    const [pageIsLoad, setPageIsLoad] = useState(false)

    const getCountries = async (): Promise<void> => {
        try {
            const tempArray: Array<IShortCountry[]> = []
            const response: AxiosResponse<IShortCountry[]> = await axios.get('/all')
            tempArray.push(response.data)

            const sortCountriesArray = tempArray[0].sort((a, b) => {
                if (a.name.common.toLowerCase() < b.name.common.toLowerCase()) return -1
                if (a.name.common.toLowerCase() > b.name.common.toLowerCase()) return 1
                return 0
            })

            setCountriesList(sortCountriesArray)
            setPageIsLoad(true)
        } catch (error: unknown) {
            console.log(error)
        }
    }

    const getTargetCountry = async (targetName: string): Promise<void> => {
        setPageIsLoad(false)
        try {
            const response: AxiosResponse<ICountry[]> = await axios.get(`/name/${targetName}`)
            setTargetCountry(response.data[0])
            getBordersInfo(response.data[0])
        } catch (error: unknown) {
            console.log(error)
        }
    }

    const getBordersInfo = (country: ICountry) => {
        setBorders([])
        if (country?.borders) {
            country?.borders.map(async (border) => {
                const response: AxiosResponse<IShortCountry[]> = await axios.get(`/alpha?codes=${border}`)
                setBorders(prev => [...prev, response.data[0].name.common])
            })
        }
        setPageIsLoad(true)
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <div className="Countries_page">
            {!pageIsLoad
                ? <div className="preloader_backdrop">
                    <Loader
                        type="ring"
                        size={200}
                        className="preloader"
                    />
                </div>
                : null
            }
            <CountriesList
                countries={countriesList}
                targetCountryOnCLick={(country: string) => getTargetCountry(country)}
            />
            <CountryInfo
                country={targetCountry}
                borders={borders}
            />
        </div>
    )
}

export default CountriesPage