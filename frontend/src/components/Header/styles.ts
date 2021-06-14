import { createStyles } from '@material-ui/core'
// import theme from '../../layouts/theme';

const styles = createStyles({
    header: {
        gridArea: 'header',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '20px',
        '& h2': {
            padding: '0 20px'
        },
        '& .MuiIconButton-root': {
            color: 'black'
        }
    },
    user: {
        padding: '0 20px'
    },
    spacer: {
        flexGrow: 3
    }
})

export default styles
