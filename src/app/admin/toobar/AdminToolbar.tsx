import React, { useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import {
  changeStatusUsers, changeRoleUsers, deleteUsers, getAllUsers, adminReset,
} from '../../../redux/features/adminSlice';
import Spinner from '../../../common/spinner/Spinner';
import toastConfig from '../../../shared/toast/toastConfig';
import routes from '../../../shared/constants/routes';

interface AdminToolbarProps {
  selectedUser: string[];
}

const AdminToolbar = ({ selectedUser }: AdminToolbarProps) => {
  const dispatch = useAppDispatch();
  const {
    actionStatus, action,
  } = useAppSelector((state) => state.admin);

  useEffect(() => {
    if (actionStatus === 'success' && action === 'deleted') {
      toast.success(
        <FormattedMessage
          id="app.admin.action"
          values={{ user: selectedUser, action }}
        />,
        toastConfig,
      );
    }
    if (actionStatus === 'success' && action === 'changed') {
      toast.success(
        <FormattedMessage
          id="app.admin.action2"
          values={{ user: selectedUser, action }}
        />,
        toastConfig,
      );
    }
    dispatch(getAllUsers());
    dispatch(adminReset());
  }, [actionStatus, action]);

  const onHandleDelete = () => {
    dispatch(deleteUsers(selectedUser));
  };

  const onHandleBlock = () => {
    dispatch(changeStatusUsers({ usersId: selectedUser, action: 'block' }));
  };

  const onHandleUnblock = () => {
    dispatch(changeStatusUsers({ usersId: selectedUser, action: 'unblock' }));
  };

  const onHandleRoleAdmin = () => {
    dispatch(changeRoleUsers({ usersId: selectedUser, action: 'admin' }));
  };

  const onHandleRoleUser = () => {
    dispatch(changeRoleUsers({ usersId: selectedUser, action: 'user' }));
  };

  return (
    <>
      <Toolbar
        className={styles.root}
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selectedUser.length > 0 && {
            bgcolor: (theme) => alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
          }),
        }}
      >
        {selectedUser.length > 0 ? (
          <Typography
            className={styles.select}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selectedUser.length === 1 ? selectedUser : selectedUser.length}
            {' '}
            selected
          </Typography>
        ) : (
          <Typography
            className={styles.select}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            USERS
          </Typography>
        )}
        {selectedUser.length > 0 && (
          <>
            {selectedUser.length === 1 && (
              <Link
                to={`${routes.COLLECTIONS}/${selectedUser[0]}`}
                className={styles.link}
              >
                <Tooltip title={<FormattedMessage id="app.item.tooltip.open" />}>
                  <IconButton>
                    <Typography
                      variant="body2"
                      color="initial"
                      className={styles.tooltipButton}
                    >
                      <FormattedMessage id="app.admin.tooltip.manage" />
                    </Typography>
                    <ManageAccountsIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
            <Tooltip title="add admin role">
              <IconButton onClick={onHandleRoleAdmin} id="admin">
                <AdminPanelSettingsIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="add user role">
              <IconButton onClick={onHandleRoleUser} id="user">
                <SupervisorAccountIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={onHandleDelete} id="delete">
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="block">
              <IconButton onClick={onHandleBlock} id="block">
                <BlockIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Unblock">
              <IconButton id="unblock" onClick={onHandleUnblock}>
                <Box
                  component="p"
                  id="unblock"
                  className={styles.btnUnblock}
                >
                  Unblock
                </Box>
              </IconButton>
            </Tooltip>
          </>
        ) }
      </Toolbar>
      { actionStatus === 'loading' && (<Spinner />) }
    </>
  );
};

export default AdminToolbar;
