// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from 'react'

// Styles
import { makeStyles } from '@material-ui/core'
import styles from './styles'

import { useAppContext } from '../contexts/AppProvider/AppProvider'

// Components
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import Container from '../components/Container/Container'
import Footer from '../components/Footer/Footer'

const useStyles = makeStyles(styles)

export default function Layout(): JSX.Element {
    const classes = useStyles()
    const { nav } = useAppContext()
    return (
        <div className={classes.root + ` ${nav ? '' : classes.hideNav}`}>
            <Header />
            <Nav />
            <Container />
            <Footer />
        </div>
    )
}
