async function MealsDynamic({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <>
      <h1 className="text-center text-white">Meals Dynamic Page!</h1>
      params: {slug}
    </>
  )
}

export default MealsDynamic
