import React, { FormEvent, useState } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import ColoredButton from '../../components/ColoredButton'
import { CircularProgress, makeStyles, TextField } from '@material-ui/core'
import styles from './styles'

import api from '../../services/api'
import Auth from '../../services/auth'
import { useUser } from '../../contexts/UserProvider/UserProvider'

const useStyles = makeStyles(styles)
export default function Login(): JSX.Element {
    const classes = useStyles()
    const [email, setEmail] = useState(String)
    const [password, setPassword] = useState(String)
    const [redirect, setRedirect] = useState(false)
    const [load, setLoad] = useState(false)
    const [error, setError] = useState({
        emailError: false,
        passwordError: false,
        message: ''
    })
    const { setUser } = useUser()

    function signIn(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        setLoad(true)
        if (!email.trim()) {
            setError({
                emailError: true,
                passwordError: false,
                message: 'Digite um email valido!'
            })
            setLoad(false)
        } else if (!password.trim()) {
            setError({
                emailError: false,
                passwordError: true,
                message: 'Digite uma senha valida!'
            })
            setLoad(false)
        } else {
            api.post('/login', { email, password })
                .then(({ data }) => {
                    Auth.setToken(data.token)
                    setUser({
                        id: data.user.id,
                        name: data.user.username,
                        email: data.user.email
                    })
                    setRedirect(true)
                })
                .catch(err => {
                    if (err.response?.status === 404) {
                        setError({
                            emailError: true,
                            passwordError: true,
                            message: 'Por favor verifique suas credenciais.'
                        })
                    } else {
                        setError({
                            emailError: true,
                            passwordError: true,
                            message: 'Não foi possivel realizar a conexão.'
                        })
                    }
                    setLoad(false)
                })
        }
    }
    if (redirect) return <Redirect to="/" />
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
                                id="email"
                                label="Email"
                                error={error.emailError}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                id="password"
                                label="Senha"
                                type="password"
                                error={error.passwordError}
                                onChange={e => setPassword(e.target.value)}
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
                                    Entrar
                                </ColoredButton>
                                <p>
                                    <Link to="/register">registrar</Link>
                                </p>
                            </>
                        )}
                    </form>
                </div>
            </div>
        )
}
