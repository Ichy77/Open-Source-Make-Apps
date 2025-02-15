function removeEmpty(input) {
 if (typeof input !== "object" || input === null) return undefined;
 return Object.entries(input).reduce((acc, [key, value]) => {
  if (Array.isArray(value)) {
    acc[key] = value.map(item => removeEmpty(item));
    return acc;
  }
  if (typeof value === "object" && value !== null && !(value instanceof Date)) {
    if (Object.keys(value).length === 0) return acc;
    acc[key] = removeEmpty(value);
    return acc;
  }
  if (value === null) return acc; // comment this line if you have to pass null values.
  acc[key] = value;
  return acc;
 }, {});
}
