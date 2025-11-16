import { useState } from 'react';
import { ShoppingListDetail } from './components/ShoppingListDetail';
import { Button } from './components/ui/button';
import { List, Plus } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { toast } from 'sonner@2.0.3';

// Dostupné seznamy pro testování
interface ShoppingListData {
  id: string;
  name: string;
  ownerId: string;
  items: Array<{
    id: string;
    name: string;
    isResolved: boolean;
    createdAt: Date;
    createdBy: string;
  }>;
  members: Array<{
    id: string;
    name: string;
    role: 'owner' | 'member';
    addedAt: Date;
  }>;
}

const INITIAL_LISTS: ShoppingListData[] = [
  {
    id: '1',
    name: 'Týdenní nákup',
    ownerId: 'user1',
    items: [
      { id: '1', name: 'Mléko', isResolved: false, createdAt: new Date('2025-10-28'), createdBy: 'user1' },
      { id: '2', name: 'Chléb', isResolved: true, createdAt: new Date('2025-10-28'), createdBy: 'user2' },
      { id: '3', name: 'Máslo', isResolved: false, createdAt: new Date('2025-10-29'), createdBy: 'user1' },
      { id: '4', name: 'Vajíčka', isResolved: false, createdAt: new Date('2025-10-30'), createdBy: 'user1' },
      { id: '5', name: 'Rajčata', isResolved: true, createdAt: new Date('2025-10-30'), createdBy: 'user2' },
      { id: '6', name: 'Sýr', isResolved: false, createdAt: new Date('2025-10-31'), createdBy: 'user3' },
      { id: '7', name: 'Jogurt', isResolved: false, createdAt: new Date('2025-11-01'), createdBy: 'user1' },
    ],
    members: [
      { id: 'user1', name: 'Jan Novák', role: 'owner', addedAt: new Date('2025-10-10') },
      { id: 'user2', name: 'Marie Nováková', role: 'member', addedAt: new Date('2025-10-11') },
      { id: 'user3', name: 'Petr Svoboda', role: 'member', addedAt: new Date('2025-10-15') },
    ],
  },
  {
    id: '2',
    name: 'Party potřeby',
    ownerId: 'user2',
    items: [
      { id: '1', name: 'Balónky', isResolved: true, createdAt: new Date('2025-10-25'), createdBy: 'user2' },
      { id: '2', name: 'Papírové talíře', isResolved: false, createdAt: new Date('2025-10-26'), createdBy: 'user2' },
      { id: '3', name: 'Kelímky', isResolved: false, createdAt: new Date('2025-10-26'), createdBy: 'user1' },
      { id: '4', name: 'Ubrousky', isResolved: false, createdAt: new Date('2025-10-27'), createdBy: 'user2' },
      { id: '5', name: 'Nápoje', isResolved: false, createdAt: new Date('2025-10-28'), createdBy: 'user1' },
    ],
    members: [
      { id: 'user2', name: 'Marie Nováková', role: 'owner', addedAt: new Date('2025-10-15') },
      { id: 'user1', name: 'Jan Novák', role: 'member', addedAt: new Date('2025-10-16') },
      { id: 'user4', name: 'Anna Dvořáková', role: 'member', addedAt: new Date('2025-10-17') },
    ],
  },
  {
    id: '3',
    name: 'Domácí potřeby',
    ownerId: 'user1',
    items: [
      { id: '1', name: 'Mýdlo', isResolved: false, createdAt: new Date('2025-10-20'), createdBy: 'user1' },
      { id: '2', name: 'Šampon', isResolved: false, createdAt: new Date('2025-10-21'), createdBy: 'user1' },
      { id: '3', name: 'Zubní pasta', isResolved: true, createdAt: new Date('2025-10-22'), createdBy: 'user1' },
      { id: '4', name: 'Papírové ručníky', isResolved: false, createdAt: new Date('2025-10-23'), createdBy: 'user1' },
    ],
    members: [
      { id: 'user1', name: 'Jan Novák', role: 'owner', addedAt: new Date('2025-10-05') },
    ],
  },
];

const CURRENT_USER_ID = 'user1';

export default function App() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListData[]>(INITIAL_LISTS);
  const [selectedListId, setSelectedListId] = useState<string>('1');
  const [showListSelector, setShowListSelector] = useState(false);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListName, setNewListName] = useState('');

  const selectedList = shoppingLists.find(list => list.id === selectedListId) || shoppingLists[0];

  const handleCreateList = () => {
    if (!newListName.trim()) {
      toast.error('Název nesmí být prázdný');
      return;
    }

    const newList: ShoppingListData = {
      id: Date.now().toString(),
      name: newListName.trim(),
      ownerId: CURRENT_USER_ID,
      items: [],
      members: [
        {
          id: CURRENT_USER_ID,
          name: 'Jan Novák',
          role: 'owner',
          addedAt: new Date(),
        },
      ],
    };

    setShoppingLists([...shoppingLists, newList]);
    setSelectedListId(newList.id);
    setNewListName('');
    setIsCreatingList(false);
    setShowListSelector(false);
    
    toast.success('Seznam vytvořen', {
      description: `"${newList.name}" byl úspěšně vytvořen`,
    });
  };

  return (
    <div className="size-full bg-[#fafafa]">
      <Toaster />
      
      {/* Navigační panel pro přepínání mezi seznamy (pro demonstraci) */}
      {showListSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => {
          setShowListSelector(false);
          setIsCreatingList(false);
          setNewListName('');
        }}>
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full m-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {!isCreatingList ? (
              <>
                <h2 className="mb-2">Vyberte nákupní seznam</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Přepněte se mezi různými seznamy nebo vytvořte nový
                </p>
                
                <Button
                  variant="outline"
                  className="w-full justify-start mb-4 border-dashed border-2"
                  onClick={() => setIsCreatingList(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Vytvořit nový seznam
                </Button>

                <div className="space-y-2">
                  {shoppingLists.map(list => (
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
              </>
            ) : (
              <>
                <h2 className="mb-2">Vytvořit nový seznam</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Zadejte název pro nový nákupní seznam
                </p>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="list-name">Název seznamu</Label>
                    <Input
                      id="list-name"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="např. Víkendový nákup"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCreateList();
                        }
                      }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleCreateList}
                      className="flex-1"
                    >
                      Vytvořit seznam
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCreatingList(false);
                        setNewListName('');
                      }}
                    >
                      Zrušit
                    </Button>
                  </div>
                </div>
              </>
            )}
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
        initialData={selectedList}
        onBack={() => {
          // V reálné aplikaci s routerem by zde byla navigace zpět na přehled
          setShowListSelector(true);
        }}
      />
    </div>
  );
}