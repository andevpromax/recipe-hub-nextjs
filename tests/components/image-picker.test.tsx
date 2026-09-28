// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'

import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ImagePicker from '@/components/meals/image-picker'

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

afterEach(() => {
  cleanup()
})

describe('ImagePicker', () => {
  it('should render image picker', () => {
    render(<ImagePicker label="Your image" name="image" />)

    expect(screen.getByText('No image picked yet.')).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Pick an Image',
      }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('Your image')).toBeRequired()
  })

  it('should allow user to select an image', async () => {
    const user = userEvent.setup()

    render(<ImagePicker label="Your image" name="image" />)

    const input = screen.getByLabelText('Your image') as HTMLInputElement

    const file = new File(['fake image content'], 'burger.jpg', {
      type: 'image/jpeg',
    })

    await user.upload(input, file)

    expect(input.files).toHaveLength(1)
    expect(input.files?.[0]).toBe(file)
  })

  it('should show image preview after selecting a file', async () => {
    const user = userEvent.setup()

    render(<ImagePicker label="Your image" name="image" />)

    const input = screen.getByLabelText('Your image') as HTMLInputElement

    const file = new File(['fake image content'], 'burger.jpg', {
      type: 'image/jpeg',
    })

    await user.upload(input, file)

    const previewImage = await screen.findByRole('img', {
      name: 'The image selected by the user.',
    })

    expect(previewImage).toBeInTheDocument()

    expect(screen.queryByText('No image picked yet.')).not.toBeInTheDocument()
  })

  it('should open file input when Pick an Image button is clicked', async () => {
    const user = userEvent.setup()

    render(<ImagePicker label="Your image" name="image" />)

    const input = screen.getByLabelText('Your image') as HTMLInputElement

    const button = screen.getByRole('button', {
      name: 'Pick an Image',
    })

    const clickSpy = vi.spyOn(input, 'click')

    await user.click(button)

    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('should accept only PNG and JPEG images', () => {
    render(<ImagePicker label="Your image" name="image" />)

    const input = screen.getByLabelText('Your image')

    expect(input).toHaveAttribute('accept', 'image/png, image/jpeg')
  })

  it('should update preview when user selects another image', async () => {
    const user = userEvent.setup()

    render(<ImagePicker label="Your image" name="image" />)

    const input = screen.getByLabelText('Your image') as HTMLInputElement

    const firstFile = new File(['first image'], 'burger.jpg', {
      type: 'image/jpeg',
    })

    const secondFile = new File(['second image'], 'pizza.png', {
      type: 'image/png',
    })

    await user.upload(input, firstFile)

    const previewImage = await screen.findByRole('img', {
      name: 'The image selected by the user.',
    })

    const firstSrc = previewImage.getAttribute('src')

    await user.upload(input, secondFile)

    expect(input.files?.[0]).toBe(secondFile)

    await waitFor(() => {
      expect(previewImage.getAttribute('src')).not.toBe(firstSrc)
    })
  })
})
