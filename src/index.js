import './index.css';

const main = document.getElementById('main');

const pop = async (index) => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
  const json = await data.json();
  const { meals } = json;
  const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals[index].idMeal}`);
  const jsonMeal = await mealData.json();
  const specificMeal = jsonMeal.meals[0];
  const section = document.createElement('section');
  section.className = 'popUp';
  main.appendChild(section);
  const div = document.createElement('div');
  div.className = 'popUpDiv';
  section.appendChild(div);
  const imgs = document.createElement('img');
  imgs.src = meals[index].strMealThumb;
  div.appendChild(imgs);
  const h3 = document.createElement('h3');
  h3.innerHTML = meals[index].strMeal;
  div.appendChild(h3);
  const p1 = document.createElement('p');
  p1.innerHTML = `${specificMeal.strArea}`;
  div.appendChild(p1);
  const p2 = document.createElement('p');
  p2.innerHTML = `${specificMeal.strCategory}`;
  div.appendChild(p2);
  const p3 = document.createElement('p');
  p3.innerHTML = `${specificMeal.strInstructions}`;
  div.appendChild(p3);
};
const generate = (json) => {
  for (let i = 0; i < 9; i += 1) {
    const div = document.createElement('div');
    div.className = 'cards';
    main.appendChild(div);
    const img = document.createElement('img');
    img.className = 'mealImg';
    img.src = json[i].strMealThumb;
    div.appendChild(img);
    const p = document.createElement('p');
    p.innerHTML = json[i].strMeal;
    div.appendChild(p);
    const button = document.createElement('button');
    button.innerHTML = 'Comments';
    button.className = 'comments';
    div.appendChild(button);
  }
  const buttonComments = document.querySelectorAll('.comments');
  buttonComments.forEach((element, index) => {
    element.addEventListener('click', () => {
      pop(index);
    });
  });
};

const food = async () => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
  const json = await data.json();
  generate(json.meals);
};

food();
