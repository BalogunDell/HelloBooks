

export const findOneResource = (selectedModel, resource) => (
  selectedModel.findOne(resource)
);

export const findOneResourceById = (selectedModel, resource) => (
  selectedModel.findById(resource)
);

export const findAllResources = (selectedModel, resource) => (
  selectedModel.findAll(resource)
);
