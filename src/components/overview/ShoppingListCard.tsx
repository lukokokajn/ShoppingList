import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MoreVertical, Users, CheckCircle2, Archive, Trash2, ArchiveRestore } from 'lucide-react';
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
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20" onClick={() => onView(list.id)}>
      {list.isArchived && (
        <div className="absolute top-0 right-0 bg-muted text-muted-foreground px-3 py-1 text-xs">
          Archivováno
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-2">
            <h3 className="mb-1 line-clamp-2">{list.name}</h3>
            {isOwner && (
              <Badge variant="secondary" className="mt-1">
                Vlastník
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {isOwner && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onDelete(list.id); 
                }}
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onArchive(list.id); }}>
                  {list.isArchived ? (
                    <>
                      <ArchiveRestore className="w-4 h-4 mr-2" />
                      Obnovit seznam
                    </>
                  ) : (
                    <>
                      <Archive className="w-4 h-4 mr-2" />
                      Archivovat seznam
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {list.members.length} {list.members.length === 1 ? 'člen' : list.members.length < 5 ? 'členové' : 'členů'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Splněno
              </span>
              <span className="text-sm">
                {list.resolvedItemCount} / {list.itemCount}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress === 100 && list.itemCount > 0 && (
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Vše splněno!</span>
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-sm pt-2 border-t">
            Vytvořeno {list.createdAt.toLocaleDateString('cs-CZ', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </Card>
  );
}
