import React, { useState } from 'react'

import Select, { StylesConfig, AriaOnFocus } from 'react-select';
// import chroma from 'chroma-js';

function Filter({
  selectOptions,
  filterType,
  isMulti,
  handleOnChange,
  placeholderText,
  handleOnMessage,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  let newFilterType = '';

  if (filterType) {
    newFilterType = filterType;
  }

  function onChange(val) {
    setSelectedOption(val);
    // handleOnChange(val);
  }

  // Style
  const styles = {
    control: (styles, { isDisabled, isFocused, isSelected }) => ({ 
      ...styles, 
      backgroundColor: '#547e77',
      border: 
      isDisabled ? 'none'
        : isFocused ? 'none' 
        : isSelected ? 'none'
        : 'none',
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
        backgroundColor: '#2e2e2e',
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
      {filterType ? <p>{filterType}</p> : ''}
      <Select
        defaultValue={selectedOption}
        onChange={onChange}
        options={selectOptions}
        isMulti={isMulti}
        styles={styles}
        ariaLiveMessages={handleOnMessage}
        blurInputOnSelect
        value={selectedOption}
        placeholder={placeholderText}
      />
    </>
  );
}

export default Filter;
