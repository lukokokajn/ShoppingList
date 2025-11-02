import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import type { ShoppingItem } from '../ShoppingListDetail';

interface ItemRowProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ItemRow({ item, onToggle, onDelete }: ItemRowProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group">
      <Checkbox
        checked={item.isResolved}
        onCheckedChange={() => onToggle(item.id)}
      />
      
      <span 
        className={`flex-1 ${item.isResolved ? 'line-through text-muted-foreground' : ''}`}
      >
        {item.name}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(item.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>
    </div>
  );
}
