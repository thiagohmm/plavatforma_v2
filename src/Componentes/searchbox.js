import React from 'react';
const SearchBox = (props) => {
  return (
    <input
      type="search"
      id="searchbox"
      className="form-control input-sm"
      placeholder={props.placeholder}
      onChange={props.handleChange}
      style={{ width: '119px' }}
    ></input>
  );
};

export default SearchBox;
