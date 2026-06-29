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
      options: ['Paneer / Tofu / Sprouts', 'Oats / Idli / Poha'],
      time: '8:00 AM'
    },
    {
      id: 'lunch',
      name: 'Lunch',
      options: ['Chapati', 'Dal', 'Paneer / Soya Chunks', 'Vegetables', 'Curd'],
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
      options: ['Whey Protein / Soya Milk / Roasted Chana'],
      time: '7:30 PM'
    },
    {
      id: 'dinner',
      name: 'Dinner',
      options: ['Paneer / Tofu + Vegetables', 'Light Dal'],
      time: '9:00 PM'
    }
  ]
};
