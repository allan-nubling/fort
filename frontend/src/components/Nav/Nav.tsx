import React from 'react'
import { Divider, IconButton, Link, List, makeStyles } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import styles from './styles'
import ListItemLink from '../ListItemLink/ListItemLink'
import { useRouteMatch } from 'react-router'
import { IRoute, listedRoutes } from '../../Router/RoutesList'
import { useAppContext } from '../../contexts/AppProvider/AppProvider'

const useStyles = makeStyles(styles)
export default function Nav(): JSX.Element {
    const classes = useStyles()
    const match = useRouteMatch()
    const routes = listedRoutes
    const { nav, setNav } = useAppContext()

    return (
        <div className={classes.nav + ` ${nav ? '' : classes.hideNav}`}>
            <div className={classes.logo}>
                <Link href="/" color="inherit" underline="none">
                    <h2>FortBrasil</h2>
                </Link>
                {nav ? (
                    <IconButton
                        onClick={() => {
                            setNav(!nav)
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                ) : (
                    ''
                )}
            </div>
            <Divider light={true} />
            <List>
                {routes.map((route: IRoute) => (
                    <ListItemLink
                        to={match.path + route.path}
                        primary={route.name}
                        icon={route.icon}
                        key={route.path}
                    />
                ))}
            </List>
        </div>
    )
}
