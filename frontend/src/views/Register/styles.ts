import { createStyles } from '@material-ui/core'
import theme from '../../layouts/theme'

const styles = createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: `100vw`,
        '& h1': {
            textAlign: 'center',
            minWidth: '300px',
            padding: '30px 20px',
            background: theme.accentColor,
            margin: '0 0 10px 0',
            color: 'white'
        }
    },
    paper: {
        overflow: 'hidden',
        borderRadius: '20px',
        paddingBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        minWidth: '300px',
        textAlign: 'center',
        '& .MuiCircularProgress-root': {
            margin: 'auto'
        },
        boxShadow: '1px 1px 5px 5px #313a4647'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: '35px',
        height: '240px'
    },
    body: {
        padding: '0 15px',
        '& button': {
            width: '100%'
        }
    },
    error: {
        color: 'red'
    }
})

export default styles
