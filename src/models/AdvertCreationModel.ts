import { UploadFile } from "antd"
import { FilterData } from "./Models"

export interface AdvertCreationModel{
     userId:string
     cityId:number
     categoryId:number
     title:string
     description:string 
     isNew:boolean 
     isVip:boolean 
     isContractPrice:boolean
     price:number 
     imageFiles:(UploadFile | undefined)[]
     filterValues:FilterData[]
    
}