import React from 'react'

// Icons
import HomeIcon from '@material-ui/icons/Home'

// Views
import Home from '../views/Home/Home'

export interface IRoute {
    path: string
    name: string
    icon: React.ReactElement
    component: React.FC
}

export const listedRoutes: IRoute[] = [
    {
        path: '/home',
        name: 'Home',
        icon: <HomeIcon />,
        component: Home
    }
]
