// Exclude empty "_id" fields in cleaned data
export function cleanData(data: any): any {
  if (Array.isArray(data)) {
    return data.map(cleanData);
  } else if (data !== null && typeof data === "object") {
    let newData: { [key: string]: any } = {};
    for (let key in data) {
      if (key === "_id" && (!data[key] || data[key] === "")) continue;
      newData[key] = cleanData(data[key]);
    }
    return newData;
  }
  return data;
}
