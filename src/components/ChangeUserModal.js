import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useRootContext from '../store/useRootContext';

export default function AddShelfModal() {
  const { layoutContext, adminContext, catalogContext } = useRootContext();
  const { dispatch: layoutDispatch } = layoutContext;
  const { dispatch: adminDispatch } = adminContext;
  const { dispatch: catalogDispatch } = catalogContext;

  const [inputName, setInputName] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClose = React.useCallback(() => {
    layoutDispatch({
      type: "setChangeUserModalOpen",
      changeUserModalOpen: false
    })
  }, [layoutDispatch]);

  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();


    catalogDispatch({
        type: "resetState"
    });

    adminDispatch({
      type: "setUser",
      user: inputName
    });

  }, [adminDispatch, inputName, catalogDispatch])

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={layoutContext.changeUserModalOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Change User"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <Input
              inputProps={{
                'data-testid': 'change-user',
              }}
              variant="outlined"
              value={inputName}
              onChange={evt => setInputName(evt.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ marginLeft: '1rem' }}
            >
              Submit
            </Button>
          </form>
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
