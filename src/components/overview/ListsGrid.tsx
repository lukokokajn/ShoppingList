import { ShoppingListCard } from './ShoppingListCard';
import type { ShoppingList } from '../ShoppingListOverview';
import { ListX, Archive } from 'lucide-react';

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
    const isArchived = lists.length === 0;
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          {isArchived ? (
            <Archive className="w-8 h-8 text-muted-foreground" />
          ) : (
            <ListX className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <h3 className="mb-2 text-center">Žádné seznamy k zobrazení</h3>
        <p className="text-muted-foreground text-center max-w-md">
          {isArchived 
            ? 'Nemáte žádné archivované seznamy. Archivované seznamy se zobrazí zde.'
            : 'Začněte vytvořením nového nákupního seznamu pomocí tlačítka "Nový seznam".'
          }
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
