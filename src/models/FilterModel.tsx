export interface FilterModel{
     categoryId?:number
     isNew?:boolean
    
}

export interface FullFilterModel extends FilterModel{
    search?:string
    cityId?:number
    areaId?:number
}