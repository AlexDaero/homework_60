import { FC } from "react";
import './CountriesList.css'
import { IShortCountry } from "../../helpers/interfaces";

interface ICountriesListProps {
    countries: IShortCountry[]
    targetCountryOnCLick: (country: string) => Promise<void>
}

const CountriesList: FC<ICountriesListProps> = ({ countries, targetCountryOnCLick }) => {
    return (
        <ul className="countries_list">
            {countries.map((country) => {
                return (
                    <li
                        key={country.name.common}
                        onClick={() => targetCountryOnCLick(country.name.common)}
                    >
                        {country.name.common}
                    </li>
                )
            })}
        </ul>
    )
}

export default CountriesList