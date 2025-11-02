import { useState } from 'react';
import { ShoppingListDetail } from './components/ShoppingListDetail';
import { Button } from './components/ui/button';
import { List } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

// Dostupné seznamy pro testování
const AVAILABLE_LISTS = [
  { id: '1', name: 'Týdenní nákup' },
  { id: '2', name: 'Party potřeby' },
  { id: '3', name: 'Domácí potřeby' },
];

export default function App() {
  const [selectedListId, setSelectedListId] = useState<string>('1');
  const [showListSelector, setShowListSelector] = useState(false);

  return (
    <div className="size-full bg-[#fafafa]">
      <Toaster />
      
      {/* Navigační panel pro přepínání mezi seznamy (pro demonstraci) */}
      {showListSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowListSelector(false)}>
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full m-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-2">Vyberte nákupní seznam</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Přepněte se mezi různými seznamy pro testování aplikace
            </p>
            <div className="space-y-2">
              {AVAILABLE_LISTS.map(list => (
                <Button
                  key={list.id}
                  variant={selectedListId === list.id ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedListId(list.id);
                    setShowListSelector(false);
                  }}
                >
                  <List className="w-4 h-4 mr-2" />
                  {list.name}
                  {selectedListId === list.id && (
                    <span className="ml-auto text-xs opacity-70">Aktuální</span>
                  )}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => setShowListSelector(false)}
            >
              Zavřít
            </Button>
          </div>
        </div>
      )}

      {/* Tlačítko pro otevření selektoru seznamů */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setShowListSelector(true)}
          className="gap-2 shadow-lg"
          size="lg"
        >
          <List className="w-5 h-5" />
          Přepnout seznam
        </Button>
      </div>

      {/* Detail nákupního seznamu */}
      <ShoppingListDetail 
        key={selectedListId}
        listId={selectedListId} 
        onBack={() => {
          // V reálné aplikaci s routerem by zde byla navigace zpět na přehled
          setShowListSelector(true);
        }}
      />
    </div>
  );
}
