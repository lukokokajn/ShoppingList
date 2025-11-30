// src/App.tsx
import { useEffect, useState } from 'react';
import { ShoppingListDetail } from './components/ShoppingListDetail';
import { Button } from './components/ui/button';
import { Plus, X } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { toast } from 'sonner';
import { ListHeader } from './components/overview/ListHeader';
import { ListFilter } from './components/overview/ListFilter';
import { ListsGrid } from './components/overview/ListsGrid';

import { api } from './api';
import { ShoppingList } from './api/types';

const CURRENT_USER_ID = 'user1';
const CURRENT_USER_NAME = 'Jan Novák';

export default function App() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived'>('active');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLists = async () => {
      try {
        const lists = await api.getLists();
        setShoppingLists(lists);
      } catch (e) {
        console.error(e);
        toast.error('Nepodařilo se načíst seznamy');
      } finally {
        setIsLoading(false);
      }
    };

    loadLists();
  }, []);

  const selectedList = selectedListId
      ? shoppingLists.find((list) => list.id === selectedListId) ?? null
      : null;

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      toast.error('Název nesmí být prázdný');
      return;
    }

    try {
      const newList = await api.createList(newListName.trim(), CURRENT_USER_ID, CURRENT_USER_NAME);
      setShoppingLists((prev) => [newList, ...prev]);
      setNewListName('');
      setIsCreatingList(false);

      toast.success('Seznam vytvořen', {
        description: `"${newList.name}" byl úspěšně vytvořen`,
      });
    } catch (e) {
      console.error(e);
      toast.error('Nepodařilo se vytvořit seznam');
    }
  };

  const handleDeleteList = async (id: string) => {
    const list = shoppingLists.find((l) => l.id === id);
    if (!list) return;

    try {
      await api.deleteList(id);
      setShoppingLists((prev) => prev.filter((l) => l.id !== id));
      if (selectedListId === id) {
        setSelectedListId(null);
      }
      toast.success('Seznam smazán', {
        description: `"${list.name}" byl úspěšně smazán`,
      });
    } catch (e) {
      console.error(e);
      toast.error('Nepodařilo se smazat seznam');
    }
  };

  const handleDeleteCurrentList = () => {
    if (selectedListId) {
      handleDeleteList(selectedListId);
    }
  };

  const handleArchiveList = async (id: string) => {
    const list = shoppingLists.find((l) => l.id === id);
    if (!list) return;

    try {
      const updated = await api.toggleArchiveList(id);
      setShoppingLists((prev) =>
          prev.map((l) => (l.id === updated.id ? updated : l))
      );

      toast.success(updated.isArchived ? 'Seznam archivován' : 'Seznam obnoven', {
        description: `"${updated.name}" byl úspěšně ${
            updated.isArchived ? 'archivován' : 'obnoven'
        }`,
      });
    } catch (e) {
      console.error(e);
      toast.error('Nepodařilo se změnit stav seznamu');
    }
  };

  const handleViewList = (id: string) => {
    setSelectedListId(id);
  };

  const handleBackToOverview = () => {
    setSelectedListId(null);
  };

  const handleListChange = (updated: ShoppingList) => {
    setShoppingLists((prev) =>
        prev.map((l) => (l.id === updated.id ? updated : l))
    );
  };

  const listsForDisplay = shoppingLists.map((list) => ({
    id: list.id,
    name: list.name,
    ownerId: list.ownerId,
    ownerName: list.members.find((m) => m.id === list.ownerId)?.name || 'Neznámý',
    members: list.members,
    itemCount: list.items.length,
    resolvedItemCount: list.items.filter((i) => i.isResolved).length,
    isArchived: list.isArchived,
    createdAt: list.createdAt,
  }));

  const filteredLists = listsForDisplay.filter((list) =>
      activeFilter === 'active' ? !list.isArchived : list.isArchived
  );

  if (isLoading) {
    return (
        <div className="size-full bg-background flex items-center justify-center">
          <Toaster />
          <div className="text-muted-foreground">Načítám seznamy…</div>
        </div>
    );
  }


  if (selectedList && selectedListId) {
    return (
        <div className="size-full bg-[#fafafa]">
          <Toaster />
          <ShoppingListDetail
              key={selectedListId}
              list={selectedList}
              currentUserId={CURRENT_USER_ID}
              onBack={handleBackToOverview}
              onDelete={() => handleDeleteList(selectedListId)}
              onListChange={handleListChange}
          />
        </div>
    );
  }

  return (
      <div className="size-full bg-background">
        <Toaster />

        {/* Dialog pro vytvoření nového seznamu */}
        {isCreatingList && (
            <div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                onClick={() => {
                  setIsCreatingList(false);
                  setNewListName('');
                }}
            >
              <div
                  className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full m-4"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2>Vytvořit nový seznam</h2>
                  <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsCreatingList(false);
                        setNewListName('');
                      }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Zadejte název pro nový nákupní seznam
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
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
                    <Button onClick={handleCreateList} className="flex-1">
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
              </div>
            </div>
        )}

        {/* Přehled nákupních seznamů */}
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto p-6">
            <ListHeader
                onCreateList={() => setIsCreatingList(true)}
                currentUser={{ id: CURRENT_USER_ID, name: CURRENT_USER_NAME }}
            />

            <ListFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            <ListsGrid
                lists={filteredLists}
                currentUserId={CURRENT_USER_ID}
                onViewList={handleViewList}
                onDeleteList={handleDeleteList}
                onArchiveList={handleArchiveList}
            />
          </div>
        </div>
      </div>
  );
}
