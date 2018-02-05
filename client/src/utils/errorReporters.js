/**
 * @description reports error on API call failure
 * 
 * @param {object} error
 * 
 * @returns {any } Materialize toast
*/
export const actionErrorReporter = (error) => {
  switch (error.response.status) {
    case 401:
      Materialize.toast(
        error.response.data.message,
        5000,
        'red rounded');
      return;
    case 403:
      Materialize.toast(
        error.response.data.message,
        5000,
        'red rounded');
      return;
    default:
      Materialize.toast(
        error.response.data.message,
        4000,
        'red rounded');
      return false;
  }
};


/**
 * @description reports error on API call failure
 * 
 * @param {object} error
 * 
 * @returns { booelean } Materialize toast
*/
export const networkErrorReporter = (error) => {
  if (!error.response) {
    return Materialize.toast(
      'It appears like you are offline. Please check your connection',
      5000,
      'red rounded');
  }
};
