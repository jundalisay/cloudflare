export const CATEGORIES = {
  1: 'Clothing',
  2: 'Food',
  3: 'Electronics',
  4: 'Equipment'
};

export const CATEGORY_IDS = Object.keys(CATEGORIES).map(Number);

export function getCategoryName(categoryId: number): string {
  return CATEGORIES[categoryId] || 'No Category';
}


