import { GetProp, UploadFile, UploadProps } from "antd";
import { DefaultOptionType } from "antd/es/cascader";

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

export const getQueryString = (filter: any): string => {
  var result = '';
  Object.keys(filter).forEach((key) => {
    if (filter[key] !== undefined
      && filter[key] !== null
      && filter[key] !== ''
      && filter[key]?.length !== 0) {
      var value = typeof (filter[key]) === "object"
        ? JSON.stringify(filter[key])
        : filter[key];
      var symbol = result === '' ? '?' : '&'
      result += `${symbol + key}=${value}`
    }
  });
  return result;
} 

export const filterTree: boolean | ((inputValue: string, treeNode: DefaultOptionType) => boolean) | undefined = (search:string, item:DefaultOptionType):boolean => {
  var res = false;
  if (item.title) {
      res = item.title?.toLocaleString()?.toLocaleLowerCase()?.indexOf(search.toLowerCase()) >= 0;
  }
  return res;
} 