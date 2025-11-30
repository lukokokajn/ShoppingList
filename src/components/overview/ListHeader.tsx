import { Button } from '../ui/button';
import { Plus, ShoppingCart } from 'lucide-react';

interface ListHeaderProps {
  onCreateList: () => void;
  currentUser: { id: string; name: string };
}

export function ListHeader({ onCreateList, currentUser }: ListHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <ShoppingCart className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="mb-1">Moje nákupní seznamy</h1>
            <p className="text-muted-foreground text-sm">
              Přihlášen jako <span className="font-medium">{currentUser.name}</span>
            </p>
          </div>
        </div>

        <Button onClick={onCreateList} className="gap-2 shadow-sm" size="lg">
          <Plus className="w-5 h-5" />
          Nový seznam
        </Button>
      </div>
    </div>
  );
}
