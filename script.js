window.addEventListener("DOMContentLoaded", () => {
fetchMeals ();
});
const fetchMeals = async () => {
    const response = await 
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");
    const data = await response.json();
    const meals = data.meals.slice(0, 25);

    displayMeals(meals);
};

 const  getIngredients = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 5; i++) {
        const ingredient =
        meal[`strIngredients${i}`]
        const measure = meal[`strMeasure${i}`];

        if (ingredient) {
            ingredients.push(`${ingredient} - $ {measure}`);
        }
    }
    return ingredients;
};

const displayMeals = (meals) => {
    const mealList = 
    document.getElementById("meal-list");

    meals.forEach(meal => {
        const ingredients = getIngredients(meal);

        const mealCard = document.createElement("div");
        mealCard.classList.add("meal-card");

        mealCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
        <p>${meal.strInstructions.slice(0, 100)}...<p>
        <ul>
        ${ingredients.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <a href="${meal.strYoutube}" target="_blank">Watch Recipe</a>
    `;

    mealList.appendChild(mealCard);
    });
};
