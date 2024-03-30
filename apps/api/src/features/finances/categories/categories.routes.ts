import { Router, Request, Response, NextFunction } from 'express';

export const categoriesRoutes = Router();

// generate a list of 40 finance categories with the format { id: number; label: string, value: string }
const financeCategories = [
  'Income',
  'Housing',
  'Transportation',
  'Food',
  'Healthcare',
  'Personal',
  'Entertainment',
  'Insurance',
  'Student Loans',
  'Savings',
  'Investments',
  'Miscellaneous',
].map((category, index) => ({ id: index, label: category, value: category }));

categoriesRoutes.get('', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const search = (request.query.search as string) || '';
    const cursor = parseInt(request.query.cursor as string, 10) || 0;
    const limit = parseInt(request.query.limit as string, 10) || 10;

    const searchFilteredCategories =
      search ?
        financeCategories.filter((category) =>
          category.label.toLowerCase().includes(search.toLowerCase()),
        )
      : financeCategories;

    const filteredCategories = searchFilteredCategories
      .filter((category) => category.id > cursor)
      .slice(0, limit);

    const nextCursor =
      filteredCategories.length > 0 ? filteredCategories[filteredCategories.length - 1].id : null;

    setTimeout(() => {
      return response.status(200).send({
        results: filteredCategories,
        nextCursor,
      });
    }, Math.random() * 1000);
  } catch (error) {
    return next(error);
  }
});
