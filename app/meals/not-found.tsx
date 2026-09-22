import MessagePage from '@/components/feedback/message-page'

export default function NotFound() {
  return (
    <MessagePage
      title="Meal not found"
      message="Unfortunately, we could not find the requested page or meal data."
    />
  )
}
