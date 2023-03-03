import React, { useState } from 'react';
import {
  Toolbar, Typography, useMediaQuery, IconButton,
  MenuItem, Menu, Box, AppBar,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import logo from '../../assets/logo/logo.png';
import SearchField from './SearchField';
import LanguageSwitch from './LangugeSwitch';
import ThemeSwitch from './ThemeSwitch';
import generateKey from '../../shared/utils/UniqueKey';
import routes from '../../shared/constants/routes';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/hooks';
import { logout, resetStateUser } from '../../redux/features/authSlice';
import { selectUser } from '../../redux/selectors/authSelectors';
import removeUserData from '../../shared/utils/removeUserData';

const Header: React.FC = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const { token, name, role } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCollection = () => {
    handleMenuClose();
    navigate(routes.COLLECTIONS);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    removeUserData();
    dispatch(resetStateUser());
    navigate(routes.HOME);
  };

  const MediaQuery = {
    'max.768': useMediaQuery('(max-width:768px)'),
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {token ? (
        [
          <MenuItem onClick={handleCollection} key={generateKey()}>
            <FormattedMessage id="app.header.collect" />
          </MenuItem>,
          <Box component="div" key={generateKey()}>
            { role === 'admin' && (
            <Link
              to={routes.ADMIN}
              style={{ textDecoration: 'none', color: '#000' }}
            >
              <MenuItem onClick={handleCollection}>
                <FormattedMessage id="app.header.admin" />
              </MenuItem>
            </Link>
            )}
          </Box>,
          <MenuItem onClick={handleLogout} key={generateKey()}>
            <FormattedMessage id="app.header.logout" />
          </MenuItem>,
        ]
      )
        : (
          [
            <Link
              to={routes.LOGIN}
              key={generateKey()}
              style={{ textDecoration: 'none', color: '#000' }}
            >
              <MenuItem onClick={handleMenuClose}>
                <FormattedMessage id="app.header.login" />
              </MenuItem>
            </Link>,
            <Link
              to={routes.SIGNUP}
              key={generateKey()}
              style={{ textDecoration: 'none', color: '#000' }}
            >
              <MenuItem onClick={handleMenuClose}>
                <FormattedMessage id="app.header.signup" />
              </MenuItem>
            </Link>,
          ]
        )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <ThemeSwitch />
      </MenuItem>
      <MenuItem>
        <LanguageSwitch />
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {!!token && (
        <Typography variant="body1">
          {name}
        </Typography>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          flexGrow: 1,
          backgroundColor:
          'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Link to="/">
            <img
              src={logo}
              width={MediaQuery['max.768'] ? '90' : '110'}
              height={MediaQuery['max.768'] ? '90' : '110'}
              alt="Logotype"
            />
          </Link>
          <SearchField />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', gap: '20px' } }}>
            <ThemeSwitch />
            <LanguageSwitch />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ gap: '10px' }}
            >
              <AccountCircle />
              {!!token && (
              <Typography variant="body1">
                {name}
              </Typography>
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
