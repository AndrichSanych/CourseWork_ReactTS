import { GetProp, UploadFile, UploadProps } from "antd";
import { FilterModel } from "../models/FilterModel";

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

export const getQueryString = (filter:FilterModel):string =>{
    var result = '';
    Object.keys(filter).forEach((key)  => {
      if(filter[key as keyof FilterModel]){
        if(result===''){
          result+=`?${key}=${filter[key as keyof FilterModel]}`
        }
        else{
          result+=`&${key}=${filter[key as keyof FilterModel]}`
        }
      }
    });
    return result;
} 