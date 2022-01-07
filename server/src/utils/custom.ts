export const emptyObjectCk = (obj: Object): boolean => {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};

export const insertIntoObject = (obj: object, key: string, val: number): Object => {
  obj[key] = val;
  return obj;
};

export const convertRawObject = (obj: Object): Object => {
  return JSON.parse(JSON.stringify(obj));
};

export const convertRawMap = (obj: Object): Map<any, any> => {
  return JSON.parse(JSON.stringify(obj));
};
