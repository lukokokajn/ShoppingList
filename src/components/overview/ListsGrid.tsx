import { ShoppingListCard } from './ShoppingListCard';
import type { ShoppingList } from '../ShoppingListOverview';

interface ListsGridProps {
  lists: ShoppingList[];
  currentUserId: string;
  onViewList: (id: string) => void;
  onDeleteList: (id: string) => void;
  onArchiveList: (id: string) => void;
}

export function ListsGrid({ 
  lists, 
  currentUserId, 
  onViewList, 
  onDeleteList, 
  onArchiveList 
}: ListsGridProps) {
  if (lists.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">
          Žádné seznamy k zobrazení
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map(list => (
        <ShoppingListCard
          key={list.id}
          list={list}
          isOwner={list.ownerId === currentUserId}
          onView={onViewList}
          onDelete={onDeleteList}
          onArchive={onArchiveList}
        />
      ))}
    </div>
  );
}
