import React from 'react';
// Material UI
import StarIcon from '@mui/icons-material/Star';
import BookmarkIcon from '@mui/icons-material/Bookmark';
// API
// import { apiURL } from '../../lib/apiURL';

function PopularCards({name, }) {

  console.log(apiCall);

  return (
    <>
      <div className="popularStays">
        <div className="popularStays-cards">
          <div className="popularStays-card">
            <div className="popularStays-card-rating">
              <p><StarIcon/>4.6</p>
            </div>
            <div className="popularStays-card-info">
              <div className="popularStays-card-info-bookmark">
                <BookmarkIcon/>
              </div>
              <div className="popularStays-card-info-text">
                <p className="cardTitle">Name Namerson</p>
                <p><span>250kr</span> /night</p>
              </div>
            </div>
          </div>
        </div>
        <a className="button">Browse All Stays</a>
      </div>
    </>
  )
}

export default PopularCards