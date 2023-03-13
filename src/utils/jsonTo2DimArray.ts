/* eslint-disable @typescript-eslint/no-explicit-any */
export const jsonTo2DimArray = (data: { [key: string]: any }[]): any[][] => {
  let values: any[][] = [];
  if (data.length > 0) {
    const keys = Object.keys(data[0]);
    values = [keys, ...data.map((obj) => keys.map((key) => obj[key]))];
  }
  return values;
};
