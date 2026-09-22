'use client'

import MessagePage from '@/components/feedback/message-page'

export default function Error() {
  return (
    <MessagePage
      title="An error occurred!"
      message="Failed to fetch meal data. Please try again later."
    />
  )
}
