import React, { TouchEvent, useEffect, useRef, useState } from 'react';
// Material UI
import { PlayDisabledOutlined } from '@mui/icons-material';
// Price Slider
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
// Checkbox
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// Ratings
import Rating from '@mui/material/Rating';
// Components
import Filter from '../Filter/Filter';
import StaysCards from '../StaysCards/StaysCards';

function Search({
  places,
  prompt,
  searchValue,
  onChange,
  handleOnSearch,
}) {
  console.log(places);
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

  // Multiple Select

  // Accessibility
  const [ariaFocusMessage, setAriaFocusMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onFocus = ({ focused, isDisabled }) => {
    const msg = `You are currently focused on option ${focused.label}${
      isDisabled ? ', disabled' : ''
    }`;
    setAriaFocusMessage(msg);
    return msg;
  };

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  // Multiple Select Filter
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);
  const [filters, setFilters] = useState({});

  // Dropdown Select

  // Search
  useEffect(() => {
    ['click', 'touchend'].forEach((e) => {
      document.addEventListener(e, toggle);
    });

    return () =>
      ['click', 'touchend'].forEach((e) => {
        document.addEventListener(e, toggle);
      });
  });

  function toggle(e) {
    setOpen(e && e.target === ref.current);
  }

  function filterPlaces(places) {
    return places.filter(
      (place) =>
        place.Name.toLowerCase().indexOf(query.toLocaleLowerCase()) > -1
    );
  }

  function displayValue() {
    if (query.length > 0) return query;
    if (searchValue) return searchValue.title;
    return '';
  }

   // MultiSelect Style Style
  const sideBarStyles = {
    control: (styles, { isDisabled, isFocused, isSelected }) => ({ 
      ...styles, 
      backgroundColor: '#547e77',
      border: 
      isDisabled ? '1px solid #2e2e2e'
        : isFocused ? '1px solid #2e2e2e' 
        : isSelected ? '1px solid #2e2e2e'
        : '1px solid #2e2e2e',
      padding: '5px',
     }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: 
        isDisabled ? '#2e2e2e'
        : isFocused ? '#151515' 
        : isSelected ? '#2e2e2e'
        : '#2e2e2e',
        color: '#fff',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
    multiValue: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: '#2e2e2e',
      };
    },
    multiValueLabel: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: '#ffffff',
        fontSize: '16px',
      };
    },
    dropdownIndicator: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: '#ffffff',
        backgroundColor: '#2e2e2e',
        margin: '5px',
        cursor : 'pointer',
      };
    },
    clearIndicator: (styles, { isDisabled, isFocused, isSelected, Hover }) => {
      return {
        ...styles,
        color: '#ffffff',
        backgroundColor: '#a13b2f',
        cursor : 'pointer',
      };
    },
    indicatorSeparator: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        display: 'none'
      };
    },
    noOptionsMessage: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: '#ffffff',
        backgroundColor:
        isDisabled ? '#2e2e2e'
        : isFocused ? '#2e2e2e' 
        : isSelected ? '#2e2e2e'
        : '#2e2e2e',
      };
    },
    menu: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: '#ffffff',
        backgroundColor:
        isDisabled ? '#2e2e2e'
        : isFocused ? '#2e2e2e' 
        : isSelected ? '#2e2e2e'
        : '#2e2e2e',
      };
    },
    placeholder: (styles) => {
      return {
        ...styles,
        color: '#ffffff',
      };
    },
    multiValueRemove: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: 
      isDisabled ? '#ffffff'
      : isFocused ? '#a13b2f' 
      : isSelected ? '#a13b2f'
      : '#ffffff',
      ':hover': {
        backgroundColor: '#2e2e2e',
        color: '#a13b2f',
      },
    }),
  };

  return (
    <>
      <div className="staysLayout">
        <div className="staysHeader">
          <div className="staysHeader-heading">
            <h2>Places to stay</h2>
          </div>
          {/* Search */}
          <div className="staysHeader-search">
            <label className="flexCardtitle" htmlFor='searchBar'>Search..</label>
            <input
              type='text'
              name='searchBar'
              id='searchBar'
              autoComplete='off'
              ref={ref}
              placeholder={searchValue ? searchValue.title : prompt}
              value={displayValue()}
              onChange={(e) => {
                setQuery(e.target.value);
                onChange(null);
              }}
              onClick={toggle}
              onTouchEnd={toggle}
              className='searchBar regularInput'
            />
          </div>
        </div>
        {/* Sidebar */}
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
            <form>
              <label className="sidebarTitle">Amenities</label>
              {!!ariaFocusMessage && !!isMenuOpen && (
                <p>{ariaFocusMessage}</p>
              )}
              <Filter
                ref={ref}
                selectOptions={[
                  {value: 'Refrigerator', label: 'Refrigerator'},
                  {value: 'TV', label: 'TV'},
                  {value: 'Dishwasher', label: 'Dishwasher'},
                  {value: 'Iron', label: 'Iron'},
                  {value: 'Washer', label: 'Washer'},
                  {value: 'Bathtub', label: 'Bathtub'},
                  {value: 'Parking', label: 'Parking'},
                  {value: 'Fireplace', label: 'Fireplace'},
                  {value: 'Heating', label: 'Heating'},
                  {value: 'Wifi', label: 'Wifi'},
                  {value: 'Dryer', label: 'Dryer'},
                  {value: 'Gym', label: 'Gym'},
                  {value: 'CoffeeMachine', label: 'CoffeeMachine'},
                  {value: 'Pool', label: 'Pool'},
                  {value: 'Microwave', label: 'Microwave'},
                  {value: 'Spa', label: 'Spa'},
                  {value: 'Breakfast', label: 'Breakfast'},
                  {value: 'Lift', label: 'Lift'},
                  {value: 'Laundry', label: 'Laundry'},
                  {value: 'Cleaning', label: 'Cleaning'},
                ]}
                placeholderText={'Select amenities'}
                isMulti={true}
                styles={sideBarStyles}
                // handleOnChange={(value) => {
                //   if(value === places.Amenities) {
                //     setFilters({...filters, Amenities: true});
                    
                //   }
                  
                //   const Amenities = value.map((val) => {
                //     if (filters) {
                //       console.log('value', val.value);
                //     }
                //     setFilters({ ...filters, [val.value]: true });
                //     console.log('filters', filters);
                    
                //   });
                //   console.log('Amenities Array', Amenities);
                // }}
                handleOnMessage={onFocus}
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuClose}
              />
            </form>
            {/* <button
                className='button'
                onClick={() => {
                  handleOnSearch(filterPlaces);
                }}
              >
                Filter
              </button>
              <button
                className='button'
                onClick={() => {
                  setQuery('');
                  onChange(null);
                  displayValue();
                }}
              >
                Clear
            </button> */}
          </div>
        </div>
        {/* Results */}
        <div className="resultsContainer">
            {filterPlaces(places).map((
              {
                id, 
                Name, 
                Price, 
                About, 
                Location, 
                Ratings,
                ImgArray,
                Size,
                Amenities,
                RoomDetails,
                Type,
              }
            ) =>  {
              return (
              <StaysCards 
                id={id}
                key={id}
                Name={Name}
                About={About}
                Price={Price}
                Location={Location}
                Ratings={Ratings}
                ImgArray={ImgArray}
                Size={Size}
                Amenities={Amenities}
                RoomDetails={RoomDetails}
                Type={Type}
              />
              );
              }
            )}
        </div>
      </div>
    </>
  )
}

export default Search