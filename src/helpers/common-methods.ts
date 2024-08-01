import { GetProp, UploadFile, UploadProps } from "antd";
import { FilterModel, FullFilterModel } from "../models/FilterModel";

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const reorder = (list: UploadFile[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
 };

export const getQueryString = (filter:any):string =>{
    var result = '';
    Object.keys(filter).forEach((key)  => {
      if(filter[key] !== undefined 
         && filter[key] !== null
         && filter[key] !== ''
         && filter[key] !== 0){
        if(result===''){
          result+=`?${key}=${filter[key as keyof FullFilterModel]}`
        }
        else{
          result+=`&${key}=${filter[key as keyof FullFilterModel]}`
        }
      }
    });
    return result;
} 