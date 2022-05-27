import React from 'react';
// Material UI
import CelebrationIcon from '@mui/icons-material/Celebration';
// Router
import { useRouter } from 'next/router';

const EnquiryModal = ({ setIsOpen, Name, id }) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push('/StaysDetails/' + id);
  }

  return (
    <>
      <div className="enquiryModal">
        <div className="enquiryModal-content">
          <h2>Thank you for booking {Name}!</h2>
          <h2><CelebrationIcon/></h2>
          <p className="flexCardtitle">A confirmation e-mail with details has been sent to you</p>
          <button className="button" onClick={handleOnClick}>Return to places</button>
        </div>
      </div>
    </>
  );
};

export default EnquiryModal;