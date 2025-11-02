import { useState } from 'react';
import { MemberCard } from './MemberCard';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { UserPlus } from 'lucide-react';
import type { Member } from '../ShoppingListDetail';

interface MembersSectionProps {
  members: Member[];
  currentUserId: string;
  isOwner: boolean;
  onAddMember: (memberName: string) => void;
  onRemoveMember: (userId: string) => void;
}

export function MembersSection({ 
  members, 
  currentUserId,
  isOwner, 
  onAddMember, 
  onRemoveMember 
}: MembersSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const handleAddMember = () => {
    if (newMemberEmail.trim()) {
      // V reálné aplikaci by se zde posílal email, ale pro demo použijeme email jako jméno
      onAddMember(newMemberEmail.trim());
      setNewMemberEmail('');
      setIsAdding(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3>Členové</h3>
        <span className="text-sm text-muted-foreground">
          {members.length} {members.length === 1 ? 'člen' : members.length < 5 ? 'členové' : 'členů'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {members.map(member => (
          <MemberCard
            key={member.id}
            member={member}
            isOwner={isOwner}
            canRemove={
              isOwner && member.role !== 'owner' || 
              !isOwner && member.id === currentUserId
            }
            onRemove={onRemoveMember}
          />
        ))}
      </div>

      {isOwner && (
        <>
          {isAdding ? (
            <div className="space-y-2">
              <Input
                placeholder="Jméno nového člena..."
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddMember()}
                autoFocus
              />
              <div className="flex gap-2">
                <Button onClick={handleAddMember} className="flex-1">
                  Přidat
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAdding(false);
                    setNewMemberEmail('');
                  }}
                >
                  Zrušit
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={() => setIsAdding(true)}
            >
              <UserPlus className="w-4 h-4" />
              Pozvat člena
            </Button>
          )}
        </>
      )}
    </Card>
  );
}
