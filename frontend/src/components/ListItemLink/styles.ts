import { createStyles } from '@material-ui/core'
import theme from '../../layouts/theme'

const styles = createStyles({
    root: {
        '&:hover': {
            background: theme.accentColor
        }
    },
    listIcon: {
        minWidth: '40px',
        '& .MuiSvgIcon-root': {
            color: 'white'
        }
    }
})

export default styles
