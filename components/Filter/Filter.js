import React, { useState } from 'react'
import Select, { StylesConfig, AriaOnFocus } from 'react-select';

function Filter({
  selectOptions,
  filterType,
  isMulti,
  handleOnChange,
  placeholderText,
  handleOnMessage,
  styles,
  classNamePrefix,
  className,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  let newFilterType = '';

  if (filterType) {
    newFilterType = filterType;
  }

  function onChange(val) {
    setSelectedOption(val);
  }

  return (
    <>
      <p>{filterType ? {filterType} : ''}</p>
      <Select
        defaultValue={selectedOption}
        onChange={onChange}
        options={selectOptions}
        isMulti={isMulti}
        ariaLiveMessages={handleOnMessage}
        blurInputOnSelect
        value={selectedOption}
        styles={styles}
        placeholder={placeholderText}
        classNamePrefix={classNamePrefix}
        className={className}
      />
    </>
  );
}

export default Filter;
