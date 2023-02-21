import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { FormattedMessage } from 'react-intl';

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

type PayloadDialog = {
  type: string,
  title: string,
  open: boolean,
  setOpen: (e: boolean) => void,
  deleteCollection: () => void
};

interface DeleteDialogProps {
  payload: PayloadDialog
}

const DeleteDialog = ({ payload }: DeleteDialogProps) => {
  const {
    type, title, open, setOpen, deleteCollection,
  } = payload;
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    deleteCollection();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <FormattedMessage
          id="app.collection.dialog"
          values={{ type, title }}
        />
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>
          <FormattedMessage id="app.collection.dialog.button1" />
        </Button>
        <Button onClick={handleDelete}>
          <FormattedMessage id="app.collection.dialog.button2" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
