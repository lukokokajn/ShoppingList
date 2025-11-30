// src/api/realApi.ts
import { Member, ShoppingItem, ShoppingList } from './types';

const BASE_URL = '/api'; // až budeš mít skutečný backend, změníš

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const res = await fetch(input, {
        headers: { 'Content-Type': 'application/json' },
        ...init,
    });
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}

export const realApi = {
    getLists(): Promise<ShoppingList[]> {
        return request(`${BASE_URL}/lists`);
    },

    createList(name: string, ownerId: string, ownerName: string): Promise<ShoppingList> {
        return request(`${BASE_URL}/lists`, {
            method: 'POST',
            body: JSON.stringify({ name, ownerId, ownerName }),
        });
    },

    deleteList(id: string): Promise<void> {
        return request(`${BASE_URL}/lists/${id}`, { method: 'DELETE' });
    },

    toggleArchiveList(id: string): Promise<ShoppingList> {
        return request(`${BASE_URL}/lists/${id}/archive`, { method: 'POST' });
    },

    updateListName(id: string, name: string): Promise<ShoppingList> {
        return request(`${BASE_URL}/lists/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name }),
        });
    },

    addItem(listId: string, name: string, createdBy: string): Promise<ShoppingItem> {
        return request(`${BASE_URL}/lists/${listId}/items`, {
            method: 'POST',
            body: JSON.stringify({ name, createdBy }),
        });
    },

    toggleItemResolved(listId: string, itemId: string): Promise<ShoppingItem> {
        return request(`${BASE_URL}/lists/${listId}/items/${itemId}/toggle`, {
            method: 'POST',
        });
    },

    deleteItem(listId: string, itemId: string): Promise<void> {
        return request(`${BASE_URL}/lists/${listId}/items/${itemId}`, {
            method: 'DELETE',
        });
    },

    addMemberByName(listId: string, memberName: string): Promise<Member> {
        return request(`${BASE_URL}/lists/${listId}/members`, {
            method: 'POST',
            body: JSON.stringify({ name: memberName }),
        });
    },

    removeMember(listId: string, memberId: string): Promise<void> {
        return request(`${BASE_URL}/lists/${listId}/members/${memberId}`, {
            method: 'DELETE',
        });
    },
};
