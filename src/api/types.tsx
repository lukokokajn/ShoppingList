
export interface ShoppingItem {
    id: string;
    name: string;
    isResolved: boolean;
    createdAt: Date;
    createdBy: string;
}

export interface Member {
    id: string;
    name: string;
    role: 'owner' | 'member';
    addedAt: Date;
}

export interface ShoppingList {
    id: string;
    name: string;
    items: ShoppingItem[];
    members: Member[];
    ownerId: string;
    isArchived: boolean;
    createdAt: Date;
}
