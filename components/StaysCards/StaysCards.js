import React from 'react';
// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalUnstyled from '@mui/material/Modal';

function StaysCards() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="staysContainer">
        <div 
        className="staysContainer-cards"
        onClick={handleOpen}>
        
        </div>
        <ModalUnstyled
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title NEEDED"
        aria-describedby="modal-modal-description NEEDED"
        disableEnforceFocus
        className="staysContainer-modal"
        >
          <Box className="staysContainer-modal-content NEEDED">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description NEEDED" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </ModalUnstyled>
      </div>
    </>
  )
}

export default StaysCards