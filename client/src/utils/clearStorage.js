/**
 * @description Clears the local storage
 * 
 * @returns { null } null 
 */
const clearStorage = () => {
  localStorage.clear();
  Materialize.toast(
    'Session expired! Login to continue',
    3000,
    'red rounded'
  );
};

 export default clearStorage;
