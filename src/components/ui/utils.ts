type HealthRating = 'green' | 'yellow' | 'red';

interface NutritionScore {
  rating: HealthRating;
  score: number;
  details: string[];
}

export function calculateHealthScore(nutrition: Recipe['nutrition']): NutritionScore {
  let totalPoints = 0;
  const details: string[] = [];

  // Calories
  if (nutrition.calories <= 500) {
    totalPoints += 2;
    details.push('Low calorie meal');
  } else if (nutrition.calories <= 800) {
    totalPoints += 1;
    details.push('Moderate calories');
  } else {
    details.push('High in calories');
  }

  // Total Fat
  if (nutrition.total_fat < 10) {
    totalPoints += 2;
    details.push('Low in fat');
  } else if (nutrition.total_fat <= 20) {
    totalPoints += 1;
  }

  // Saturated Fat
  if (nutrition.saturated_fat < 3) {
    totalPoints += 2;
    details.push('Low in saturated fat');
  } else if (nutrition.saturated_fat <= 5) {
    totalPoints += 1;
  }

  // Sugars
  if (nutrition.sugars < 5) {
    totalPoints += 2;
    details.push('Low in sugar');
  } else if (nutrition.sugars <= 10) {
    totalPoints += 1;
  }

  // Fiber
  if (nutrition.fiber > 5) {
    totalPoints += 2;
    details.push('High in fiber');
  } else if (nutrition.fiber >= 2) {
    totalPoints += 1;
  }

  // Protein
  if (nutrition.protein > 15) {
    totalPoints += 2;
    details.push('High in protein');
  } else if (nutrition.protein >= 5) {
    totalPoints += 1;
  }

  // Sodium
  if (nutrition.sodium < 140) {
    totalPoints += 2;
    details.push('Low in sodium');
  } else if (nutrition.sodium <= 400) {
    totalPoints += 1;
  }

  const percentage = (totalPoints / (2 * 7)) * 100;

  const rating: HealthRating = 
    percentage >= 75 ? 'green' :
    percentage >= 50 ? 'yellow' : 'red';

  return {
    rating,
    score: Math.round(percentage),
    details
  };
}