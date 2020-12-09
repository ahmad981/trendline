
export const trDurations = [
  {id: 1, trt: 1, days: .5, title: '1/2 day', type: 'select'},
  {id: 2, trt: 1, days: 1, title: '1 day', type: 'select'},
  {id: 3, trt: 1, days: 2, title: '2 days', type: 'select'},
  {id: 4, trt: 1, days: 5, title: '5 days', type: 'select'},

  {id: 5, trt: 2, days: 5, title: null, type: 'text'},

  {id: 6, trt: 3, days: 5, title: null, type: 'text'},

  {id: 7, trt: 4, days: 5, title: null, type: 'text'},

  {id: 8, trt: 5, days: 1, title: '1 day', type: 'select'},
  {id: 9, trt: 5, days: 2, title: '2 days', type: 'select'},
  {id: 10, trt: 5, days: 3, title: '3 days', type: 'select'},
  {id: 11, trt: 5, days: 4, title: '4 days', type: 'select'},
  {id: 12, trt: 5, days: 7, title: '1 week', type: 'select'},
  {id: 13, trt: 5, days: 14, title: '2 weeks', type: 'select'},

  {id: 14, trt: 6, days: 6*30, title: '6 months', type: 'select'},
  {id: 15, trt: 6, days: 365, title: '1 year', type: 'select'},

  {id: 16, trt: 7, days: 365, title: '1 year', type: 'select'},
  {id: 17, trt: 7, days: 2*365, title: '2 year', type: 'select'},
  {id: 18, trt: 7, days: 3*365, title: '3 year', type: 'select'},
  {id: 19, trt: 7, days: 4*365, title: '4 year', type: 'select'},
];

export const getDurationByType = (id: number) => {
  const duration = trDurations.filter(itm => itm.trt === id);
  return duration;
};