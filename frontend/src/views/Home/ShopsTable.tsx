import React, { useEffect } from 'react'
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

import api from '../../services/api'
import { ITableProps } from './types'

export default function ShopsTable({
    shops,
    infos,
    options,
    setOptions,
    fetchData,
    load,
    handleEdit
}: ITableProps): JSX.Element {
    useEffect(() => {
        fetchData()
    }, [options])

    function handleDelete(id: number) {
        api.delete(`/shop/delete/${id}`).then(() => {
            fetchData()
        })
    }

    function handleOrderChange(key: 'name' | 'state' | 'uf') {
        if (load) return
        setOptions({
            ...options,
            orderBy: key,
            order:
                options.orderBy === key
                    ? options.order === 'desc'
                        ? 'asc'
                        : 'desc'
                    : 'asc'
        })
    }

    function handleChangePage(event: unknown, newPage: number): void {
        if (load) return
        setOptions({
            ...options,
            page: newPage
        })
    }

    function handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLInputElement>
    ): void {
        if (load) return
        setOptions({
            ...options,
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        })
    }

    return (
        <TableContainer component={Paper}>
            <Table size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={options.orderBy === 'name'}
                                direction={
                                    options.orderBy === 'name'
                                        ? options.order
                                        : 'asc'
                                }
                                onClick={() => handleOrderChange('name')}
                            >
                                Nome
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right" style={{ width: 200 }}>
                            <TableSortLabel
                                active={options.orderBy === 'state'}
                                direction={
                                    options.orderBy === 'state'
                                        ? options.order
                                        : 'asc'
                                }
                                onClick={() => handleOrderChange('state')}
                            >
                                Estado
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right" style={{ width: 100 }}>
                            <TableSortLabel
                                active={options.orderBy === 'uf'}
                                direction={
                                    options.orderBy === 'uf'
                                        ? options.order
                                        : 'asc'
                                }
                                onClick={() => handleOrderChange('uf')}
                            >
                                UF
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" style={{ width: 100 }}>
                            Opções
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shops.map(shop => (
                        <TableRow key={`${shop.name}${shop.id}`}>
                            <TableCell component="th" scope="row">
                                {shop.name}
                            </TableCell>
                            <TableCell align="right">
                                {shop.state.name}
                            </TableCell>
                            <TableCell align="right">{shop.state.uf}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="primary"
                                    aria-label="edit"
                                    component="span"
                                    onClick={() => {
                                        handleEdit(shop)
                                    }}
                                >
                                    <CreateIcon />
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    aria-label="delete"
                                    component="span"
                                    onClick={() => {
                                        handleDelete(shop.id)
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={infos.count || 0}
                rowsPerPage={options.rowsPerPage}
                page={options.page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}
