import { createStyles } from '@material-ui/core'
import theme from '../../layouts/theme'

const styles = createStyles({
    nav: {
        gridArea: 'nav',
        background: theme.primaryColor,
        color: 'white',
        padding: '0px 20px',
        height: '100%',
        '@media screen and (max-width: 579px)': {
            position: 'absolute',
            width: theme.navWidht
        }
    },
    hideNav: {
        display: 'none'
    },
    logo: {
        height: theme.headerHeight,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& h2': {
            margin: 'auto'
        },
        '& .MuiIconButton-root': {
            color: 'white'
        }
    }
})

export default styles
