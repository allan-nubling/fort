import React, { PropsWithChildren, ReactNode } from 'react'
import { UserProvider } from '../contexts/UserProvider/UserProvider'
import { AppProvider } from '../contexts/AppProvider/AppProvider'

export default function Providers({
    children
}: PropsWithChildren<ReactNode>): JSX.Element {
    return (
        <AppProvider>
            <UserProvider>{children}</UserProvider>
        </AppProvider>
    )
}
