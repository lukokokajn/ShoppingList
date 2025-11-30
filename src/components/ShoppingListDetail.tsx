import { useState } from 'react';
import { DetailHeader } from './detail/DetailHeader';
import { ItemsSection } from './detail/ItemsSection';
import { MembersSection } from './detail/MembersSection';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../api';
import { Member, ShoppingItem, ShoppingList } from '../api/types';

interface ShoppingListDetailProps {
  list: ShoppingList;
  currentUserId: string;
  onBack: () => void;
  onBackToDocs?: () => void;
  onDelete?: () => void;
  onListChange: (list: ShoppingList) => void;
}

export function ShoppingListDetail({
                                     list,
                                     currentUserId,
                                     onBack,
                                     onBackToDocs,
                                     onDelete,
                                     onListChange,
                                   }: ShoppingListDetailProps) {
  // lokální UI state, ale primárně se opíráme o data z backendu
  const [listName, setListName] = useState(list.name);
  const [items, setItems] = useState<ShoppingItem[]>(list.items);
  const [members, setMembers] = useState<Member[]>(list.members);

  const isOwner = list.ownerId === currentUserId;

  // Pomocná funkce – po každé změně aktualizuje rodiče (App), aby měl čerstvý list
  const syncAndPropagate = (updatedPartial?: Partial<ShoppingList>) => {
    const updated: ShoppingList = {
      ...list,
      name: updatedPartial?.name ?? listName,
      items: updatedPartial?.items ?? items,
      members: updatedPartial?.members ?? members,
      isArchived: updatedPartial?.isArchived ?? list.isArchived,
    };
    onListChange(updated);
  };

  const handleUpdateName = async (newName: string) => {
    if (!newName.trim()) {
      toast.error('Název nesmí být prázdný');
      return;
    }

    try {
      const updated = await api.updateListName(list.id, newName.trim());
      setListName(updated.name);
      setItems(updated.items);
      setMembers(updated.members);
      syncAndPropagate(updated);
      toast.success('Název upraven', {
        description: `Seznam byl přejmenován na "${updated.name}"`,
      });
    } catch (e) {
      console.error(e);
      toast.error('Nepodařilo se upravit název seznamu');
    }
  };

  const handleArchive = async () => {
    try {
      const updated = await api.toggleArchiveList(list.id);
      syncAndPropagate(updated);
      toast.success(
          updated.isArchived ? 'Seznam archivován' : 'Seznam obnoven',
          {
            description: `"${updated.name}" byl úspěšně ${
                updated.isArchived ? 'archivován' : 'obnoven'
            }`,
          }
      );
    } catch (e) {
      console.error(e);
      toast.error('Nepodařilo se změnit stav seznamu');
    }
  };

  const handleAddItem = async (name: string) => {
    if (!name.trim()) {
      toast.error('Název položky nesmí být prázdný');
      return;
    }

    try {
      const newItem = await api.addItem(list.id, name.trim(), currentUserId);
      const newItems = [newItem, ...items];
      setItems(newItems);
      syncAndPropagate({ items: newItems });
      toast.success('Položka přidána', {
        description: `"${name}" byla přidána do seznamu`,
      });
    } catch (e) {
      console.error(e);
      toast.error('Nepodařilo se přidat položku');
    }
  };

  const handleToggleItem = async (id: string) => {
    try {
      const updatedItem = await api.toggleItemResolved(list.id, id);
      const newItems = items.map((i) => (i.id === updatedItem.id ? updatedItem : i));
      setItems(newItems);
      syncAndPropagate({ items: newItems });

      toast.success(
          updatedItem.isResolved
              ? 'Položka vyřešena'
              : 'Položka označena jako nevyřešená'
      );
    } catch (e) {
      console.error(e);
      toast.error('Nepodařilo se změnit stav položky');
    }
  };

  const handleDeleteItem = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    try {
      await api.deleteItem(list.id, id);
      const newItems = items.filter((i) => i.id !== id);
      setItems(newItems);
      syncAndPropagate({ items: newItems });
      toast.success('Položka smazána', {
        description: `"${item.name}" byla odstraněna`,
      });
    } catch (e) {
      console.error(e);
      toast.error('Nepodařilo se smazat položku');
    }
  };

  const handleAddMember = async (memberName: string) => {
    if (!memberName.trim()) {
      toast.error('Jméno člena nesmí být prázdné');
      return;
    }

    try {
      const newMember = await api.addMemberByName(list.id, memberName.trim());
      const newMembers = [...members, newMember];
      setMembers(newMembers);
      syncAndPropagate({ members: newMembers });
      toast.success('Člen přidán', {
        description: `${memberName} byl přidán do seznamu`,
      });
    } catch (e) {
      console.error(e);
      toast.error('Nepodařilo se přidat člena');
    }
  };

  const handleRemoveMember = async (userId: string) => {
    const member = members.find((m) => m.id === userId);
    if (!member) return;

    try {
      await api.removeMember(list.id, userId);
      const newMembers = members.filter((m) => m.id !== userId);
      setMembers(newMembers);
      syncAndPropagate({ members: newMembers });
      toast.success('Člen odebrán', {
        description: `${member.name} byl odebrán ze seznamu`,
      });
    } catch (e) {
      console.error(e);
      toast.error('Nepodařilo se odebrat člena');
    }
  };

  const unresolvedCount = items.filter((item) => !item.isResolved).length;
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
              onDelete={onDelete}
          />

          {/* Statistiky */}
          <div className="mb-6 flex gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">{unresolvedCount}</span> nevyřešených
              položek
            </div>
            <div>
              <span className="font-medium">{totalCount}</span> celkem
            </div>
            <div>
              <span className="font-medium">{members.length}</span>{' '}
              {members.length === 1
                  ? 'člen'
                  : members.length < 5
                      ? 'členové'
                      : 'členů'}
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
                  currentUserId={currentUserId}
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
