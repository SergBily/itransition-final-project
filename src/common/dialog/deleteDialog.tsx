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

interface DeleteDialogProps {
  type: string,
  name: string,
  open: boolean,
  setOpen: (e: boolean) => void
}

const DeleteDialog = ({
  type, name, open, setOpen,
}: DeleteDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    console.log('delete');
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
          values={{ type, name }}
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
