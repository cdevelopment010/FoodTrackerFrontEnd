// src/services/FoodService.ts
const API_URL = '/api/food' // change if your backend is hosted elsewhere

export interface FoodEntry {
  type: 'good' | 'bad'
  notes?: string
  timestamp: string // ISO string
}

export default {
    async addFood(entry: FoodEntry) {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      })
      if (!res.ok) throw new Error('Failed to add food entry')
      return res.json()
    },
  
    async getAllFood(): Promise<FoodEntry[]> {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Failed to fetch food history')
      return res.json()
    },
  
    async deleteFood(id: string) {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete entry')
    },
  }
  