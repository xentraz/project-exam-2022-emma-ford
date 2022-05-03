import React, { useState } from 'react';
// Material UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModalUnstyled from '@mui/material/Modal';
// Material UI Icons
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KingBedIcon from '@mui/icons-material/KingBed';
import ShowerIcon from '@mui/icons-material/Shower';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';

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
              <p className="flexCardtitle">Hotel Name</p>
              <p><LocationOnIcon/> Location, Bergen</p>
              <p><StarIcon/><span> 4.5</span>(12 reviews)</p>
              <p><RestaurantIcon/> Breakfast Included</p>
              <div className="staysContainer-cards-content-info-icons">
                <KingBedIcon/> <p>1</p>
                <ShowerIcon/> <p> 1</p>
                <SignalWifiStatusbar4BarIcon/> <p> Free WiFi</p>
              </div>
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
            <p className="flexCardtitle large" id="modal-modal-title">
              Hotel Name
            </p>
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