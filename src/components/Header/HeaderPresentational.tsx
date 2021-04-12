import React, { FC } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-router';
import { LocationState } from 'history';
import { AiOutlineClose } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars';
import { DrawerData } from './DrawerData';
import { logout } from '../../redux/actions';

type HeaderPresentationalProps = {
  toggleDrawer: () => void,
  onHeaderItemClick: () => void,
  isAuthenticated: boolean,
  isActive: boolean,
  location: LocationState
}

const HeaderPresentational: FC<HeaderPresentationalProps> = ({
  onHeaderItemClick,
  toggleDrawer,
  isAuthenticated,
  location,
  isActive,
}) => (
  <div>
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className="header">
        <div className="header__left">
          <Link to="#" className="menu-bars">
            <FaBars onClick={toggleDrawer} />
          </Link>
          <div className="header__logo">Brain Trainer Service</div>
        </div>
      </div>
      <nav className={isActive ? 'nav-menu active' : 'nav-menu'}>
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <ul className="nav-menu__items" onClick={toggleDrawer}>
            <li className="navbar-toggler">
              <Link to="#">
                <AiOutlineClose style={{ zIndex: 5 }} />
              </Link>
            </li>
            {DrawerData.filter((item) => item.logged !== !isAuthenticated).map((item, index) => (
                <li
                  key={`${index} ${item.path}`}
                  className={`nav-text`}
                  onClick={item.title === 'Log out' ? onHeaderItemClick : undefined}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active-page' : ''}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </Scrollbars>
      </nav>
    </IconContext.Provider>
  </div>
);

export default React.memo(withRouter(HeaderPresentational));