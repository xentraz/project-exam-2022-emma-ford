import React from 'react';
// Axios
const axios = require('axios').default;

// API
export const getStaticProps = async () => {
  const res = await getAPI('http://localhost:1337/enquires');
  const data = await res.json();

  return {
    props: { enquires: data },
  };
};

function EnquiriesTable(
  {
    id, 
    firstName, 
    Surname, 
    Message, 
    Guests, 
    Number,
    DOB,
  }
  ) {

  return (
    <>
    <tbody>
      <tr>
        <td><p>{id}</p></td>
        <td><p>{firstName}</p></td>
        <td><p>{Surname}</p></td>
        <td><p>{Message}</p></td>
        <td><p>{Guests}</p></td>
        <td><p>{Number}</p></td>
        <td><p>{DOB}</p></td>
      </tr>
    </tbody>
    </>
  )
}

export default EnquiriesTable;