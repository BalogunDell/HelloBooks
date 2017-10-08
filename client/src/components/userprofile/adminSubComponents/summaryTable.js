import React from 'react';

const summaryTable = ({bookcount}) => {
  return(
      <div>
        <div className="row">
           <h4 className="center">ADMIN DASHBOARD</h4>
        </div>

        <div className="row">
          <table className="summary-table">
            <thead>
              <tr>
                <th>SUMMARY</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Total Books in Library</td>
                <td>{bookcount}</td>
              </tr>

              <tr>
                <td>Books Returned</td>
                <td>1</td>
              </tr>

              <tr>
                <td>Pending Return</td>
                <td>1</td>
              </tr>

              <tr>
                <td>Most Borrowed book</td>
                <td>Angular 2, React for Beginners...</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}
export default summaryTable;