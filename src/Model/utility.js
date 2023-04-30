// given an object with ID (integer) keys, get lowest unused key value
const getInsertableID = (objectWithIDs) => {
  const itemCount = Object.keys(objectWithIDs).length;
  let returnID = itemCount;

  if (itemCount === 0) {
    returnID = 0;
  } else {
    for (let i = 0; i < itemCount; i++) {
      if (!(i in objectWithIDs)) {
        returnID = i;
        break;
      }
    }
    returnID = itemCount;
  }

  return returnID;
};

export { getInsertableID };
