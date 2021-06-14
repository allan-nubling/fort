import { createStyles } from '@material-ui/core'

const styles = createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px 0'
    },
    paper: {
        width: 400,
        padding: '20px'
    },
    form: {
        '& > *': {
            margin: '10px'
        }
    },
    nameField: {
        flexGrow: 1
    },
    select: {
        width: '100px'
    },
    error: {
        color: 'red'
    },
    closePlaceHolder: {
        position: 'relative'
        // width: '100%'
    },
    closeButton: {
        position: 'absolute',
        right: -20,
        top: -20
    }
})

export default styles
