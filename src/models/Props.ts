import { ReactElement } from "react"
import { AdvertModel } from "./AdvertModel"
import { CategoryModel } from "./CategoryModel"
import { FilterModel, FullFilterModel } from "./FilterModel"

export interface SearchProps {
    filter?:FullFilterModel
    isFilter?:boolean
    onSearch?: Function
    categories?:CategoryModel[]
}

export interface CategoryViewProps {
    category: CategoryModel
    onClick?: Function
}

export interface AdvertViewProps{
    advert: AdvertModel
    onClick?: Function
}

export interface StartContentProps{
    categories: CategoryModel[]
    onCategorySelect?: Function
}

export interface FilterProps{
    filter?:FilterModel
    categories?:CategoryModel[]
    adverts?:AdvertModel[]
    onFilterChange?:Function

}

export interface ProtectedRouteProps {
    redirectPath?:string
    children:ReactElement
  }
