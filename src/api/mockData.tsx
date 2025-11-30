import { ShoppingList } from './types';

export const MOCK_LISTS: ShoppingList[] = [
    {
        id: '1',
        name: 'Týdenní nákup',
        ownerId: 'user1',
        isArchived: false,
        createdAt: new Date('2025-10-10'),
        items: [
            { id: '1', name: 'Mléko', isResolved: false, createdAt: new Date('2025-10-28'), createdBy: 'user1' },
            { id: '2', name: 'Chléb', isResolved: true,  createdAt: new Date('2025-10-28'), createdBy: 'user2' },
            { id: '3', name: 'Máslo', isResolved: false, createdAt: new Date('2025-10-29'), createdBy: 'user1' },
            { id: '4', name: 'Vajíčka', isResolved: false, createdAt: new Date('2025-10-30'), createdBy: 'user1' },
            { id: '5', name: 'Rajčata', isResolved: true,  createdAt: new Date('2025-10-30'), createdBy: 'user2' },
            { id: '6', name: 'Sýr',   isResolved: false, createdAt: new Date('2025-10-31'), createdBy: 'user3' },
            { id: '7', name: 'Jogurt', isResolved: false, createdAt: new Date('2025-11-01'), createdBy: 'user1' },
        ],
        members: [
            { id: 'user1', name: 'Jan Novák',       role: 'owner',  addedAt: new Date('2025-10-10') },
            { id: 'user2', name: 'Marie Nováková',  role: 'member', addedAt: new Date('2025-10-11') },
            { id: 'user3', name: 'Petr Svoboda',    role: 'member', addedAt: new Date('2025-10-15') },
        ],
    },
    {
        id: '2',
        name: 'Party potřeby',
        ownerId: 'user2',
        isArchived: false,
        createdAt: new Date('2025-10-15'),
        items: [
            { id: '1', name: 'Balónky',          isResolved: true,  createdAt: new Date('2025-10-25'), createdBy: 'user2' },
            { id: '2', name: 'Papírové talíře',  isResolved: false, createdAt: new Date('2025-10-26'), createdBy: 'user2' },
            { id: '3', name: 'Kelímky',          isResolved: false, createdAt: new Date('2025-10-26'), createdBy: 'user1' },
            { id: '4', name: 'Ubrousky',         isResolved: false, createdAt: new Date('2025-10-27'), createdBy: 'user2' },
            { id: '5', name: 'Nápoje',           isResolved: false, createdAt: new Date('2025-10-28'), createdBy: 'user1' },
        ],
        members: [
            { id: 'user2', name: 'Marie Nováková',  role: 'owner',  addedAt: new Date('2025-10-15') },
            { id: 'user1', name: 'Jan Novák',       role: 'member', addedAt: new Date('2025-10-16') },
            { id: 'user4', name: 'Anna Dvořáková',  role: 'member', addedAt: new Date('2025-10-17') },
        ],
    },
    {
        id: '3',
        name: 'Domácí potřeby',
        ownerId: 'user1',
        isArchived: false,
        createdAt: new Date('2025-10-05'),
        items: [
            { id: '1', name: 'Mýdlo',             isResolved: false, createdAt: new Date('2025-10-20'), createdBy: 'user1' },
            { id: '2', name: 'Šampon',            isResolved: false, createdAt: new Date('2025-10-21'), createdBy: 'user1' },
            { id: '3', name: 'Zubní pasta',       isResolved: true,  createdAt: new Date('2025-10-22'), createdBy: 'user1' },
            { id: '4', name: 'Papírové ručníky',  isResolved: false, createdAt: new Date('2025-10-23'), createdBy: 'user1' },
        ],
        members: [
            { id: 'user1', name: 'Jan Novák', role: 'owner', addedAt: new Date('2025-10-05') },
        ],
    },
    {
        id: '4',
        name: 'Vánoční nákup 2024',
        ownerId: 'user1',
        isArchived: true,
        createdAt: new Date('2024-11-20'),
        items: [
            { id: '1', name: 'Dárky',  isResolved: true, createdAt: new Date('2024-12-01'), createdBy: 'user1' },
            { id: '2', name: 'Stromek',isResolved: true, createdAt: new Date('2024-12-05'), createdBy: 'user1' },
            { id: '3', name: 'Ozdoby', isResolved: true, createdAt: new Date('2024-12-10'), createdBy: 'user2' },
        ],
        members: [
            { id: 'user1', name: 'Jan Novák',      role: 'owner',  addedAt: new Date('2024-11-20') },
            { id: 'user2', name: 'Marie Nováková', role: 'member', addedAt: new Date('2024-11-21') },
        ],
    },
];
