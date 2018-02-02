/**
 * @description return categories with id and category type
 * 
 * @param {array} categories
 * @param {array} desiredCategoryId
 * 
 * @returns {array} filtered category
*/

const networkErrorReporter = (error) => {
  const errorMessage = error.response
    ? error.response.data.message
    : 'Seems like your device is not connected to the internet';
  Materialize.toast(errorMessage, 5000, 'red rounded');
};

export default networkErrorReporter;
