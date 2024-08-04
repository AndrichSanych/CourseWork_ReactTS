import { ReactElement } from "react"
import { AdvertModel } from "./AdvertModel"
import { CategoryModel } from "./CategoryModel"
import { FilterModel } from "./FilterModel"
import { UploadFile } from "antd"
import { FilterData } from "./Models"


export interface ImageLoaderProps {
    files: UploadFile[]
    onChange?: Function
}

export interface SearchProps {
    filter?: FilterModel
    isFilter?: boolean
    onSearch?: Function
    categories?: CategoryModel[]
}

export interface CategoryViewProps {
    category: CategoryModel
    onClick?: Function
}

export interface AdvertViewProps {
    advert: AdvertModel
    onClick?: Function
}

export interface StartContentProps {
    categories: CategoryModel[]
    onCategorySelect?: Function
}

export interface FilterProps {
    filter?: FilterModel
    categories?: CategoryModel[]
    adverts?: AdvertModel[]
    onFilterChange?: Function
}

export interface ProtectedRouteProps {
    redirectPath?: string
    children: ReactElement
}

export interface AdvertFitersProps {
    categoryId?: number
    values?: FilterData[]
    onChange?: Function
    bordered?: boolean
    child?: boolean
}

export interface DisabledRowProps {
    enabled?: boolean
    children?: ReactElement[]
}

export interface CategoryGridProps {
    categories: CategoryModel[]
    handleClick?: Function
}

export interface SortedImageProps {
    item: UploadFile,
    deleteHandler: Function
}

export interface ErrorProps {
    status?: string;
    title?: string;
    subTitle?: string;
}