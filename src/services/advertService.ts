import axios from "axios";
import { AdvertModel } from "../models/AdvertModel";
import { AdvertCreationModel } from "../models/AdvertCreationModel";
import { formPostConfig} from "../helpers/constants";
import { SearchResultModel } from "../models/SearchResultModel";
const advertAPIUrl = process.env.REACT_APP_ADVERT_API_URL;
export const advertService = {
    getAll: () => axios.get<AdvertModel[]>(advertAPIUrl + '/adverts'),
    getById: (id: number) => axios.get<AdvertModel>(advertAPIUrl + `/get/${id}`),
    getByUserEmail: (email: string) => axios.get<AdvertModel>(advertAPIUrl + `/get?email=${email}`),
    getByFilter: (filter: FormData) => axios.post<SearchResultModel>(advertAPIUrl + `/findadverts`,filter,formPostConfig),
    getVip: (count: number) => axios.get(advertAPIUrl + `/vip/${count}`),
    create: (model: FormData) => axios.post(advertAPIUrl + `/create`,model,formPostConfig),
    update: (model: AdvertCreationModel) => axios.put(advertAPIUrl + `/update`,model,formPostConfig),
    delete: (id: number) => axios.delete(advertAPIUrl + `/delete/${id}`),

}