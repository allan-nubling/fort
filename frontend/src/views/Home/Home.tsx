import React, { useEffect, useState } from 'react'

import { LinearProgress } from '@material-ui/core'
import SearchForm from './SearchForm'
import ShopsTable from './ShopsTable'
import ShopModal from './ShopModal'

import api from '../../services/api'
import { IInfos, IResponse, IShop, IState, ITableOptions } from './types'
import ColoredButton from '../../components/ColoredButton'

export default function Home(): JSX.Element {
    const [load, setLoad] = useState(true)
    const [shops, setShops] = useState<IShop[]>([])
    const [shop, setShop] = useState<IShop | null>(null)
    const [infos, setInfos] = useState({} as IInfos)
    const [states, setStates] = useState<IState[]>([])
    const [options, setOptions] = useState<ITableOptions>({
        page: 0,
        rowsPerPage: 5,
        orderBy: 'name',
        order: 'asc',
        uf: ''
    })
    const [openModal, setOpenModal] = useState(false)

    function fetchData() {
        const { page, rowsPerPage, orderBy, order, uf, name } = options
        setLoad(true)
        console.log('load')
        api.get<IResponse>(
            `/shop?page=${
                page + 1
            }&limit=${rowsPerPage}&order_by=${orderBy}&order=${order}${
                uf ? `&uf=${uf}` : ''
            }${name ? `&name=${name}` : ''}`
        ).then(({ data }) => {
            setShops([])
            const { infos, shops } = data
            setInfos(infos)
            setShops(shops)
            setLoad(false)
        })
    }

    useEffect(() => {
        api.get(`/state`).then(({ data }) => {
            const { states } = data
            setStates(states)
        })
    }, [])

    function handleEdit(shop: IShop) {
        setShop(shop)
        setOpenModal(true)
    }

    function handleCloseModal() {
        setShop(null)
        setOpenModal(false)
        fetchData()
    }

    return (
        <>
            <ColoredButton
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setOpenModal(true)}
            >
                Novo Estabelecimento
            </ColoredButton>
            <SearchForm
                options={options}
                setOptions={setOptions}
                states={states}
            />
            {load && <LinearProgress />}
            <ShopsTable
                shops={shops}
                infos={infos}
                options={options}
                setOptions={setOptions}
                fetchData={fetchData}
                load={load}
                handleEdit={handleEdit}
            />
            <ShopModal
                shop={shop}
                states={states}
                open={openModal}
                handleCloseModal={handleCloseModal}
            />
        </>
    )
}
