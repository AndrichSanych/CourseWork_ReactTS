import axios from "axios";
import { CityModel } from "../models/CityModel";
const citiesAPIUrl = process.env.REACT_APP_CITIES_API_URL;
export const cityService = {

    getAll: () => axios.get<CityModel[]>(citiesAPIUrl + '/getcities'),
    getById: (id: number) => axios.get<CityModel>(citiesAPIUrl + `/getbyid/${id}`),
    getByAreaId: (id: number) => axios.get<CityModel[]>(citiesAPIUrl + `/getbyareaid/${id}`)
}