// React
import React from 'react';
import { useState } from 'react';
// Mantine
import { DateRangePicker } from '@mantine/dates';
// Multi Select
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'


function HeroIndex() {
  const [value, setValue] = useState("");

  const handleOnchange = (val) => setValue(val);

  const options = [
    { label: "1 Adult(s)", value: "1 Adult" },
    { label: "2 Adult(s)", value: "2 Adults" },
    { label: "3 Adult(s)", value: "3 Adults" },
    { label: "4 Adult(s)", value: "4 Adults" },
    { label: "1 Child(ren)", value: "1 Child" },
    { label: "2 Child(ren)", value: "2 Children" },
    { label: "3 Child(ren)", value: "3 Children" },
    { label: "4 Child(ren)", value: "4 Children" },
  ];
  // const [newCompany, setCompany] = useState("");
  // const [newPosition, setPosition] = useState("");
  
  return (
    <>
      <div className="heroIndex">
        <div className="heroIndex-text">
          <h1 className="heroIndex-text-title">Explore Bergen</h1>
          <p className="heroIndex-text-substrate">From all corners of the city and the comfort of our best stays</p>
        </div>
        <div className="heroIndex-content">
        <div className="heroIndex-content-guestSelect">
          <label>Dropdown label</label>
          <MultiSelect
            className="multi-select"
            onChange={handleOnchange}
            options={options}
            customValue={true}
          />
          <br />
          <p>{value}</p>
        </div>
          <DateRangePicker
            label="Book a place to stay"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
    </>
  )
}

export default HeroIndex