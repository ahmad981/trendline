export const paginate = (page: number, limit: number, total: number) => {
  return {page, limit, totalDocs: total, hasNext: (page + 1) * limit < total, hasPrev: page > 0 };
};