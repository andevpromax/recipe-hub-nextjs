'use client'

import { useFormStatus } from 'react-dom'

export default function MealsFormSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type="submit"
      className="cursor-pointer rounded-xs border-0 bg-linear-to-r from-[#f9572a] to-[#ff9b05] px-8 py-3 text-xl text-white shadow-[0_2px_5px_rgba(0,0,0,0.3)] hover:from-[#fd4715] hover:to-[#f9b241] focus:from-[#fd4715] focus:to-[#f9b241]"
    >
      {pending ? 'Submitting...' : 'Share Meal'}
    </button>
  )
}
