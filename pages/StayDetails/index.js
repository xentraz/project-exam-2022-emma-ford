// React
import React, { useEffect, useState } from 'react';
// API CALL
import { apiURL } from '../../lib/apiURL';
import { apiCall } from '../../lib/apiCall';

export async function getStaticProps() {
  const staysArray = await fetch(apiCall);
  // const data = await staysArray.json();
  
  return {
    props: { stays: staysArray},
  };
}

const Results = ({ stays }) => {
  const [searchValue, setSearchValue] = useState(null);

  return (
    <>
      <p>Something</p>
    </>
  ) 
}

export default Results;