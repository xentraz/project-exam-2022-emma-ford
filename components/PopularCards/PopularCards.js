import React from 'react';
// Material UI
import StarIcon from '@mui/icons-material/Star';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function PopularCards() {
  return (
    <>
      <div className="popularStays">
        <h2>Popular Stays</h2>
        <p>lorem ipsum dolor sit am</p>
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
        <button>Browse All Stays</button>
      </div>
    </>
  )
}

export default PopularCards