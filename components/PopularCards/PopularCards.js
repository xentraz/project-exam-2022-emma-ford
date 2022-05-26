import React, { useState } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
// Material UI
import StarIcon from '@mui/icons-material/Star';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function PopularCards({
  id,
  Name,
  Price,
  Ratings,
  ImgArray,
  ImgArray: {ImgAlt, ImgUrl},
}) {

  //Reviews 
  const slicedRatings = Ratings.slice(0, 2);

  function sumObjectsByKey(...slicedRatings) {
    return slicedRatings.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k))
          a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
  }
  
  const newStars = sumObjectsByKey(slicedRatings[0], slicedRatings[1]);
  const ratingAverage = (newStars.Star / 2);

  // Image Arrays
  const slicedImgs = ImgArray.slice(0, 1);

  // On click to details page
  const router = useRouter();

  const detailsLink = () => {
    router.push('/StaysDetails/' + id);
  }

  // Bookmark
  const [clicked, setClicked] = useState();
  const toggleClickIcon = () => setClicked(!clicked)

  return (
    <>
      <div className="popularStays-card">
      {slicedImgs.map((elm) => {     
            return (
              <div
                  onClick={detailsLink}
                  key={elm.id}
                  style={{
                    backgroundImage: `url(${elm.ImgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    borderRadius: '$border-radius'
                  }}
                  alt={elm.ImgAlt}
                />
            );
          })}
        <div className="popularStays-card-rating">
          <p><StarIcon/>{ratingAverage}</p>
        </div>
        <div className="popularStays-card-info">
          <div className="popularStays-card-info-bookmark" onClick={toggleClickIcon}>
            {clicked ? <BookmarkIcon /> : <BookmarkBorderIcon /> }
          </div>
          <div className="popularStays-card-info-text">
            <p className="cardTitle">{Name}</p>
            <p className="flexCardtitle"><span>{Price}kr</span> /night</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopularCards;