import { useEffect, useState } from "react";
import './CountriesPage.css'
import axios, { AxiosResponse } from "axios";
import { ICountry, IShortCountry } from "../../helpers/interfaces";
import CountriesList from "../../components/CountriesList/CountriesList";
import CountryInfo from "../../components/CountryInfo/CountryInfo";


axios.defaults.baseURL = 'https://restcountries.com/v3.1/'

const CountriesPage: React.FunctionComponent = (): React.ReactElement => {
    const [countriesList, setCountriesList] = useState<IShortCountry[]>([])
    const [targetCountry, setTargetCountry] = useState<ICountry | null>(null)

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
        } catch (error: unknown) {
            console.log(error)
        }
    }

    const getTargetCountry = async (targetName: string): Promise<void> => {
        try {
            const response: AxiosResponse<ICountry[]> = await axios.get(`/name/${targetName}`)
            console.log(response.data[0])
            setTargetCountry(response.data[0])
        } catch (error: unknown) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(targetCountry)
    }, [targetCountry])

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <div>
            <CountriesList
                countries={countriesList}
                targetCountryOnCLick={(country: string) => getTargetCountry(country)}
            />
            <CountryInfo
                country={targetCountry}
            />
        </div>
    )
}

export default CountriesPage