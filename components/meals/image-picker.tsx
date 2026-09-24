'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

export default function ImagePicker({ label, name }: { label: string; name?: string }) {
  const [pickedImage, setPickedImage] = useState<string | null>(null)
  const imageInput = useRef<HTMLInputElement>(null)

  function handlePickClick() {
    imageInput.current?.click()
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      setPickedImage(null)
      return
    }

    const fileReader = new FileReader()

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        setPickedImage(fileReader.result)
      }
    }

    fileReader.readAsDataURL(file)
  }

  return (
    <div className="flex items-start gap-6 mb-4 mt-4">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <div className="relative flex h-40 w-40 items-center justify-center border-2 border-[#a4abb9] text-center text-[#a4abb9]">
        {!pickedImage && <p className="m-0 p-4">No image picked yet.</p>}

        {pickedImage && (
          <Image
            src={pickedImage}
            alt="The image selected by the user."
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="mb-4 flex items-start gap-6">
        <input
          className="hidden"
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          required
          onChange={handleImageChange}
        />

        <button
          className="cursor-pointer rounded-xs border-0 bg-[#a4abb9] px-6 py-2 font-inherit hover:bg-[#b3b9c6] focus:bg-[#b3b9c6]"
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  )
}
