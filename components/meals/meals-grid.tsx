import MealItem from './meal-item'
import { Meal } from '@/types/meal'

type MealsGridProps = {
  meals: Meal[]
}

function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className="mx-auto my-8 grid w-[90%] max-w-360 list-none grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-20 p-0">
      {meals.map((meal, index) => (
        <li key={meal.id}>
          <MealItem {...meal} eager={index < 6} />
        </li>
      ))}
    </ul>
  )
}

export default MealsGrid
