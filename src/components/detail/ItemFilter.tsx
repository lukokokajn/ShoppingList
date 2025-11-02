import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface ItemFilterProps {
  activeFilter: 'all' | 'unresolved';
  onFilterChange: (filter: 'all' | 'unresolved') => void;
}

export function ItemFilter({ activeFilter, onFilterChange }: ItemFilterProps) {
  return (
    <Tabs value={activeFilter} onValueChange={(value) => onFilterChange(value as 'all' | 'unresolved')}>
      <TabsList>
        <TabsTrigger value="unresolved">Nevyřešené</TabsTrigger>
        <TabsTrigger value="all">Všechny</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
