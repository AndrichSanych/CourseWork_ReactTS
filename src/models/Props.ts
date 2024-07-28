import { CategoryModel } from "./CategoryModel"

export interface SearchProps {
    searchString?: string
    placeId?: number
    isArea?: boolean
    onSearch?: Function
}

export interface CategoryViewProps{
    category: CategoryModel
    onClick?:Function
  }