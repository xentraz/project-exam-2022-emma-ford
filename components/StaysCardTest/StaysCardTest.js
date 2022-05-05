import React, { useEffect, useState } from 'react';

import { apiCall } from '../lib/const';
import { getStays } from '../lib/api';

function FeaturedCards() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const feauturedArray = await getStays(apiCall);

      const shuffledFeatured = feauturedArray.sort(
        (a, b) => 0.5 - Math.random()
      );

      setData(shuffledFeatured);
    })();
  }, []);

  const featuredSortedArray = [];

  if (data) {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.isFeatured) {
        featuredSortedArray.push(element);
        count++;
      }
      if (count === 2) {
        break;
      }
    }
  }

  return (
    <>
      {data
        ? featuredSortedArray.map((elm) => {
            return (
              <></>
              // <Homecards
              //   key={elm.id}
              //   title={elm.title}
              //   heroImg={elm.heroImg}
              //   short_description={elm.short_description}
              //   price={elm.price}
              //   id={elm.id}
              // />
            );
          })
        : 'Loading...'}
    </>
  );
}

export default FeaturedCards;
