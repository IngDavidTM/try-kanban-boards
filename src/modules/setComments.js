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

export default setComments;