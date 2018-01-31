
const paramValid = (param) => {
  if (isNaN(param)) {
    return true;
  }
  return false;
};

export default paramValid;
