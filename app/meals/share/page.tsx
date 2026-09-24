import ImagePicker from '@/components/meals/image-picker'
import { shareMeal } from '@/lib/actions'

export default function ShareMealPage() {
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
        <form className="max-w-200" action={shareMeal}>
          <div className="flex gap-4">
            <p className="w-full">
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
            </p>

            <p className="w-full">
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
            </p>
          </div>
          <p>
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
          </p>
          <p>
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
          </p>
          <p>
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
          </p>
          <ImagePicker label="Your image" name="image" />
          <p className="text-right">
            <button
              type="submit"
              className="cursor-pointer rounded-xs border-0 bg-linear-to-r from-[#f9572a] to-[#ff9b05] px-8 py-3 text-xl text-white shadow-[0_2px_5px_rgba(0,0,0,0.3)] hover:from-[#fd4715] hover:to-[#f9b241] focus:from-[#fd4715] focus:to-[#f9b241]"
            >
              Share Meal
            </button>
          </p>
        </form>
      </main>
    </>
  )
}
