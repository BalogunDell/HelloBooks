/**
 * @function paramValid
 * 
 * @description This function checks if the paramter id is valid
 * 
 * @param {number} param
 * 
 * @returns {boolean} True or false indicating what param is
 */
const paramValid = (param) => {
  if (isNaN(param)) {
    return true;
  }
  return false;
};

export default paramValid;
