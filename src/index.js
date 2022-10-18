import './index.css';

const main = document.getElementById('main');
const popSection = document.getElementById('popSection');

const setComments = async (index) => {
  const get = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JGerHk43c1Y5J5m1thia/comments?item_id=item${index}`);
  const arr = await get.json();
  const div = document.getElementById('divComments');
  document.getElementById('divComments').innerHTML = '';
  arr.forEach((element) => {
    const p = document.createElement('p');
    p.innerHTML = `${element.creation_date}  ${element.username}: ${element.comment}`;
    div.appendChild(p);
  });
};

const addComment = async (index, name, comment) => {
  const post = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JGerHk43c1Y5J5m1thia/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: `item${index}`,
      username: name,
      comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  setComments(index);
};

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
  p1.innerHTML = `<strong>Area:</strong> ${specificMeal.strArea}`;
  div.appendChild(p1);
  const p2 = document.createElement('p');
  p2.innerHTML = `<strong>Category:</strong> ${specificMeal.strCategory}`;
  div.appendChild(p2);
  const p3 = document.createElement('p');
  p3.innerHTML = `<strong>Instructions:</strong> ${specificMeal.strInstructions}`;
  div.appendChild(p3);
  const button = document.createElement('button');
  button.id = 'buttonX';
  button.className = 'buttonX';
  button.innerHTML = '<i class="fa-solid fa-xmark" ></i>';
  div.appendChild(button);
  const div1 = document.createElement('div');
  div1.className = 'commentsContainer';
  div.appendChild(div1);
  const h4 = document.createElement('h4');
  h4.innerHTML = 'Comments';
  div1.appendChild(h4);
  const divComments = document.createElement('div');
  divComments.id = 'divComments';
  divComments.className = 'divComments';
  div1.appendChild(divComments);
  const h4Add = document.createElement('h4');
  h4Add.innerHTML = 'Add a comment';
  div.appendChild(h4Add);
  const form = document.createElement('form');
  form.innerHTML = '<input type="text" name="name" id="nameF"><textarea name="comment" id="textComment" cols="30" rows="10"></textarea><button id="submit" type="submit">Comment</button>';
  div.appendChild(form);
  button.addEventListener('click', () => {
    popSection.innerHTML = '';
  });
  const submit = document.getElementById('submit');
  submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const nameF = document.getElementById('nameF').value;
    const commentF = document.getElementById('textComment').value;
    if (nameF !== '' && commentF !== '') {
      document.getElementById('nameF').value = '';
      document.getElementById('textComment').value = '';
      addComment(index, nameF, commentF);
    } else {
      const error = document.createElement('p');
      error.innerHTML = 'Please fill all the requirements';
      setTimeout(() => {
        error.remove();
      }, 2000);
      div.appendChild(error);
    }
  });
  setComments(index);
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
