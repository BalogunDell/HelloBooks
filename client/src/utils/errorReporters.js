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
      return true;
    case 403:
      Materialize.toast(
        error.response.data.message,
        5000,
        'red rounded');
      return true;
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
export const componentErrorReporter = (error) => {
  switch (error.response.status) {
    case 401:
      return true;
    case 403:
      return true;
    default:
      return false;
  }
};
