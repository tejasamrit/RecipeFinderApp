const apiKey = "3f98c843415c4b158fd98724afbb83d4"; // Replace with your real API key
const recipeDetailsContainer = document.getElementById('recipe-details');

async function fetchRecipeDetails(id) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        const recipe = await response.json();

        recipeDetailsContainer.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h2>${recipe.title}</h2>
            <p><strong>Ingredients:</strong><br> ${recipe.extendedIngredients.map(ing => ing.original).join('<br>')}</p>
            <p><strong>Instructions:</strong><br> ${recipe.instructions ? recipe.instructions : "No instructions available."}</p>
            <a href="index.html" class="back-btn">⬅️ Back to Home</a>
        `;

    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const recipeId = localStorage.getItem('selectedRecipeId');
    if (recipeId) {
        fetchRecipeDetails(recipeId);
    } else {
        recipeDetailsContainer.innerHTML = "<p>No recipe selected!</p>";
    }
});
