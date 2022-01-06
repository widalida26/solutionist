export const emptyObjectCk = (obj: Object): boolean => {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};
