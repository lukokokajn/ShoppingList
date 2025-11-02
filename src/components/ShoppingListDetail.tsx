import { useState } from 'react';
import { DetailHeader } from './detail/DetailHeader';
import { ItemsSection } from './detail/ItemsSection';
import { MembersSection } from './detail/MembersSection';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ShoppingListDetailProps {
  listId: string;
  onBack: () => void;
  onBackToDocs?: () => void;
}

export interface ShoppingItem {
  id: string;
  name: string;
  isResolved: boolean;
  createdAt: Date;
  createdBy: string;
}

export interface Member {
  id: string;
  name: string;
  role: 'owner' | 'member';
  addedAt: Date;
}

const MOCK_DATA = {
  '1': {
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
      { id: 'user1', name: 'Jan Novák', role: 'owner' as const, addedAt: new Date('2025-10-10') },
      { id: 'user2', name: 'Marie Nováková', role: 'member' as const, addedAt: new Date('2025-10-11') },
      { id: 'user3', name: 'Petr Svoboda', role: 'member' as const, addedAt: new Date('2025-10-15') },
    ],
  },
  '2': {
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
      { id: 'user2', name: 'Marie Nováková', role: 'owner' as const, addedAt: new Date('2025-10-15') },
      { id: 'user1', name: 'Jan Novák', role: 'member' as const, addedAt: new Date('2025-10-16') },
      { id: 'user4', name: 'Anna Dvořáková', role: 'member' as const, addedAt: new Date('2025-10-17') },
    ],
  },
  '3': {
    name: 'Domácí potřeby',
    ownerId: 'user1',
    items: [
      { id: '1', name: 'Mýdlo', isResolved: false, createdAt: new Date('2025-10-20'), createdBy: 'user1' },
      { id: '2', name: 'Šampon', isResolved: false, createdAt: new Date('2025-10-21'), createdBy: 'user1' },
      { id: '3', name: 'Zubní pasta', isResolved: true, createdAt: new Date('2025-10-22'), createdBy: 'user1' },
      { id: '4', name: 'Papírové ručníky', isResolved: false, createdAt: new Date('2025-10-23'), createdBy: 'user1' },
    ],
    members: [
      { id: 'user1', name: 'Jan Novák', role: 'owner' as const, addedAt: new Date('2025-10-05') },
    ],
  },
};

const CURRENT_USER_ID = 'user1';

export function ShoppingListDetail({ listId, onBack, onBackToDocs }: ShoppingListDetailProps) {
  const data = MOCK_DATA[listId as keyof typeof MOCK_DATA] || MOCK_DATA['1'];
  
  // Inicializace stavu s daty z konstanty
  const [listName, setListName] = useState(data.name);
  const [items, setItems] = useState<ShoppingItem[]>(data.items);
  const [members, setMembers] = useState<Member[]>(data.members);

  const isOwner = data.ownerId === CURRENT_USER_ID;

  const handleUpdateName = (newName: string) => {
    setListName(newName);
    toast.success('Název upraven', {
      description: `Seznam byl přejmenován na "${newName}"`,
    });
  };

  const handleArchive = () => {
    toast.success('Seznam byl archivován', {
      description: `"${listName}" byl přesunut do archivu`,
    });
    // V reálné aplikaci by se zde provedla archivace na serveru
  };

  const handleAddItem = (name: string) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name,
      isResolved: false,
      createdAt: new Date(),
      createdBy: CURRENT_USER_ID,
    };
    setItems([newItem, ...items]);
    toast.success('Položka přidána', {
      description: `"${name}" byla přidána do seznamu`,
    });
  };

  const handleToggleItem = (id: string) => {
    const item = items.find(i => i.id === id);
    setItems(items.map(item =>
      item.id === id ? { ...item, isResolved: !item.isResolved } : item
    ));
    if (item) {
      toast.success(item.isResolved ? 'Položka označena jako nevyřešená' : 'Položka vyřešena');
    }
  };

  const handleDeleteItem = (id: string) => {
    const item = items.find(i => i.id === id);
    setItems(items.filter(item => item.id !== id));
    if (item) {
      toast.success('Položka smazána', {
        description: `"${item.name}" byla odstraněna`,
      });
    }
  };

  const handleAddMember = (memberName: string) => {
    // Simulace přidání člena
    const newMember: Member = {
      id: `user${Date.now()}`,
      name: memberName,
      role: 'member',
      addedAt: new Date(),
    };
    setMembers([...members, newMember]);
    toast.success('Člen přidán', {
      description: `${memberName} byl přidán do seznamu`,
    });
  };

  const handleRemoveMember = (userId: string) => {
    const member = members.find(m => m.id === userId);
    setMembers(members.filter(member => member.id !== userId));
    if (member) {
      toast.success('Člen odebrán', {
        description: `${member.name} byl odebrán ze seznamu`,
      });
    }
  };

  const unresolvedCount = items.filter(item => !item.isResolved).length;
  const totalCount = items.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
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

        <DetailHeader
          listName={listName}
          isOwner={isOwner}
          onBack={onBack}
          onUpdateName={handleUpdateName}
          onArchive={handleArchive}
        />

        {/* Statistiky */}
        <div className="mb-6 flex gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium">{unresolvedCount}</span> nevyřešených položek
          </div>
          <div>
            <span className="font-medium">{totalCount}</span> celkem
          </div>
          <div>
            <span className="font-medium">{members.length}</span> {members.length === 1 ? 'člen' : members.length < 5 ? 'členové' : 'členů'}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ItemsSection
              items={items}
              onAddItem={handleAddItem}
              onToggleItem={handleToggleItem}
              onDeleteItem={handleDeleteItem}
            />
          </div>

          <div className="order-1 lg:order-2">
            <MembersSection
              members={members}
              currentUserId={CURRENT_USER_ID}
              isOwner={isOwner}
              onAddMember={handleAddMember}
              onRemoveMember={handleRemoveMember}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
