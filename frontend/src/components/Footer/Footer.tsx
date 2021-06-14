import React from 'react'
import { makeStyles } from '@material-ui/core'
import styles from './styles'

const useStyles = makeStyles(styles)
export default function Footer(): JSX.Element {
    const classes = useStyles()
    return (
        <div className={classes.footer}>
            <div className={classes.copy}>
                &copy; {new Date().getFullYear()}{' '}
                <a href="https://github.com/allan-nubling" target="blank">
                    Allan Nubling
                </a>
            </div>
        </div>
    )
}
