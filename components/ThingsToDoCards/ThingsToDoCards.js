import React from "react";

function ThingsToDoCards({
  id,
  Name,
  Price,
  ImgUrl,
  ImgAlt,
}){

  return (
    <>
      <div 
      id={id}
      className="TTD_cards"
      style={{
        backgroundImage: `url(${ImgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      }}
      alt={ImgAlt}
      >
      <div className="TTD_cards-header">
        <p className="cardTitle todoTitle">{Name}</p>
      </div>
      <div className="TTD_cards-price">
      <p> {
          Price === 1 ? <span>$</span>
          : Price === 2 ? <span>$$</span>
          : Price === 3 ? <span>$$$</span>
          : Price === 4 ? <span>$$$$</span>
          : Price === 5 ? <span>$$$$$</span>
          : ''
          }
        </p>
      </div>
    </div>
  </>
  )
}

export default ThingsToDoCards;

