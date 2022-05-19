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
        {
          Price === 1 ? <p>$</p> 
          : Price === 2 ? <p>$$</p>
          : Price === 3 ? <p>$$$</p>
          : Price === 4 ? <p>$$$$</p>
          : Price === 5 ? <p>$$$$$</p>
          : ''
    }
      </div>
    </div>
  </>
  )
}

export default ThingsToDoCards;

