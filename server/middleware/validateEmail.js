/**
 * 
 * @param {string} email
 * 
 * @returns {boolean}  true or false
 */
const validateEmail = (email) => {
  const lastWord = email.substring(email.lastIndexOf('.') + 1);
  const dotPosition = email.lastIndexOf('.');
  const atPosition = email.indexOf('@');
  if (lastWord.length < 2 || dotPosition < atPosition || atPosition === -1) {
    return false;
  }
  return true;
};

export default validateEmail;
