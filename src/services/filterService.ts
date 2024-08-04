import axios from "axios";
import { AdvertFilterModel } from "../models/AdvertFilterModel";
import { FilterValueModel } from "../models/FilterValueModel";
const filterAPIUrl = process.env.REACT_APP_FILTER_API_URL;
export const filterService = {

   getCategoryFilters: (categoryId: number) => axios.get<AdvertFilterModel[]>(filterAPIUrl + '/category-filters/' + categoryId),
   getAdvertFilterValues: (advertId: number) => axios.get<FilterValueModel[]>(filterAPIUrl + '/advert-values/' + advertId),

}