import React, { useState } from 'react';
// Axios
const axios = require('axios').default;
// API
import { enquiresUrl } from '../../lib/apiURL';
// Material UI
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// API
export const getStaticProps = async () => {
  const res = await getAPI(enquiresUrl);
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
  // Checkmark
  const [clicked, setClicked] = useState();
  const toggleClickIcon = () => setClicked(!clicked)

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
        <td><p className="center"><DeleteForeverIcon/></p></td>
        <td><p className="center" onClick={toggleClickIcon} >{clicked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon/> }</p></td>
      </tr>
    </tbody>
    </>
  )
}

export default EnquiriesTable;