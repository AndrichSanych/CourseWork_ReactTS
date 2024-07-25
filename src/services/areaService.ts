import axios from "axios";
import { AreaModel } from "../models/AreaModel";
const areasAPIUrl = process.env.REACT_APP_AREAS_API_URL;
export const areaService = {

    getAll: () => axios.get<AreaModel[]>(areasAPIUrl + '/getareas'),
    getById: (id: number) => axios.get<AreaModel>(areasAPIUrl + `/getbyid/${id}`),
    getByCityId: (id: number) => axios.get<AreaModel>(areasAPIUrl + `/getbycityid/${id}`)
}