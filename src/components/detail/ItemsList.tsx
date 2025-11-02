import { ItemRow } from './ItemRow';
import type { ShoppingItem } from '../ShoppingListDetail';

interface ItemsListProps {
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ItemsList({ items, onToggle, onDelete }: ItemsListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Žádné položky k zobrazení
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map(item => (
        <ItemRow
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
