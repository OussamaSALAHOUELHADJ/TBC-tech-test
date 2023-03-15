function flattenObject(obj: any, prefix = ''): [string[], any[]] {
  const keys: string[] = [];
  const values: any[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    const newPrefix = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      const [subKeys, subValues] = flattenObject(value, newPrefix);
      keys.push(...subKeys);
      values.push(...subValues);
    } else {
      keys.push(newPrefix);
      values.push(value);
    }
  });

  return [keys, values];
}

export function jsonTo2DimArray(data: any[]): any[] {
  const flatData = data.map((obj) => flattenObject(obj));
  const columnNames = Array.from(new Set(flatData.flatMap(([keys]) => keys)));

  const rows = flatData.map(([keys, values]) => {
    const row = new Array(columnNames.length);
    keys.forEach((key, index) => {
      const valueIndex = columnNames.indexOf(key);
      if (valueIndex !== -1) {
        row[valueIndex] = values[index];
      }
    });
    return row;
  });

  return [columnNames, ...rows];
}
