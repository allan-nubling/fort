import React, { FormEvent, useState } from 'react'
import { CircularProgress, makeStyles, TextField } from '@material-ui/core'
import styles from './styles'
import ColoredButton from '../../components/ColoredButton'
import api from '../../services/api'
import { Redirect } from 'react-router'
import { emailValidation, nameValidation } from '../../utils/validation'
import { Link } from 'react-router-dom'

interface IForm {
    name: string
    email: string
    emailValidation: string
    password: string
    passwordValidation: string
}

interface IError {
    field?: keyof IForm
    message?: string
}

const useStyles = makeStyles(styles)
export default function Login(): JSX.Element {
    const classes = useStyles()

    const [load, setLoad] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [form, setForm] = useState({} as IForm)
    const [error, setError] = useState<IError>({})

    function formValidation(): boolean {
        if (!form.name || !nameValidation(form.name)) {
            setError({
                field: 'name',
                message: 'o nome deve ter mais de 3 letras'
            })
            return false
        }
        if (!form.email || !emailValidation(form.email)) {
            setError({
                field: 'email',
                message: 'digite um email válido'
            })
            return false
        }
        if (form.emailValidation !== form.email) {
            setError({
                field: 'emailValidation',
                message: 'os e-mails devem ser iguais'
            })
            return false
        }
        if (!form.password || !nameValidation(form.password)) {
            setError({
                field: 'password',
                message: 'a senha deve conter pelo menos 3 caracters'
            })
            return false
        }
        if (form.passwordValidation !== form.password) {
            setError({
                field: 'passwordValidation',
                message: 'as senhas devem ser iguais'
            })
            return false
        }
        return true
    }

    function signIn(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        setLoad(true)
        if (!formValidation()) {
            setLoad(false)
            return
        }
        const { name, email, password } = form
        api.post('/user/create', { name, email, password })
            .then(() => {
                setRedirect(true)
            })
            .catch(err => {
                console.log(err)
                setLoad(false)
            })
    }
    if (redirect) return <Redirect to="/login" />
    else
        return (
            <div className={classes.root}>
                <div className={classes.paper}>
                    <h1>Fort Brasil</h1>
                    {error.message ? (
                        <div className={classes.error}>{error.message}</div>
                    ) : (
                        ''
                    )}
                    <form className={classes.body} onSubmit={signIn}>
                        <div className={classes.form}>
                            <TextField
                                id="name"
                                label="Nome"
                                error={error.field === 'name'}
                                onChange={e =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                            <TextField
                                id="email"
                                label="Email"
                                error={error.field === 'email'}
                                onChange={e =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                            <TextField
                                id="emailValidation"
                                label="Confirme seu email"
                                error={error.field === 'emailValidation'}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        emailValidation: e.target.value
                                    })
                                }
                            />
                            <TextField
                                id="password"
                                label="Senha"
                                error={error.field === 'password'}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        password: e.target.value
                                    })
                                }
                            />
                            <TextField
                                id="passwordValidation"
                                label="Confirme sua senha"
                                error={error.field === 'passwordValidation'}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        passwordValidation: e.target.value
                                    })
                                }
                            />
                        </div>
                        {load ? (
                            <CircularProgress />
                        ) : (
                            <>
                                <ColoredButton
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    type="submit"
                                >
                                    Resgistar
                                </ColoredButton>
                                <p>
                                    <Link to="/login">voltar para o login</Link>
                                </p>
                            </>
                        )}
                    </form>
                </div>
            </div>
        )
}
