import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { ListChecks, Archive } from 'lucide-react';

interface ListFilterProps {
  activeFilter: 'active' | 'archived';
  onFilterChange: (filter: 'active' | 'archived') => void;
}

export function ListFilter({ activeFilter, onFilterChange }: ListFilterProps) {
  return (
    <div className="mb-8">
      <Tabs value={activeFilter} onValueChange={(value) => onFilterChange(value as 'active' | 'archived')}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="active" className="gap-2">
            <ListChecks className="w-4 h-4" />
            Aktivní seznamy
          </TabsTrigger>
          <TabsTrigger value="archived" className="gap-2">
            <Archive className="w-4 h-4" />
            Archivované
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
