// src/utils/dateUtils.ts

/**
 * Returns a local datetime string formatted for <input type="datetime-local">
 * Example: "2025-05-04T14:30"
 */
export function getLocalDatetimeInputValue(date: Date = new Date()): string {
    const offset = date.getTimezoneOffset()
    const local = new Date(date.getTime() - offset * 60 * 1000)
    return local.toISOString().slice(0, 16)
  }
  
  /**
   * Formats an ISO string (or Date) into a human-readable datetime
   * Example: "May 4, 2025 at 2:30 PM"
   */
  export function formatReadableDatetime(input: string | Date): string {
    const date = typeof input === 'string' ? new Date(input) : input
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  