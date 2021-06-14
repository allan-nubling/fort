import { createStyles } from '@material-ui/core'
import theme from './theme'

const styles = createStyles({
    root: {
        display: 'grid',
        gridTemplateAreas: `
            "nav header"
            "nav container"
            "nav footer"
        `,
        gridTemplateColumns: `${theme.navWidht} 1fr`,
        gridTemplateRows: `${theme.headerHeight} 1fr ${theme.footerHeight}`,
        // height: '100vh',
        minHeight: '100vh',
        width: `100%`,
        '@media screen and (max-width: 579px)': {
            gridTemplateAreas: `
                "header"
                "container"
                "footer"
            `,
            gridTemplateColumns: `1fr`,
            gridTemplateRows: `${theme.headerHeight} 1fr ${theme.footerHeight}`
        }
    },
    hideNav: {
        gridTemplateAreas: `
            "header"
            "container"
            "footer"
        `,
        gridTemplateColumns: `1fr`,
        gridTemplateRows: `${theme.headerHeight} 1fr ${theme.footerHeight}`
    },
    container: {
        gridArea: 'container'
    },
    footer: {
        gridArea: 'footer'
    }
})

export default styles
