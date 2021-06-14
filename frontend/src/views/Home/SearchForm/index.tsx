import React, { useState } from 'react'
import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    TextField
} from '@material-ui/core'

import styles from './styles'

import { ISearchFormProps } from '../types'
import ColoredButton from '../../../components/ColoredButton'

const useStyles = makeStyles(styles)
export default function SearchForm({
    options,
    setOptions,
    states
}: ISearchFormProps): JSX.Element {
    const classes = useStyles()

    const [name, setName] = useState('')

    return (
        <Paper className={classes.root}>
            <form
                className={classes.form}
                onSubmit={e => {
                    e.preventDefault()
                    setOptions({ ...options, name })
                    console.log(name)
                }}
            >
                <TextField
                    id="name-filter"
                    className={classes.nameField}
                    label="Nome"
                    onChange={e => setName(e.target.value)}
                    // onKeyPress={e => {
                    //     console.log(e.key === 'Enter')
                    // }}
                />
                <FormControl>
                    <InputLabel id="state-filter">Estado</InputLabel>
                    <Select
                        labelId="state-filter"
                        className={classes.select}
                        value={options.uf}
                        onChange={e =>
                            setOptions({
                                ...options,
                                uf: e.target.value as string
                            })
                        }
                    >
                        {states.map(state => (
                            <MenuItem
                                key={`${state.uf}-${state.id}`}
                                value={state.uf}
                            >
                                {state.name} ({state.uf})
                            </MenuItem>
                        ))}

                        <MenuItem value={''}>Todos</MenuItem>
                    </Select>
                </FormControl>
                <ColoredButton
                    variant="contained"
                    size="small"
                    color="primary"
                    type="submit"
                >
                    pesquisar
                </ColoredButton>
            </form>
        </Paper>
    )
}
