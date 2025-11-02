import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MoreVertical, Users, CheckCircle2, Archive, Trash2 } from 'lucide-react';
import type { ShoppingList } from '../ShoppingListOverview';

interface ShoppingListCardProps {
  list: ShoppingList;
  isOwner: boolean;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
}

export function ShoppingListCard({ list, isOwner, onView, onDelete, onArchive }: ShoppingListCardProps) {
  const progress = list.itemCount > 0 
    ? Math.round((list.resolvedItemCount / list.itemCount) * 100)
    : 0;

  return (
    <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onView(list.id)}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="flex-1">{list.name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onArchive(list.id); }}>
              <Archive className="w-4 h-4 mr-2" />
              {list.isArchived ? 'Obnovit' : 'Archivovat'}
            </DropdownMenuItem>
            {isOwner && (
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); onDelete(list.id); }}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Smazat
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{list.members.length} {list.members.length === 1 ? 'člen' : 'členové'}</span>
          {isOwner && <Badge variant="secondary">Vlastník</Badge>}
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Položky
            </span>
            <span>{list.resolvedItemCount} / {list.itemCount}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-muted-foreground">
          Vytvořeno: {list.createdAt.toLocaleDateString('cs-CZ')}
        </p>
      </div>
    </Card>
  );
}
