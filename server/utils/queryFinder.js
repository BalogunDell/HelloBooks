
/**
 * @function findOneResource
 * 
 * @description This function finds a resource from the database
 * 
 * @param {object} selectedModel
 * @param {any} resource
 * 
 * @returns {object} Response from database
 */
export const findOneResource = (selectedModel, resource) => (
  selectedModel.findOne(resource)
);

/**
 * @function findOneResourceById
 * 
 * @description This function finds a resource by its Id from the database
 * 
 * @param {object} selectedModel
 * @param {any} resource
 * 
 * @returns {object} Response from database
 */
export const findOneResourceById = (selectedModel, resource) => (
  selectedModel.findById(resource)
);

/**
 * @function findAllResources
 * 
 * @description This function finds all resources from the database
 * 
 * @param {object} selectedModel
 * @param {any} resource
 * 
 * @returns {object} Response from database
 */
export const findAllResources = (selectedModel, resource) => (
  selectedModel.findAll(resource)
);
