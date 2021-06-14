import { createStyles } from '@material-ui/core'

const styles = createStyles({
    root: {
        margin: '20px 0',
        padding: '5px 10px 10px'
    },
    form: {
        display: 'flex',
        '& > *': {
            margin: '5px'
        }
    },
    nameField: {
        flexGrow: 1
    },
    select: {
        width: '100px'
    }
})

export default styles
