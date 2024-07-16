import axios from "axios";
import { formPostConfig} from "../helpers/constants";
import { LoginModel } from "../models/LoginModel";
import { UserRegisterModel } from "../models/UserRegisterModel";
const accountsAPIUrl = process.env.REACT_APP_ACCOUNT_API_URL;
export const accountService = {

    login: (model:LoginModel) =>  axios.post(accountsAPIUrl + '/login',  model ,formPostConfig),
    register:(user:UserRegisterModel)=> axios.post(accountsAPIUrl + '/user/register', user,formPostConfig)
}