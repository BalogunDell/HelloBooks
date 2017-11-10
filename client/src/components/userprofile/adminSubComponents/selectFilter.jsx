import React from 'react';

const selectFilter = ({selectDefaultValue, handleSelectChange}) => {
  return(
    <div className=" row selectFilter">
          <label>Filter table</label>
          <select onChange={handleSelectChange} value={selectDefaultValue}>
            <option value="booksreturned">Books Returned</option>
            <option value="mostborrowedbooks">Most Borrowed Books</option>
            <option value="allbooks">All books</option>
            <option value="pendingreturn">Pending Return</option>
          </select>
      </div>
  );
}

export default selectFilter;