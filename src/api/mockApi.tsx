// src/api/mockApi.ts
import { MOCK_LISTS } from './mockData';
import { Member, ShoppingItem, ShoppingList } from './types';

// "Databáze" v paměti
let db: ShoppingList[] = structuredClone(MOCK_LISTS);

// malá pomocná pauza, ať to vypadá jako reálné volání
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const mockApi = {
    async getLists(): Promise<ShoppingList[]> {
        await delay(150);
        return structuredClone(db);
    },

    async createList(name: string, ownerId: string, ownerName: string): Promise<ShoppingList> {
        await delay(150);
        const now = new Date();

        const newList: ShoppingList = {
            id: Date.now().toString(),
            name: name.trim(),
            ownerId,
            isArchived: false,
            createdAt: now,
            items: [],
            members: [
                {
                    id: ownerId,
                    name: ownerName,
                    role: 'owner',
                    addedAt: now,
                },
            ],
        };

        db = [newList, ...db];
        return structuredClone(newList);
    },

    async deleteList(id: string): Promise<void> {
        await delay(100);
        db = db.filter((l) => l.id !== id);
    },

    async toggleArchiveList(id: string): Promise<ShoppingList> {
        await delay(100);
        const list = db.find((l) => l.id === id);
        if (!list) throw new Error('List not found');
        list.isArchived = !list.isArchived;
        return structuredClone(list);
    },

    async updateListName(id: string, name: string): Promise<ShoppingList> {
        await delay(100);
        const list = db.find((l) => l.id === id);
        if (!list) throw new Error('List not found');
        list.name = name.trim();
        return structuredClone(list);
    },

    async addItem(listId: string, name: string, createdBy: string): Promise<ShoppingItem> {
        await delay(120);
        const list = db.find((l) => l.id === listId);
        if (!list) throw new Error('List not found');

        const newItem: ShoppingItem = {
            id: Date.now().toString(),
            name: name.trim(),
            isResolved: false,
            createdAt: new Date(),
            createdBy,
        };

        list.items.unshift(newItem);
        return structuredClone(newItem);
    },

    async toggleItemResolved(listId: string, itemId: string): Promise<ShoppingItem> {
        await delay(80);
        const list = db.find((l) => l.id === listId);
        if (!list) throw new Error('List not found');
        const item = list.items.find((i) => i.id === itemId);
        if (!item) throw new Error('Item not found');

        item.isResolved = !item.isResolved;
        return structuredClone(item);
    },

    async deleteItem(listId: string, itemId: string): Promise<void> {
        await delay(80);
        const list = db.find((l) => l.id === listId);
        if (!list) throw new Error('List not found');

        list.items = list.items.filter((i) => i.id !== itemId);
    },

    async addMemberByName(listId: string, memberName: string): Promise<Member> {
        await delay(120);
        const list = db.find((l) => l.id === listId);
        if (!list) throw new Error('List not found');

        const newMember: Member = {
            id: `user${Date.now()}`,
            name: memberName.trim(),
            role: 'member',
            addedAt: new Date(),
        };

        list.members.push(newMember);
        return structuredClone(newMember);
    },

    async removeMember(listId: string, memberId: string): Promise<void> {
        await delay(120);
        const list = db.find((l) => l.id === listId);
        if (!list) throw new Error('List not found');

        list.members = list.members.filter((m) => m.id !== memberId);
    },
};
