import axios from "axios";
import { CityModel } from "../models/CityModel";
import { AreaModel } from "../models/AreaModel";
const areasAPIUrl = process.env.REACT_APP_AREAS_API_URL;
export const areaService = {

    getAll: () => axios.get<AreaModel[]>(areasAPIUrl + '/getareas'),
    getById: (id: number) => axios.post(areasAPIUrl + `/getbyid/${id}`),
    getByCityId: (id: number) => axios.post(areasAPIUrl + `/getbycityid/${id}`)
}