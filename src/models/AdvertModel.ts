export interface AdvertModel {
    id:number
    userId: string
    cityId: number
    cityName: string
    areaName:string
    categoryId: number
    categoryName: string
    date: string
    title: string
    description: string
    isNew: boolean
    isVip: boolean
    isContractPrice: boolean
    price: number
    firstImage:string
    userFavorites:string[]
}