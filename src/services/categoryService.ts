import axios from "axios";
import { CategoryModel } from "../models/CategoryModel";
const categoriesAPIUrl = process.env.REACT_APP_CATEGORIES_API_URL;
export const categoryService = {

    getAll: () =>  axios.get<CategoryModel[]>( categoriesAPIUrl + '/getcategories'),
    getById:(id:number)=> axios.get<CategoryModel>(categoriesAPIUrl + `/getbyid/${id}`)
}