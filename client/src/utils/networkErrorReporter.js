/**
 * @description reports network error on API call failure
 * 
 * @param {array} error
 * 
 * @returns {any } Materialize toast
*/
const networkErrorReporter = (error) => {
  const errorMessage = error.response
    ? error.response.data.message
    : 'Seems like your device is not connected to the internet';
  Materialize.toast(errorMessage, 5000, 'red rounded');
};

export default networkErrorReporter;
