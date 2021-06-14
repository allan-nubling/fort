import { createStyles } from '@material-ui/core'
import theme from '../../layouts/theme'

const styles = createStyles({
    footer: {
        gridArea: 'footer',
        height: theme.footerHeight,
        textAlign: 'end'
    },
    copy: {
        padding: '0 20px',
        '& a': {
            color: 'inherit !important',
            // 'text-decoration': 'none !important',
            textDecoration: 'none !important'
        }
    }
})

export default styles
