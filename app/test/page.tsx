'use client'

import { useState } from 'react'

const testimonials = ['Great product!', 'Very easy to use!', 'Amazing support!', 'Would recommend!']

export default function ShowTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0))
  //   }, 3000)

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  const handleNext = () => {
    console.log('Next')
    setCurrentIndex((prevIndex) => (prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0))
  }

  const handlePrevious = () => {
    console.log('Previous')
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }
  return (
    <>
      <p>{testimonials[currentIndex]}</p>
      <button type="button" onClick={handlePrevious} className="mr-8">
        Previous
      </button>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </>
  )
}
