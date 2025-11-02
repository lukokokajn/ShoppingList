import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface ListFilterProps {
  activeFilter: 'active' | 'archived';
  onFilterChange: (filter: 'active' | 'archived') => void;
}

export function ListFilter({ activeFilter, onFilterChange }: ListFilterProps) {
  return (
    <div className="mb-6">
      <Tabs value={activeFilter} onValueChange={(value) => onFilterChange(value as 'active' | 'archived')}>
        <TabsList>
          <TabsTrigger value="active">Aktivní seznamy</TabsTrigger>
          <TabsTrigger value="archived">Archivované</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
