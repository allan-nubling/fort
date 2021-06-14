import { createStyles } from '@material-ui/core'
// import theme from './theme';

const styles = createStyles({
    container: {
        gridArea: 'container',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    },
    progressBar: {
        width: '100%'
    },
    wrapper: {
        height: '100%',
        width: '100%'
    }
})

export default styles
