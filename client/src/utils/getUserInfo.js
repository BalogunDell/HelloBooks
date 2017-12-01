/**
 * @returns  { object } userDetails
 */
function getUserDetails() {
  const userDetails = JSON.parse(localStorage.getItem('Access-Token')); //eslint-disable-line
  return {
    userId: userDetails[1],
    userType: userDetails[2],
    savedToken: userDetails[0]
  };
}

export default getUserDetails;
