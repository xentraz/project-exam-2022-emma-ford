import React, { useState } from 'react';
// Axios
const axios = require('axios').default;
// API
import { messagesUrl } from '../../lib/apiURL';
// Material UI
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// API
export const getStaticProps = async () => {
  const res = await getAPI(messagesUrl);
  const data = await res.json();

  return {
    props: { messages: data },
  };
};

function MessagesTable({
  id,
  Email,
  Subject,
  Message,
}) {
 // Checkmark
 const [clicked, setClicked] = useState();
 const toggleClickIcon = () => setClicked(!clicked)

  return (
    <>
      <tbody>
        <tr>
          <td><p>{id}</p></td>
          <td><p>{Email}</p></td>
          <td><p>{Subject}</p></td>
          <td><p>{Message}</p></td>
          <td><p className="center"><DeleteForeverIcon/></p></td>
          <td><p className="center" onClick={toggleClickIcon} >{clicked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon/> }</p></td>
        </tr>
      </tbody>
    </>
  )
}

export default MessagesTable