import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Edit2, Plus, Trash2, UserPlus, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';

interface MainContentProps {
  listId: string;
}

const LISTS_DATA = {
  '1': {
    name: 'Weekly Groceries',
    owner: 'Jan Novák',
    members: [
      {
        id: '1',
        name: 'Jane Doe',
        role: 'Owner' as const,
        email: 'jane@example.com',
        avatar: 'https://images.unsplash.com/photo-1690444963408-9573a17a8058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
      },
      {
        id: '2',
        name: 'John Smith',
        role: 'Member' as const,
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1684864271138-37a5118f8561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
      },
      {
        id: '3',
        name: 'Bob Wilson',
        role: 'Member' as const,
        email: 'bob@example.com',
        avatar: 'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
      }
    ],
    items: [
      { id: '1', name: 'Bread', addedBy: 'Ms. Emily Davis', resolved: false },
      { id: '2', name: 'Eggs', addedBy: 'Mr. Ivan Smith', resolved: false },
      { id: '3', name: 'Cheese', addedBy: 'Ms. Jane Wilson', resolved: false }
    ]
  },
  '2': {
    name: 'Party Supplies',
    owner: 'Jan Novák',
    members: [
      {
        id: '1',
        name: 'Jane Doe',
        role: 'Owner' as const,
        email: 'jane@example.com',
        avatar: 'https://images.unsplash.com/photo-1690444963408-9573a17a8058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
      },
      {
        id: '4',
        name: 'Sarah Johnson',
        role: 'Member' as const,
        email: 'sarah@example.com',
        avatar: 'https://images.unsplash.com/photo-1561065533-316e3142d586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
      }
    ],
    items: [
      { id: '1', name: 'Balloons', addedBy: 'Ms. Emily Davis', resolved: true },
      { id: '2', name: 'Cups', addedBy: 'Mr. Ivan Smith', resolved: false },
      { id: '3', name: 'Plates', addedBy: 'Ms. Jane Wilson', resolved: false }
    ]
  },
  '3': {
    name: 'Home Supplies',
    owner: 'Jan Novák',
    members: [
      {
        id: '1',
        name: 'Jane Doe',
        role: 'Owner' as const,
        email: 'jane@example.com',
        avatar: 'https://images.unsplash.com/photo-1690444963408-9573a17a8058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
      }
    ],
    items: [
      { id: '1', name: 'Soap', addedBy: 'Ms. Emily Davis', resolved: false },
      { id: '2', name: 'Shampoo', addedBy: 'Mr. Ivan Smith', resolved: false },
      { id: '3', name: 'Toothpaste', addedBy: 'Ms. Jane Wilson', resolved: true },
      { id: '4', name: 'Paper towels', addedBy: 'Ms. Emily Davis', resolved: false },
      { id: '5', name: 'Dish soap', addedBy: 'Mr. Ivan Smith', resolved: false }
    ]
  }
};

export function MainContent({ listId }: MainContentProps) {
  const data = LISTS_DATA[listId as keyof typeof LISTS_DATA] || LISTS_DATA['1'];
  const [isEditingName, setIsEditingName] = useState(false);
  const [listName, setListName] = useState(data.name);
  const [items, setItems] = useState(data.items);
  const [showResolved, setShowResolved] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const handleToggleItem = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, resolved: !item.resolved } : item
    ));
  };

  const handleAddItem = () => {
    if (newItemName.trim()) {
      const newItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        addedBy: 'You',
        resolved: false
      };
      setItems([...items, newItem]);
      setNewItemName('');
    }
  };

  const handleDeleteItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const displayedItems = showResolved 
    ? items 
    : items.filter(item => !item.resolved);

  const resolvedCount = items.filter(item => item.resolved).length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          {isEditingName ? (
            <>
              <Input
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="max-w-md"
                autoFocus
              />
              <button 
                onClick={() => setIsEditingName(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <h1>{listName}</h1>
              <button 
                onClick={() => setIsEditingName(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Edit2 className="w-5 h-5 text-gray-400" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-6xl">
          <div className="grid grid-cols-2 gap-8">
            {/* Members Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3>Members</h3>
                <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <UserPlus className="w-4 h-4" />
                  Add Member
                </button>
              </div>

              <div className="space-y-3">
                {data.members.map(member => (
                  <div key={member.id} className="flex items-center gap-3 group">
                    <ImageWithFallback 
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate">{member.name}</p>
                        {member.role === 'Owner' && (
                          <span className="bg-black text-white px-2 py-0.5 rounded text-xs">
                            {member.role}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                    </div>
                    {member.role !== 'Owner' && (
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Shopping Items Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3>Shopping Items</h3>
                <button 
                  onClick={() => setShowResolved(!showResolved)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {showResolved ? 'Hide' : 'Show'} resolved
                </button>
              </div>

              {/* Add new item */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new item..."
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                    className="flex-1"
                  />
                  <button 
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Items list */}
              <div className="space-y-2">
                {displayedItems.map(item => (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200"
                  >
                    <Checkbox
                      checked={item.resolved}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={item.resolved ? 'line-through text-muted-foreground' : ''}>
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Added by {item.addedBy}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-muted-foreground">
                  {resolvedCount} of {items.length} items resolved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
