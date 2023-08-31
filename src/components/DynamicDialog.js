import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const DynamicDialog = ({ open, onClose, dialogContent, onCloseWithData }) => {
  const handleClose = () => {
    onClose();
    onCloseWithData("Data sent from dialog");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Dynamic Dialog</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicDialog;
