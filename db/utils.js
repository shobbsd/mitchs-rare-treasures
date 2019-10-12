exports.formatData = (arr, ref, newKey, keyToDel) => {
  return arr.map(element => {
    const elementCopy = { ...element };
    elementCopy[newKey] = ref[elementCopy[keyToDel]];
    delete elementCopy[keyToDel];
    return elementCopy;
  });
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, currVal) => {
    ref[currVal[key]] = currVal[value];
    return ref;
  }, {});
};
