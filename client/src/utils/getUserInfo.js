import jwt from 'jsonwebtoken';
/**
 * @returns  { object } userDetails
 */
const getUserDetails = () => {
  const userDetails = localStorage.getItem('Access-Token'); //eslint-disable-line
  const decoded = jwt.decode(userDetails);
  return {
    userId: decoded.id,
    userType: decoded.role,
    savedToken: userDetails
  };
};

export default getUserDetails;
