import React from 'react';

const selectFilter = ({selectDefaultValue}) => {
  return(
    <div className=" row selectFilter">
          <label>Filter table</label>
          <select>
            <option value="ReturnedBooks">Returned Books</option>
            <option value="ReturnedBooks">Books Awaiting Return Confirmation</option>
            <option value="MostBorrowed">Most Borrowed Books</option>
            <option value="PendingReturn">Pending Return</option>
          </select>
      </div>
  );
}

export default selectFilter;