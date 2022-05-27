import React, { useState } from 'react';
import { useRouter } from 'next/router';
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
    JWT,
  }
  ) {
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
        <td><p>{firstName}</p></td>
        <td><p>{Surname}</p></td>
        <td><p>{Message}</p></td>
        <td><p>{Guests}</p></td>
        <td><p>{Number}</p></td>
        <td><p>{DOB}</p></td>
        <td>
          <p className="center">
            <DeleteForeverIcon 
            onClick={() => {
              let deleteWarning = confirm(
                `Are you sure you want to delete this Message?
                This action cannot be undone.
                `
              );

              if (deleteWarning) {
                async function deleteThing() {
                  let { data } = await axios.delete(
                    `${enquiresUrl}/${id}`,
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

export default EnquiriesTable;