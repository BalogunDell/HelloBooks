/**
 * @description return categories with id and category type
 * 
 * @param {array} categories
 * @param {array} desiredCategoryId
 * 
 * @returns {array} filtered category
 */
const getCategory = (categories, desiredCategoryId) =>
  categories.filter((val) => {
    return val.id === desiredCategoryId;
  });

export default getCategory;

