// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from 'react'
import { LinearProgress, makeStyles } from '@material-ui/core'
import AppRouter from '../../Router/AppRouter'
import { useAppContext } from '../../contexts/AppProvider/AppProvider'
import styles from './styles'

const useStyles = makeStyles(styles)
export default function Container(): JSX.Element {
    const { appLoading } = useAppContext()
    const classes = useStyles()
    return (
        <div className={classes.container}>
            {appLoading && <LinearProgress className={classes.progressBar} />}
            <div className={classes.wrapper}>{<AppRouter />}</div>
        </div>
    )
}
