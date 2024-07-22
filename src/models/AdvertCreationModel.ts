export interface AdvertCreationModel{
     userId:string
     cityId:number
     categoryId:number
     title:string
     description:string 
     isNew:boolean 
     isVip:boolean 
     price:number 
     imageFiles:(File | undefined)[]
}