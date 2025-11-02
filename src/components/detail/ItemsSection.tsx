import { useState } from 'react';
import { ItemFilter } from './ItemFilter';
import { ItemsList } from './ItemsList';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus } from 'lucide-react';
import { Card } from '../ui/card';
import type { ShoppingItem } from '../ShoppingListDetail';

interface ItemsSectionProps {
  items: ShoppingItem[];
  onAddItem: (name: string) => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

export function ItemsSection({ 
  items, 
  onAddItem, 
  onToggleItem, 
  onDeleteItem 
}: ItemsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unresolved'>('unresolved');
  const [newItemName, setNewItemName] = useState('');

  const handleAddItem = () => {
    if (newItemName.trim()) {
      onAddItem(newItemName.trim());
      setNewItemName('');
    }
  };

  const filteredItems = activeFilter === 'unresolved'
    ? items.filter(item => !item.isResolved)
    : items;

  const unresolvedCount = items.filter(item => !item.isResolved).length;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="mb-4">Nákupní položky</h2>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <ItemFilter 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
            {activeFilter === 'unresolved' && unresolvedCount > 0 && (
              <span className="text-sm text-muted-foreground">
                {unresolvedCount} {unresolvedCount === 1 ? 'položka' : unresolvedCount < 5 ? 'položky' : 'položek'}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Přidat položku..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              className="w-full sm:w-64"
            />
            <Button onClick={handleAddItem} className="gap-2 shrink-0">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Přidat</span>
            </Button>
          </div>
        </div>
      </div>

      <ItemsList
        items={filteredItems}
        onToggle={onToggleItem}
        onDelete={onDeleteItem}
      />
    </Card>
  );
}
