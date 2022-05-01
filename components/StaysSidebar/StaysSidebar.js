import React, { useState } from 'react';
// Material UI
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';


function StaysSidebar() {

  function valuetext(value) {
    return `$ ${value}`;
  }
  const [value, setValue] = useState([500, 8000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <>
      <div className="StaysSidebar">
      <Box sx={{ width: 200 }}>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          className="StaysSidebar-priceSlider"
        />
      </Box>
      </div>
    </>
  )
}

export default StaysSidebar