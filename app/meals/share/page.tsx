'use client'

import ImagePicker from '@/components/meals/image-picker'
import { shareMeal } from '@/lib/actions'
import MealsFormSubmitButton from '@/components/meals/meals-form-submit'
import { useActionState } from 'react'

export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMeal, {
    errors: {},
  })

  return (
    <>
      <header className="mx-auto mt-12 mb-20 w-[90%] max-w-300 text-2xl text-[#ddd6cb]">
        <h1 className="font-['Montserrat']">
          Share your{' '}
          <span className="bg-linear-to-r from-[#f9572a] to-[#ff8a05] bg-clip-text text-transparent">
            favorite meal
          </span>
        </h1>

        <p>Or any other meal you feel needs sharing!</p>
      </header>

      <main className="mx-auto my-12 w-[90%] max-w-300">
        <form className="max-w-200" action={formAction}>
          <div className="flex gap-4">
            <div className="w-full">
              <label
                htmlFor="name"
                className="mb-2 block font-['Montserrat'] text-base font-bold text-[#b3aea5] uppercase"
              >
                Your name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                required
                className="block w-full rounded-sm border border-[#454952] bg-[#1c2027] px-4 py-2 font-['Montserrat'] text-xl text-[#ddd6cb] focus:bg-[#1f252d] focus:outline-[#f99f2a]"
              />
              {state.errors?.creator && (
                <p className="mt-1 text-sm font-medium text-red-400">{state.errors.creator[0]}</p>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="mb-2 block font-['Montserrat'] text-base font-bold text-[#b3aea5] uppercase"
              >
                Your email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full rounded-sm border border-[#454952] bg-[#1c2027] px-4 py-2 font-['Montserrat'] text-xl text-[#ddd6cb] focus:bg-[#1f252d] focus:outline-[#f99f2a]"
              />
              {state.errors?.creator_email && (
                <p className="mt-1 text-sm font-medium text-red-400">
                  {state.errors.creator_email[0]}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-['Montserrat'] text-base font-bold text-[#b3aea5] uppercase"
            >
              Title
            </label>

            <input
              type="text"
              id="title"
              name="title"
              required
              className="block w-full rounded-sm border border-[#454952] bg-[#1c2027] px-4 py-2 font-['Montserrat'] text-xl text-[#ddd6cb] focus:bg-[#1f252d] focus:outline-[#f99f2a]"
            />
            {state.errors?.title && (
              <p className="mt-1 text-sm font-medium text-red-400">{state.errors.title[0]}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="summary"
              className="mb-2 block font-['Montserrat'] text-base font-bold text-[#b3aea5] uppercase"
            >
              Short Summary
            </label>

            <input
              type="text"
              id="summary"
              name="summary"
              required
              className="block w-full rounded-sm border border-[#454952] bg-[#1c2027] px-4 py-2 font-['Montserrat'] text-xl text-[#ddd6cb] focus:bg-[#1f252d] focus:outline-[#f99f2a]"
            />
            {state.errors?.summary && (
              <p className="mt-1 text-sm font-medium text-red-400">{state.errors.summary[0]}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="instructions"
              className="mb-2 block font-['Montserrat'] text-base font-bold text-[#b3aea5] uppercase"
            >
              Instructions
            </label>

            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
              className="block w-full rounded-sm border border-[#454952] bg-[#1c2027] px-4 py-2 font-['Montserrat'] text-xl text-[#ddd6cb] focus:bg-[#1f252d] focus:outline-[#f99f2a]"
            />
            {state.errors?.instructions && (
              <p className="mt-1 text-sm font-medium text-red-400">
                {state.errors.instructions[0]}
              </p>
            )}
          </div>
          <ImagePicker label="Your image" name="image" />
          <p className="text-right">
            <MealsFormSubmitButton />
          </p>
        </form>
      </main>
    </>
  )
}
