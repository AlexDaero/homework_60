import React, { useCallback, useEffect, useState } from "react";
import './CountriesPage.css'
import ICountriesList from "../../components/CountriesList/ICountriesList";
import axios, { AxiosResponse } from "axios";
import ITargetCountryInfo from "../../Interfaces/ITargetCountryInfo";

axios.defaults.baseURL = 'https://restcountries.com/v3.1/'

const CountriesPage: React.FunctionComponent = (): React.ReactElement => {
    const [countriesList, setCountriesList] = useState<ICountriesList[]>([])
    const [targetCountryList, setTargetCountryList] = useState<ITargetCountryInfo[]>([])
    const [targetName, setTargetName] = useState<string | null>(null)

    const getCountries = async (): Promise<void> => {
        try {
            const response: AxiosResponse<ICountriesList[]> = await axios.get('/all')
            setCountriesList(response.data)
        } catch (error: unknown) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCountries()
    }, [])

    useEffect(() => {
        console.log(countriesList)
    }, [countriesList])

    return (
        <div>

        </div>
    )
}

export default CountriesPage