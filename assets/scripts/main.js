// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. Retrieve recipes from localStorage, parse them, and return as an array. If none found, return an empty array.
  const recipes = localStorage.getItem('recipes');
  return recipes ? JSON.parse(recipes) : [];
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // B1. Save the recipes array to localStorage
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. Get a reference to the <main> element
  const main = document.querySelector('main');
  
  // A11. Loop through each recipe, create a <recipe-card> element, set its data, and append it to <main>
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipe;
    main.appendChild(recipeCard);
  });
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
  // B2. Get a reference to the <form> element
  const form = document.querySelector('form');
  
  // B3. Add an event listener for the 'submit' event, which fires when the submit button is clicked
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // B4. Create a new FormData object from the <form> element reference above
    const formData = new FormData(form);
    
    // B5. Create an empty object and then extract the keys and values from the FormData object
    const recipeObject = {};
    formData.forEach((value, key) => {
      recipeObject[key] = value;
    });

    // B6. Create a new <recipe-card> element
    const recipeCard = document.createElement('recipe-card');
    
    // B7. Add the recipeObject data to <recipe-card> using element.data
    recipeCard.data = recipeObject;
    
    // B8. Append this new <recipe-card> to <main>
    const main = document.querySelector('main');
    main.appendChild(recipeCard);

    // B9. Get the recipes array from localStorage, add this new recipe to it, and then save the array back to localStorage
    let recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
    
    // Reset the form
    form.reset();
  });

  // B10. Get a reference to the "Clear Local Storage" button
  const clearButton = document.querySelector('.danger');
  
  // B11. Add a click event listener to the clear storage button
  clearButton.addEventListener('click', () => {
    // B12. Clear the local storage
    localStorage.clear();
    
    // B13. Delete the contents of <main>
    const main = document.querySelector('main');
    main.innerHTML = '';
  });
}
