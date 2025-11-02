import { Button } from '../ui/button';
import { Plus, ShoppingCart } from 'lucide-react';

interface ListHeaderProps {
  onCreateList: () => void;
  currentUser: { id: string; name: string };
}

export function ListHeader({ onCreateList, currentUser }: ListHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1>Moje nákupní seznamy</h1>
            <p className="text-muted-foreground">
              Přihlášen jako: {currentUser.name}
            </p>
          </div>
        </div>

        <Button onClick={onCreateList} className="gap-2">
          <Plus className="w-4 h-4" />
          Nový seznam
        </Button>
      </div>
    </div>
  );
}
