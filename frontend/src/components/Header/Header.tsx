// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from 'react'

import {
    Button,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Paper
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import styles from './styles'

import Auth from '../../services/auth'
import { useUser } from '../../contexts/UserProvider/UserProvider'
import { useAppContext } from '../../contexts/AppProvider/AppProvider'

const useStyles = makeStyles(styles)
export default function Header(): JSX.Element {
    const classes = useStyles()
    const { user } = useUser()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const { nav, setNav } = useAppContext()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Paper elevation={5} className={classes.header}>
            {nav ? (
                ''
            ) : (
                <IconButton
                    onClick={() => {
                        setNav(true)
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}
            <div className={classes.spacer} />
            <div className={classes.user}>
                <Button
                    startIcon={<AccountCircleIcon />}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    {user ? user.name : undefined}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            Auth.clearToken()
                            window.location.reload()
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </Paper>
    )
}
