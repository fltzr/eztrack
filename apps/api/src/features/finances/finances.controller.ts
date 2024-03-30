import { Request, Response, type NextFunction } from 'express';

import {
  createBudgetItemService,
  deleteBudgetItemService,
  getUsersBudgetItemsService,
  updateBudgetItemService,
} from './finances.service';

export const getBudgetItemsController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const budgetItems = await getUsersBudgetItemsService(request.session.userid);

    return response.status(200).json({
      budgetItems,
      pagesCount: Math.ceil(budgetItems.length / 10),
      currentPageIndex: 1,
      totalCount: budgetItems.length,
    });
  } catch (error) {
    return next(error);
  }
};

export const createBudgetItemController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { title, amount, category } = request.body as {
      title: string;
      amount: string;
      category: string;
    };

    await createBudgetItemService({
      userId: request.session.userid,
      title,
      amount,
      category,
    });

    return response.status(201).send();
  } catch (error) {
    return next(error);
  }
};

export const updateBudgetItemController = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id, title, amount, category } = request.body as {
      id: string;
      title: string;
      amount: string;
      category: string;
    };

    await updateBudgetItemService({
      budgetItemId: id,
      userId: request.session.userid,
      title,
      amount,
      category,
    });

    return response.status(200).send();
  } catch (error) {
    return next(error);
  }
};

export const deleteBudgetItemController = async (request: Request, response: Response) => {
  try {
    const { data } = request.body as { data: string[] };

    await deleteBudgetItemService(data);

    return response.status(200).send();
  } catch (error) {
    return response.status(500).json({
      error: 'Unable to delete the budget item. Please try again later.',
    });
  }
};
