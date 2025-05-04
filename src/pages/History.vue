<template>
    <div>
      <h1>Food History</h1>
      <ul v-if="entries.length">
        <li v-for="entry in entries" :key="entry.id">
          <strong :style="{ color: entry.type === 'good' ? 'green' : 'red' }">
            {{ entry.type.toUpperCase() }}
          </strong>
          -
          {{ formatReadableDatetime(entry.timestamp) }}
          <span v-if="entry.notes">– {{ entry.notes }}</span>
          <button @click="deleteEntry(entry.id)">Delete</button>
        </li>
      </ul>
      <p v-else>No food logs yet.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import FoodService from '@/services/FoodService'
  import { formatReadableDatetime } from '@/utils/dateUtils'
  
  interface Entry {
    id: string
    type: 'good' | 'bad'
    notes?: string
    timestamp: string
  }
  
  const entries = ref<Entry[]>([])
  
  const fetchEntries = async () => {
    try {
      entries.value = await FoodService.getAllFood()
    } catch (err) {
      console.error(err)
      alert('Failed to load history')
    }
  }
  
  const deleteEntry = async (id: string) => {
    if (!confirm('Delete this entry?')) return
    try {
      await FoodService.deleteFood(id)
      entries.value = entries.value.filter(e => e.id !== id)
    } catch (err) {
      console.error(err)
      alert('Failed to delete entry')
    }
  }
  
  onMounted(fetchEntries)
  </script>
  