import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Plus, Archive, Trash2 } from 'lucide-react';

interface SidebarProps {
  selectedListId: string;
  onSelectList: (id: string) => void;
}

const SHOPPING_LISTS = [
  {
    id: '1',
    name: 'Weekly Groceries',
    itemCount: 5,
    isArchived: false,
  },
  {
    id: '2',
    name: 'Party Supplies',
    itemCount: 3,
    isArchived: false,
  },
  {
    id: '3',
    name: 'Home Supplies',
    itemCount: 8,
    isArchived: false,
  },
];

const USER = {
  name: 'Jan Novák',
  email: 'jan@email.cz',
  avatar: 'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150&h=150'
};

export function Sidebar({ selectedListId, onSelectList }: SidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="mb-1">Shopping Lists</h2>
        <div className="flex items-center gap-2 mt-3">
          <ImageWithFallback 
            src={USER.avatar}
            alt={USER.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{USER.name}</p>
            <p className="text-xs text-muted-foreground truncate">{USER.email}</p>
          </div>
        </div>
      </div>

      {/* Create New List Button */}
      <div className="p-4 border-b border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New List</span>
        </button>
      </div>

      {/* Lists */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {SHOPPING_LISTS.filter(list => !list.isArchived).map(list => (
            <button
              key={list.id}
              onClick={() => onSelectList(list.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors group relative ${
                selectedListId === list.id 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className={selectedListId === list.id ? '' : 'text-foreground'}>
                    {list.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {list.itemCount} items remaining
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Archive className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Archive Section */}
      <div className="border-t border-gray-200 p-4">
        <button className="w-full text-left px-4 py-2 text-muted-foreground hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <Archive className="w-4 h-4" />
            <span>Show Archive Lists</span>
          </div>
        </button>
      </div>
    </div>
  );
}
