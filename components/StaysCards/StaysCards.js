import React, { useState } from 'react';
// Material UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModalUnstyled from '@mui/material/Modal';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function StaysCards() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [clicked, setClicked] = useState();
  const toggleClickIcon = () => setClicked(!clicked)

  return (
    <>
      <div className="staysContainer">
        <div className="staysContainer-cards">
          <div className="staysContainer-cards-price">
            <p><span>250 kr </span>/ night</p>
          </div>
          <div className="staysContainer-cards-bookmark" onClick={toggleClickIcon}>
            {clicked ? <BookmarkIcon /> : <BookmarkBorderIcon /> }
          </div>
          <div className="staysContainer-cards-content" onClick={handleOpen}>
            <div className="staysContainer-cards-content-imgs">
              <div className="staysContainer-cards-content-imgs-1"></div>
              <div className="staysContainer-cards-content-imgs-2"></div>
              <div className="staysContainer-cards-content-imgs-3">
                <div className="staysContainer-cards-content-imgs-3-blur">
                  <p>+5</p>
                </div>
              </div>
            </div>
            <div className="staysContainer-cards-content-info">
              
            </div>
          </div>
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