import React, { useState } from 'react';
import { useRouter } from 'next/router';
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
  JWT,
}) {
 // Checkmark
 const [clicked, setClicked] = useState();
 const toggleClickIcon = () => setClicked(!clicked);

   // Delete
   const Router = useRouter();

  return (
    <>
      <tbody>
        <tr>
          <td><p>{id}</p></td>
          <td><p>{Email}</p></td>
          <td><p>{Subject}</p></td>
          <td><p>{Message}</p></td>
          <td>
            <p className="center">
              <DeleteForeverIcon 
              onClick={() => {
                let deleteWarning = confirm(
                  `Are you sure you want to delete this Enquiry?
                  This action cannot be undone.
                  `
                );

                if (deleteWarning) {
                  async function deleteThing() {
                    let { data } = await axios.delete(
                      `${messagesUrl}/${id}`,
                      {
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${JWT}`,
                        },
                      }
                    );
                    Router.replace(Router.asPath);
                  }
                  deleteThing();
                }
              }}
              />
            </p>
          </td>
          <td><p className="center" onClick={toggleClickIcon} >{clicked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon/> }</p></td>
        </tr>
      </tbody>
    </>
  )
}

export default MessagesTable