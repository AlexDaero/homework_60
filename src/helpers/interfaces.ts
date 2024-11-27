export interface ICountry extends IShortCountry {
    capital: string
    borders: Array<string>
    population: number
    flags: {
        png: string
    }
}
export interface IShortCountry {
    name: {
        common: string
    }
}