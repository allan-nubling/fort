export interface ITableProps {
    shops: IShop[]
    infos: IInfos
    options: ITableOptions
    setOptions: (options: ITableOptions) => void
    fetchData: VoidFunction
    load: boolean
    handleEdit: (shop: IShop) => void
}

export interface IInfos {
    count: number
    pages: number
    nextPage: string
}

export interface IState {
    id: number
    name: string
    uf: string
}

export interface IShop {
    id: number
    name: string
    state: IState
}

export interface IResponse {
    infos: IInfos
    shops: IShop[]
}

export interface ITableOptions {
    page: number
    rowsPerPage: number
    orderBy: 'name' | 'state' | 'uf'
    order: 'asc' | 'desc'
    name?: string
    uf?: string
}

export interface ISearchFormProps {
    options: ITableOptions
    setOptions: (options: ITableOptions) => void
    states: IState[]
}

export interface IShopModalProps {
    shop: Partial<IShop> | null
    states: IState[]
    open: boolean
    handleCloseModal: VoidFunction
}
