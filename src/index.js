import './index.css';
import pop from './modules/pop.js';

const main = document.getElementById('main');

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
