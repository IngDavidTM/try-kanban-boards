import './index.css';

const main = document.getElementById('main');
const popSection = document.getElementById('popSection');

const pop = async (index) => {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
  const json = await data.json();
  const { meals } = json;
  const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals[index].idMeal}`);
  const jsonMeal = await mealData.json();
  const specificMeal = jsonMeal.meals[0];
  const section = document.createElement('section');
  section.className = 'popUp';
  popSection.appendChild(section);
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
  p1.innerHTML = `Area: ${specificMeal.strArea}`;
  div.appendChild(p1);
  const p2 = document.createElement('p');
  p2.innerHTML = `Category: ${specificMeal.strCategory}`;
  div.appendChild(p2);
  const p3 = document.createElement('p');
  p3.innerHTML = `${specificMeal.strInstructions}`;
  div.appendChild(p3);
  const button = document.createElement('button');
  button.id = 'buttonX';
  button.className = 'buttonX';
  button.innerHTML = '<i class="fa-solid fa-xmark" ></i>';
  div.appendChild(button);
  const div1 = document.createElement('div');
  div.appendChild(div1);
  const h4 = document.createElement('h4');
  h4.innerHTML = 'Comments';
  div1.appendChild(h4);
  const h4Add = document.createElement('h4');
  h4Add.innerHTML = 'Add a comment';
  div.appendChild(h4Add);
  const form = document.createElement('form');
  form.innerHTML = '<input type="text" name="name"><textarea name="comment" id="textComment" cols="30" rows="10"></textarea><button type="submit">Comment</button>';
  div.appendChild(form);
  button.addEventListener('click', () => {
    popSection.innerHTML = '';
  });
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
