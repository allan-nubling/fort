import React, {
    createContext,
    PropsWithChildren,
    ReactNode,
    useContext,
    useState
} from 'react'

interface IAppContext {
    appLoading: boolean
    setAppLoading: (appLoading: boolean) => void | boolean
    nav: boolean
    setNav: (nav: boolean) => void | boolean
}

const AppContext = createContext({} as IAppContext)

export function AppProvider({
    children
}: PropsWithChildren<ReactNode>): JSX.Element {
    const [appLoading, setAppLoading] = useState(false)
    const [nav, setNav] = useState(true)

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 579 && nav === true) setNav(false)
        else if (window.innerWidth > 579 && nav === false) setNav(true)
    })

    return (
        <AppContext.Provider
            value={{
                appLoading,
                setAppLoading,
                nav,
                setNav
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = (): IAppContext => useContext(AppContext)
