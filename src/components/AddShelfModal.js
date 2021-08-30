

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useRootContext from '../store/useRootContext';
import AddShelfForm from './AddShelfForm';

export default function AddShelfModal({records}) {
  const { layoutContext, catalogContext } = useRootContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClose = () => {
    layoutContext.dispatch({
      type: "setAddShelfModalOpen",
      addShelfModalOpen: false
    })
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={layoutContext.addShelfModalOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Press the button below to add a shelf"}</DialogTitle>
        <DialogContent>
          <AddShelfForm records={records} dispatch={catalogContext.dispatch} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
