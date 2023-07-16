export const validateExistChangesToUpdate = (entity: Object): boolean => {
  if (Object.keys(entity).length < 1) {
    return false;
  } else {
    return true;
  }
};

export const getDifferentFields = (object1: any, object2: any) => {
  const result = Object.entries(object1).reduce((acc, [key, value]) => {
    if (object2[key] !== value) {
      return { ...acc, [key]: value };
    }
    return acc;
  }, {});

  return result;
};

export const createFormData = (data: object): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "img") {
      if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};
