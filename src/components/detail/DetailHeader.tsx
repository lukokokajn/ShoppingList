import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ArrowLeft, MoreVertical, Archive, Edit2, Check, X } from 'lucide-react';

interface DetailHeaderProps {
  listName: string;
  isOwner: boolean;
  onBack: () => void;
  onUpdateName: (newName: string) => void;
  onArchive: () => void;
}

export function DetailHeader({ 
  listName, 
  isOwner, 
  onBack, 
  onUpdateName, 
  onArchive 
}: DetailHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(listName);

  const handleSave = () => {
    if (editedName.trim()) {
      onUpdateName(editedName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(listName);
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 sm:gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="max-w-md"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
            />
            <Button size="icon" variant="ghost" onClick={handleSave} className="shrink-0">
              <Check className="w-5 h-5 text-green-600" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel} className="shrink-0">
              <X className="w-5 h-5 text-red-600" />
            </Button>
          </div>
        ) : (
          <>
            <h1 className="flex-1 truncate">{listName}</h1>
            {isOwner && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsEditing(true)}
                className="shrink-0"
              >
                <Edit2 className="w-5 h-5" />
              </Button>
            )}
          </>
        )}

        {isOwner && !isEditing && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onArchive}>
                <Archive className="w-4 h-4 mr-2" />
                Archivovat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
