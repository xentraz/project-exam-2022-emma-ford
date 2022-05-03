// React
import React, { useState } from 'react';
// Material UI
// Price Slider
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
// Checkbox
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// Ratings
import Rating from '@mui/material/Rating';
// Chip / Multiple select
import { useTheme } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

function StaysSidebar() {
  // Price Slider
  function valuetext(value) {
    return `$ ${value}`;
  }
  const [value, setValue] = useState([500, 8000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const marks = [
    {
      value: 500,
      label: '500 Kr',
    },
    {
      value: 8000,
      label: '8000 Kr',
    },
  ];
  

  // Ratings
  const [rating, setRating] = useState(3);

  const handleChange2 = (event2, newValue2) => {
    setRating(newValue2);
  }

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  function getLabelText(rating) {
    return `${rating} Star${rating !== 1 ? 's' : ''}, ${labels[rating]}`;
  }

  // Chips / Multiple select  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const amenities = [
    'Refrigerator',
    'TV',
    'Dishwasher',
    'Iron',
    'Washer',
    'Bathtub',
    'Parking',
    'Fireplace',
    'Heating',
    'Wifi',
    'Dryer',
    'Gym',
    'CoffeeMachine',
    'Pool',
    'Microwave',
    'Spa',
    'Breakfast',
    'Lift',
    'Laundry',
    'Cleaning',
  ];

  const initialSelected = ["TV", "Wifi", "Breakfast"];
  const theme = useTheme();
  const [selectAmenities, setSelectAmenities] = useState(initialSelected);

  const handleChange3 = (event) => {
    const {
      target: { value },
    } = event;
    setSelectAmenities(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <div className="staysSidebar">
        <div className="staysSidebar-price">
          <p className="sidebarTitle">Price</p>
          <Box sx={{ width: 200 }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={value}
              min={500}
              max={8000}
              defaultValue={1500}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              marks={marks}
              className="staysSidebar-price-slider"
            />
          </Box>
        </div>
        <div className="staysSidebar-type">
          <p className="sidebarTitle">Type of place</p>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Hotel Room" />
            <FormControlLabel control={<Checkbox />} label="Apartment" />
            <FormControlLabel control={<Checkbox />} label="Cabin" />
            <FormControlLabel control={<Checkbox />} label="Hostel" />
          </FormGroup>
        </div>
        <div className="staysSidebar-ratings">
          <p className="sidebarTitle">Ratings</p>
          <Rating
            name="simple-controlled"
            value={rating}
            defaultValue={3} 
            precision={0.5}
            getLabelText={getLabelText}
            onChange={handleChange2}
          />
        </div>
        <div className="staysSidebar-amenities">
          <p className="sidebarTitle">Amenities</p>
        <FormControl sx={{ m: 1, width: 300 }}>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectAmenities}
              onChange={handleChange3}
              input={<Input id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {amenities.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  )
}

export default StaysSidebar



 // const amenities = [
  //   { key: 0, label: 'Refrigerator' },
  //   { key: 1, label: 'TV' },
  //   { key: 2, label: 'Dishwasher' },
  //   { key: 3, label: 'Iron' },
  //   { key: 4, label: 'Washer' },
  //   { key: 5, label: 'Bathtub' },
  //   { key: 6, label: 'Parking' },
  //   { key: 7, label: 'Fireplace' },
  //   { key: 8, label: 'Heating' },
  //   { key: 9, label: 'Wifi' },
  //   { key: 10, label: 'Dryer' },
  //   { key: 11, label: 'Gym' },
  //   { key: 12, label: 'CoffeeMachine' },
  //   { key: 13, label: 'Pool' },
  //   { key: 14, label: 'Microwave' },
  //   { key: 15, label: 'Spa' },
  //   { key: 16, label: 'Breakfast' },
  //   { key: 17, label: 'Lift' },
  //   { key: 18, label: 'Laundry' },
  //   { key: 19, label: 'Cleaning' },
  // ];