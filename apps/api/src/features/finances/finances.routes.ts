import { Router } from 'express';

import { validate } from '@/api/core';

import { categoriesRoutes } from './categories/categories.routes';
import {
  createBudgetItemController,
  deleteBudgetItemController,
  getBudgetItemsController,
} from './finances.controller';
import { budgetItemSchema } from './finances.zschema';

export const financesRoutes = Router();

financesRoutes
  .get('/budget-items', getBudgetItemsController)
  .post('/budget-items', validate(budgetItemSchema), createBudgetItemController)
  .put('/budget-items/:id', validate(budgetItemSchema), createBudgetItemController)
  .patch('/budget-items', deleteBudgetItemController);

financesRoutes.delete('/budget-items/:id', deleteBudgetItemController);

financesRoutes.use('/categories', categoriesRoutes);
