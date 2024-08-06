import axios from "axios";
import { formPostConfig} from "../helpers/constants";
import { LoginModel } from "../models/LoginModel";
import { UserRegisterModel } from "../models/UserRegisterModel";
import { TryError } from "../helpers/common-methods";
import { LoginResponseModel } from "../models/LoginResponseModel";
const accountsAPIUrl = process.env.REACT_APP_ACCOUNT_API_URL;
export const accountService = {

    login: (model:LoginModel) => TryError<LoginResponseModel>(()=>  axios.post<LoginResponseModel>(accountsAPIUrl + '/login',  model ,formPostConfig)),
    register:(user:UserRegisterModel)=> TryError(()=> axios.post(accountsAPIUrl + '/user/register', user,formPostConfig)),
    toggleFavorite:(id:number)=>TryError(()=> axios.post(accountsAPIUrl + `/togglefavorite/${id}`))
}