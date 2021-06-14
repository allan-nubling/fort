import React, {
    createContext,
    PropsWithChildren,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'
import api from '../../services/api'
import Auth from '../../services/auth'

interface IUser {
    id: number
    name: string
    email: string
}

interface IUserContext {
    user?: IUser
    setUser: (user: IUser) => void
    load: boolean
}

const UserContext = createContext({} as IUserContext)

export function UserProvider({
    children
}: PropsWithChildren<ReactNode>): JSX.Element {
    const [user, setUser] = useState<IUser>()
    const [load, setLoad] = useState(true)

    useEffect(() => {
        if (Auth.getToken())
            api.get('/user')
                .then(({ data }) => {
                    setUser(data.user)
                })
                .catch(console.error)
                .finally(() => {
                    setLoad(false)
                })
        else {
            setLoad(false)
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, load }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): IUserContext => useContext(UserContext)
