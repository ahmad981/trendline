/**
 * 
 * @param arr 
 * @param field
 * @description {it check for two types} 
 */
export const implode = (arr: string[], field?: string) => {
  const test = [];
  if (field) {
    for (let i = 0; i<arr.length; i++) {
      test.push(`${arr[i][field]}`);
    }
  } else {
    for (let i = 0; i<arr.length; i++) {
      test.push(`'${arr[i]}'`);
    }
  }
    
  return test;
};