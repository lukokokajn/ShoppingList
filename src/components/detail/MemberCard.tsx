import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { UserMinus } from 'lucide-react';
import type { Member } from '../ShoppingListDetail';

interface MemberCardProps {
  member: Member;
  isOwner: boolean;
  canRemove: boolean;
  onRemove: (id: string) => void;
}

export function MemberCard({ member, isOwner, canRemove, onRemove }: MemberCardProps) {
  const initials = member.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors">
      <Avatar className="w-10 h-10">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="truncate">{member.name}</p>
        <div className="flex items-center gap-2">
          {member.role === 'owner' && (
            <Badge variant="secondary">Vlastník</Badge>
          )}
        </div>
      </div>

      {canRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(member.id)}
          className="h-8 w-8"
        >
          <UserMinus className="w-4 h-4 text-destructive" />
        </Button>
      )}
    </div>
  );
}
