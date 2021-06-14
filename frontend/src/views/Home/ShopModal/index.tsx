import React, { FormEvent, useEffect, useState } from 'react'
import {
    FormControl,
    FormGroup,
    IconButton,
    InputLabel,
    makeStyles,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ColoredButton from '../../../components/ColoredButton'
import styles from './styles'

import api from '../../../services/api'
import { IShopModalProps } from '../types'
import { nameValidation } from '../../../utils/validation'

const useStyles = makeStyles(styles)
export default function ShopModal({
    shop,
    states,
    open,
    handleCloseModal
}: IShopModalProps): JSX.Element {
    const classes = useStyles()
    const [form, setForm] = useState({
        id: 0,
        name: '',
        state: 0
    })
    const [error, setError] = useState({
        field: '',
        message: ''
    })

    useEffect(() => {
        console.log(shop)
        if (shop) {
            setForm({ ...form, ...shop, state: shop?.state?.id || 0 })
        } else {
            setForm({
                id: 0,
                name: '',
                state: 0
            })
        }
    }, [shop])

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError({
            field: '',
            message: ''
        })

        if (!nameValidation(form.name)) {
            setError({
                field: 'name',
                message: 'digite um nome com mais de 3 caracteres'
            })
            return
        }

        if (!form.state) {
            setError({
                field: 'state',
                message: 'por favor escolha um estado'
            })
            return
        }

        if (form.id) {
            api.patch(`/shop/edit/${form.id}`, {
                ...form
            })
                .then(() => {
                    handleCloseModal()
                })
                .catch(err => {
                    setError({
                        field: 'form',
                        message: err.response?.data?.message
                    })
                })
        } else {
            api.post('/shop/create', { ...form })
                .then(() => {
                    handleCloseModal()
                })
                .catch(err => {
                    setError({
                        field: 'form',
                        message: err.response?.data?.message
                    })
                })
        }
    }

    return (
        <Modal open={open} className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.closePlaceHolder}>
                    <IconButton
                        className={classes.closeButton}
                        onClick={handleCloseModal}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <form onSubmit={handleSubmit}>
                    <FormGroup className={classes.form}>
                        <p>
                            {form.id ? 'Editar' : 'Adicionar'} Estabelecimento
                        </p>
                        <TextField
                            id="name-filter"
                            label="Nome"
                            error={error.field === 'name'}
                            value={form.name}
                            onChange={e =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                        <FormControl error={error.field === 'state'}>
                            <InputLabel id="state">Estado</InputLabel>
                            <Select
                                labelId="state"
                                value={form.state}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        state: e.target.value as number
                                    })
                                }
                            >
                                {states.map(state => (
                                    <MenuItem
                                        key={`${state.uf}-${state.id}`}
                                        value={state.id}
                                    >
                                        {state.name} ({state.uf})
                                    </MenuItem>
                                ))}

                                <MenuItem value={''}>Todos</MenuItem>
                            </Select>
                        </FormControl>
                        {error.field && (
                            <p className={classes.error}>{error.message}</p>
                        )}
                        <ColoredButton
                            variant="contained"
                            size="small"
                            color="primary"
                            type="submit"
                        >
                            salvar
                        </ColoredButton>
                    </FormGroup>
                </form>
            </Paper>
        </Modal>
    )
}
