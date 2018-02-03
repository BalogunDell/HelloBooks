import jwt from 'jsonwebtoken';
/**
 * @description return user information
 * 
 * @returns {object} decoded user information
 */
const getUserDetails = () => {
  const userDetails = localStorage.getItem('Token');
  const decoded = jwt.decode(userDetails);
  return {
    userId: decoded.id,
    userType: decoded.role,
    savedToken: userDetails
  };
};

export default getUserDetails;
