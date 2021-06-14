import { Button, withStyles } from '@material-ui/core'
import theme from '../../layouts/theme'

const ColoredButton = withStyles({
    root: {
        color: 'white',
        backgroundColor: theme.primaryColor,
        '&:hover': {
            backgroundColor: theme.accentColor
        }
    }
})(Button)

export default ColoredButton
