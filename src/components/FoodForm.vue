<template>
    <form @submit.prevent="submitEntry">
      <div>
        <label>
          <input type="radio" value="good" v-model="form.type" /> Good
        </label>
        <label>
          <input type="radio" value="bad" v-model="form.type" /> Bad
        </label>
        <label>
          <input type="radio" value="hypo" v-model="form.type" /> Hypo
        </label>
      </div>
  
      <div>
        <label>Notes</label>
        <input type="text" v-model="form.notes" placeholder="Optional note" />
      </div>
  
      <div>
        <label>Date/Time</label>
        <input type="datetime-local" v-model="form.date" />
      </div>
  
      <button type="submit">Add Entry</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import FoodService from '@/services/FoodService'
  import { getLocalDatetimeInputValue } from '@/utils/dateUtils'
  
  const now = getLocalDatetimeInputValue() // format for datetime-local input
  
  const form = ref({
    type: 'good',
    notes: '',
    date: now
  })
  
  const submitEntry = async () => {
    try {
      await FoodService.addFood({
        type: form.value.type,
        notes: form.value.notes,
        timestamp: new Date(form.value.date).toISOString()
      })
      alert('Entry added!')
      // optionally reset form or redirect
    } catch (err) {
      console.error(err)
      alert('Failed to add entry')
    }
  }
  </script>
  