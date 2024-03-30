import { DrizzleInstance } from '../../core/database/drizzle';
import { budgetItems } from '../../core/database/schema/finances-budget-item';
import { eq } from 'drizzle-orm';

export const getUsersBudgetItemsService = async (userId: string) => {
  const db = DrizzleInstance();

  const userBudgetItemQuery = db.query.budgetItems
    .findMany({
      where: (budgetItems, { and, eq }) =>
        and(eq(budgetItems.userId, userId), eq(budgetItems.isDeleted, false)),
    })
    .prepare('users_budget_items');

  return await userBudgetItemQuery.execute({ uid: userId });
};

type CreateBudgetItemParams = {
  userId: string;
  title: string;
  amount: string;
  category: string;
};

export const createBudgetItemService = async ({
  userId,
  title,
  amount,
  category,
}: CreateBudgetItemParams) => {
  const db = DrizzleInstance();

  const budgetItem = {
    userId,
    title,
    amount,
    category,
  };

  await db.insert(budgetItems).values(budgetItem);
};

export const deleteBudgetItemService = async (ids: string[]) => {
  const db = DrizzleInstance();

  ids.forEach(async (id) => {
    await db
      .update(budgetItems)
      .set({ isDeleted: true })
      .where(eq(budgetItems.id, id));
  });
};

type UpdateBudgetItemParams = {
  budgetItemId: string;
  userId: string;
  title: string;
  amount: string;
  category: string;
};

export const updateBudgetItemService = async ({
  budgetItemId,
  userId,
  title,
  amount,
  category,
}: UpdateBudgetItemParams) => {
  const db = DrizzleInstance();

  await db
    .update(budgetItems)
    .set({
      title,
      amount,
      category,
      userId,
    })
    .where(eq(budgetItems.id, budgetItemId));
};
