const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat()
  const toNum = Number(num);

  return formatter.format(toNum);
};

export const tempMeals = {
  mon: {
    title: "Monday",
    meals: [
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
    ]
  },
  tue: {
    title: "Tuesday",
    meals: [
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
    ]
  },
  wed: {
    title: "Wednesday",
    meals: [
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
    ]
  },
  thur: {
    title: "Thursday",
    meals: [
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
    ]
  },
  fri: {
    title: "Friday",
    meals: [
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
      {
        img: "/temp_meal.png",
        mealName: "Suya Stir Fry Noodles",
        mealPrice: formatNumber(1000)
      },
    ]
  },
}