import React, { ReactElement } from 'react';
import { FaBrain } from 'react-icons/fa';
import { AiFillHome, AiOutlineForm } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { GoSignIn, GoSignOut } from 'react-icons/go';

type drawerElementType = {
  title: string,
  path: string,
  icon: ReactElement,
  logged?: boolean
}

export const DrawerData: Array<drawerElementType> = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
  },
  {
    title: 'Profile',
    path: '/profiles/me',
    icon: <ImProfile />,
    logged: true,
  },
  {
    title: 'KenKen',
    path: '/kenken',
    icon: <FaBrain />,
    logged: true,
  },
  {
    title: 'Log out',
    path: '/sign-in',
    icon: <GoSignOut />,
    logged: true,
  },
  {
    title: 'Sign In',
    path: '/sign-in',
    icon: <GoSignIn />,
    logged: false,
  },
  {
    title: 'Sign Up',
    path: '/sign-up',
    icon: <AiOutlineForm />,
    logged: false,
  },
];