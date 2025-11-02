import { useState } from 'react';
import { ListHeader } from './overview/ListHeader';
import { ListFilter } from './overview/ListFilter';
import { ListsGrid } from './overview/ListsGrid';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface ShoppingListOverviewProps {
  onViewList: (id: string) => void;
  onBackToDocs?: () => void;
}

export interface ShoppingList {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  members: Member[];
  itemCount: number;
  resolvedItemCount: number;
  isArchived: boolean;
  createdAt: Date;
}

export interface Member {
  id: string;
  name: string;
  role: 'owner' | 'member';
}

const MOCK_LISTS: ShoppingList[] = [
  {
    id: '1',
    name: 'Týdenní nákup',
    ownerId: 'user1',
    ownerName: 'Jan Novák',
    members: [
      { id: 'user1', name: 'Jan Novák', role: 'owner' },
      { id: 'user2', name: 'Marie Nováková', role: 'member' },
    ],
    itemCount: 12,
    resolvedItemCount: 5,
    isArchived: false,
    createdAt: new Date('2025-10-10'),
  },
  {
    id: '2',
    name: 'Party zítra',
    ownerId: 'user2',
    ownerName: 'Marie Nováková',
    members: [
      { id: 'user2', name: 'Marie Nováková', role: 'owner' },
      { id: 'user1', name: 'Jan Novák', role: 'member' },
      { id: 'user3', name: 'Petr Svoboda', role: 'member' },
    ],
    itemCount: 8,
    resolvedItemCount: 8,
    isArchived: false,
    createdAt: new Date('2025-10-12'),
  },
  {
    id: '3',
    name: 'Stavební materiál',
    ownerId: 'user1',
    ownerName: 'Jan Novák',
    members: [
      { id: 'user1', name: 'Jan Novák', role: 'owner' },
    ],
    itemCount: 15,
    resolvedItemCount: 3,
    isArchived: false,
    createdAt: new Date('2025-10-08'),
  },
  {
    id: '4',
    name: 'Vánoční nákup 2024',
    ownerId: 'user1',
    ownerName: 'Jan Novák',
    members: [
      { id: 'user1', name: 'Jan Novák', role: 'owner' },
      { id: 'user2', name: 'Marie Nováková', role: 'member' },
    ],
    itemCount: 25,
    resolvedItemCount: 25,
    isArchived: true,
    createdAt: new Date('2024-12-15'),
  },
  {
    id: '5',
    name: 'Grilovačka červen',
    ownerId: 'user1',
    ownerName: 'Jan Novák',
    members: [
      { id: 'user1', name: 'Jan Novák', role: 'owner' },
      { id: 'user2', name: 'Marie Nováková', role: 'member' },
      { id: 'user3', name: 'Petr Svoboda', role: 'member' },
      { id: 'user4', name: 'Jana Dvořáková', role: 'member' },
    ],
    itemCount: 18,
    resolvedItemCount: 18,
    isArchived: true,
    createdAt: new Date('2025-06-01'),
  },
];

const CURRENT_USER = { id: 'user1', name: 'Jan Novák' };

export function ShoppingListOverview({ onViewList, onBackToDocs }: ShoppingListOverviewProps) {
  const [lists, setLists] = useState<ShoppingList[]>(MOCK_LISTS);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived'>('active');

  const handleCreateList = () => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      name: 'Nový seznam',
      ownerId: CURRENT_USER.id,
      ownerName: CURRENT_USER.name,
      members: [{ id: CURRENT_USER.id, name: CURRENT_USER.name, role: 'owner' }],
      itemCount: 0,
      resolvedItemCount: 0,
      isArchived: false,
      createdAt: new Date(),
    };
    setLists([newList, ...lists]);
  };

  const handleDeleteList = (id: string) => {
    setLists(lists.filter(list => list.id !== id));
  };

  const handleArchiveList = (id: string) => {
    setLists(lists.map(list => 
      list.id === id ? { ...list, isArchived: !list.isArchived } : list
    ));
  };

  const filteredLists = lists.filter(list => 
    activeFilter === 'active' ? !list.isArchived : list.isArchived
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {onBackToDocs && (
          <Button 
            variant="ghost" 
            onClick={onBackToDocs}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět na dokumentaci
          </Button>
        )}

        <ListHeader 
          onCreateList={handleCreateList}
          currentUser={CURRENT_USER}
        />

        <ListFilter 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <ListsGrid 
          lists={filteredLists}
          currentUserId={CURRENT_USER.id}
          onViewList={onViewList}
          onDeleteList={handleDeleteList}
          onArchiveList={handleArchiveList}
        />
      </div>
    </div>
  );
}
