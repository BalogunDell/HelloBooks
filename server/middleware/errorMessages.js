/**
 * 
 * @param { object } error sequelize generated errors
 * @return { object } messages to display
 */
const errorMessages = (error) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return {
      error: error.errors[0].message,
      type: 'uniqueError'
    };
  } else if (error.name === 'SequelizeValidationError') {
    return {
      error: error.errors[0].message,
      type: 'validationError'
    };
  }
  return error.name;
};

export default errorMessages;
