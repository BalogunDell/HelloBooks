import jwt from 'jsonwebtoken';
/**
 * @returns  { object } userDetails
 */
const getUserDetails = () => {
  const userDetails = localStorage.getItem('Access-Token');
  const decoded = jwt.decode(userDetails);
  return {
    userId: decoded.id,
    userType: decoded.role,
    savedToken: userDetails
  };
};

export default getUserDetails;
