export interface TreeElement {
    id: number;
    value: number;
    title: string;
    pId: number;
    selectable: boolean;
    key: any
}

export interface FilterData {
    id: number
    filterId: number
}

export interface SearchData {
    searchString: string
    placeId: number
}

export interface TableData {
    page: number
    pageSize: number
    sortIndex: number | undefined
}

export interface LocalFavoriteModel {
    id: number
    price: number
    date: string
}