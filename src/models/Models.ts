export interface TreeElement{
    id:number;
    value: number;
    title:string;
    pId: number;
    selectable: boolean ;
    key:any
}

export interface FilterData{
    valueId:number|undefined
    filterId:number
}

export interface SearchData {
    searchString: string
    placeId: number
}