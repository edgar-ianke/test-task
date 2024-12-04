import React from 'react';
import { AppBar, Tabs, Tab } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <AppBar position="static">
      <Tabs value={location.pathname === '/' ? '/users' : '/'} indicatorColor="secondary" textColor="inherit">
        <Tab label="Главная страница" value="/" component={Link} to="/" />
        <Tab label="Список пользователей" value="/users" component={Link} to="/users" />
      </Tabs>
    </AppBar>
  );
};

export default Header;
