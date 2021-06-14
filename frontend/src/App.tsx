// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React from 'react'
import Router from './Router/Router'
import Providers from './services/Providers'

function App(): JSX.Element {
    return (
        <Providers>
            <Router />
        </Providers>
    )
}

export default App
