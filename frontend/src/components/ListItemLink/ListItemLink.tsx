/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps
} from 'react-router-dom'
import { Omit } from '@material-ui/types'
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from '@material-ui/core'
import styles from './styles'

interface ListItemLinkProps {
    icon?: React.ReactElement
    primary: string
    to: string
}

const useStyles = makeStyles(styles)
function ListItemLink(props: ListItemLinkProps): JSX.Element {
    const classes = useStyles()
    const { icon, primary, to } = props

    const renderLink = React.useMemo(
        () =>
            // eslint-disable-next-line react/display-name
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
                (itemProps, ref) => (
                    <RouterLink to={to} ref={ref} {...itemProps} />
                )
            ),
        [to]
    )

    return (
        <li>
            <ListItem className={classes.root} button component={renderLink}>
                {icon ? (
                    <ListItemIcon className={classes.listIcon}>
                        {icon}
                    </ListItemIcon>
                ) : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    )
}

export default ListItemLink
