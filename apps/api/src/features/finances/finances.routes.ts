import { Router } from 'express';
import { validate } from '../../core/middleware/validation.middleware';
import { budgetItemSchema } from './finances.zschema';
import {
  createBudgetItemController,
  deleteBudgetItemController,
  getBudgetItemsController,
} from './finances.controller';
import { categoriesRoutes } from './categories/categories.routes';

export const financesRoutes = Router();

financesRoutes
  .get('/budget-items', getBudgetItemsController)
  .post('/budget-items', validate(budgetItemSchema), createBudgetItemController)
  .put(
    '/budget-items/:id',
    validate(budgetItemSchema),
    createBudgetItemController,
  )
  .patch('/budget-items', deleteBudgetItemController);

financesRoutes.delete('/budget-items/:id', deleteBudgetItemController);

financesRoutes.use('/categories', categoriesRoutes);
