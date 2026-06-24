export const dietPlan = {
  dailyTargets: {
    protein: '120-140g',
    water: '3-4 Litres',
    calories: '2200 kcal' // default target based on goal
  },
  meals: [
    {
      id: 'breakfast',
      name: 'Breakfast',
      options: ['Eggs / Paneer / Sprouts', 'Oats / Idli'],
      time: '8:00 AM'
    },
    {
      id: 'lunch',
      name: 'Lunch',
      options: ['Chapati', 'Dal', 'Chicken / Paneer', 'Vegetables', 'Curd'],
      time: '1:00 PM'
    },
    {
      id: 'preworkout',
      name: 'Pre-workout',
      options: ['Banana', 'Coffee'],
      time: '5:00 PM'
    },
    {
      id: 'postworkout',
      name: 'Post-workout',
      options: ['Whey Protein / Eggs'],
      time: '7:30 PM'
    },
    {
      id: 'dinner',
      name: 'Dinner',
      options: ['Protein + Vegetables'],
      time: '9:00 PM'
    }
  ]
};
