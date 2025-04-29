const apiKey = "your_api_key"; // Replace with your real API key
const searchBtn = document.getElementById('search-btn');
const ingredientInput = document.getElementById('ingredient-input');
const recipeList = document.getElementById('recipe-list');

async function fetchRecipes(ingredients) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${ingredients}&number=9&apiKey=${apiKey}`);
        const data = await response.json();
        const recipes = data.results;

        recipeList.innerHTML = '';

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <button class="view-btn" onclick="viewRecipe(${recipe.id})">View Recipe</button>
            `;
            recipeList.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function viewRecipe(id) {
    localStorage.setItem('selectedRecipeId', id);
    window.location.href = 'recipe.html';
}

searchBtn.addEventListener('click', () => {
    const ingredients = ingredientInput.value.trim();
    if (ingredients) {
        fetchRecipes(ingredients);
    } else {
        alert('Please enter some ingredients!');
    }
});
