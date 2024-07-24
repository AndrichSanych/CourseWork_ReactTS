import axios from "axios";
import { CityModel } from "../models/CityModel";
const citiesAPIUrl = process.env.REACT_APP_CITIES_API_URL;
export const ccityService = {

    getAll: () => axios.get<CityModel[]>(citiesAPIUrl + '/getcities'),
    getById: (id: number) => axios.post(citiesAPIUrl + `/getbyid/${id}`),
    getByAreaId: (id: number) => axios.post(citiesAPIUrl + `/getbyareaid/${id}`)
}