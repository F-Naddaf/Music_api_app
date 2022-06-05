import { initPage } from '../Pages/search-page.js';
import { createMeal } from '../views/init-view.js';

export async function getMealList(getMeal) {
  let searchInputTxt = document.getElementById('search-input').value.trim();
  initPage();
  const searchResult = document.querySelector('.title');
  searchResult.textContent = 'Your Search Results:';
  const mealsView = document.querySelector('.meals-view');
  const mealsContainer = document.querySelector('.meals-container');
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`,
    );
    const data = await response.json();
    console.log(response.ok);
    if (response.ok) {
      if (data.meals !== null) {
        data.meals.forEach((meal) => {
          getMeal = createMeal(meal);
          mealsContainer.appendChild(getMeal);
        });
        return;
      }
    }
    throw new Error('Failed');
  } catch (errors) {
    console.log(errors);
    const failedSearchMessage = document.createElement('h3')
    failedSearchMessage.innerHTML = "Sorry, we didn't find any meal!"
    failedSearchMessage.classList.add("failed-search")
    mealsView.appendChild(failedSearchMessage)
  }
}

// getMeal.addEventListener('click', getMealRecipe);
