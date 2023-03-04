import React, { useEffect, useState } from 'react';
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
import checkActionAdmin from '../../../shared/utils/checkActionAdmin';
import getStringOfArray from '../../../shared/utils/getStringOfArray';

interface AdminToolbarProps {
  selectedUser: string[];
}

const AdminToolbar = ({ selectedUser }: AdminToolbarProps) => {
  const [currentUserId, setCurrentUserId] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const {
    actionStatus, action, users,
  } = useAppSelector((state) => state.admin);

  useEffect(() => {
    if (actionStatus === 'success' && action === 'deleted') {
      toast.success(
        <FormattedMessage
          id="app.admin.action"
          values={{ id: getStringOfArray(currentUserId), action }}
        />,
        toastConfig,
      );
    }
    if (actionStatus === 'success' && action === 'changed') {
      toast.success(
        <FormattedMessage
          id="app.admin.action2"
          values={{ id: getStringOfArray(currentUserId), action }}
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

  const onHandleStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    const act = e.currentTarget.id;
    const usersId = checkActionAdmin(selectedUser, users, 'status', act);
    setCurrentUserId(usersId);
    if (usersId.length) {
      dispatch(changeStatusUsers({ usersId, action: act }));
    }
  };

  const onHandleRole = (e: React.MouseEvent<HTMLButtonElement>) => {
    const act = e.currentTarget.id;
    const usersId = checkActionAdmin(selectedUser, users, 'role', act);
    setCurrentUserId(usersId);
    if (usersId.length) {
      dispatch(changeRoleUsers({ usersId, action: act }));
    }
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
            <FormattedMessage id="app.admin.selected" />
          </Typography>
        ) : (
          <Typography
            className={styles.select}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            <FormattedMessage id="app.admin.users" />
          </Typography>
        )}
        {selectedUser.length > 0 && (
          <>
            {selectedUser.length === 1 && (
              <Link
                to={`${routes.COLLECTIONS}/${selectedUser[0]}`}
                className={styles.link}
              >
                <Tooltip title={<FormattedMessage id="app.admin.toolbar.manage" />}>
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
            <Tooltip title={<FormattedMessage id="app.admin.toolbar.add" />}>
              <IconButton onClick={onHandleRole} id="admin">
                <AdminPanelSettingsIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title={<FormattedMessage id="app.admin.toolbar.add.user" />}>
              <IconButton onClick={onHandleRole} id="user">
                <SupervisorAccountIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title={<FormattedMessage id="app.admin.toolbar.delete" />}>
              <IconButton onClick={onHandleDelete} id="delete">
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title={<FormattedMessage id="app.admin.toolbar.block" />}>
              <IconButton onClick={onHandleStatus} id="block">
                <BlockIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title={<FormattedMessage id="app.admin.toolbar.unblock" />}>
              <IconButton id="unblock" onClick={onHandleStatus}>
                <Box
                  component="p"
                  id="unblock"
                  className={styles.btnUnblock}
                >
                  <FormattedMessage id="app.admin.unblock" />
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
