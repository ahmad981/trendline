export const uniion = (arr1: any[], arr2: any[]) => {
  const newarr = [];
  arr1.forEach(itm => newarr.push(itm));
  arr2.forEach(itm => {
    if (newarr.indexOf(itm) === -1) {
      newarr.push(itm);
    }
  });

  return newarr;
};

export const intersection = (arr1: any[], arr2: any[]) => {
  const newarr = [];
  arr1.forEach(itm => {
    if (arr2.indexOf(itm) !== -1) {
      newarr.push(itm);
    }
  });
    
  return newarr;
};


