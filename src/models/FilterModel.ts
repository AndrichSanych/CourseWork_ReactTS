import { FilterData } from "./Models"

export interface FilterModel {
    categoryId?: number
    isNew?: boolean
    isVip?: boolean
    isContractPrice?: boolean
    search?: string
    cityId?: number
    areaId?: number
    priceFrom?:number
    priceTo?:number
    filterValues:FilterData[]
    count?:number
    page?:number
}
// export interface FilterDataModel extends FilterModel{
//     filterDataValues?:FilterData[]
// }