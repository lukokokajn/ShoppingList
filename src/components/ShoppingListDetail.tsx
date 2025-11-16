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
  initialData: {
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
  };
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

const CURRENT_USER_ID = 'user1';

export function ShoppingListDetail({ listId, onBack, onBackToDocs, initialData }: ShoppingListDetailProps) {
  // Inicializace stavu s daty z props
  const [listName, setListName] = useState(initialData.name);
  const [items, setItems] = useState<ShoppingItem[]>(initialData.items);
  const [members, setMembers] = useState<Member[]>(initialData.members);

  const isOwner = initialData.ownerId === CURRENT_USER_ID;

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