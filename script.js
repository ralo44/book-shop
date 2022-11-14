fetch('booksData.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    getData(data);
  })
  .catch(err => {
    console.log('error: ' + err);
  });

function getData(data) {
  const bgImage = document.createElement('div');
  const head = document.createElement('div');
  const sp = document.createElement('span');
  const btnBooks = document.createElement('button');

  btnBooks.className = 'btn';
  btnBooks.innerText = 'Check books';
  sp.className = 'border';
  sp.innerText = 'YOUR FAVORITE LIBRARY ';

  bgImage.className = 'backGround';
  head.className = 'caption';

  btnBooks.onclick = function () {
    location.href = '#header';
  };

  head.appendChild(sp);
  head.appendChild(btnBooks);
  bgImage.appendChild(head);
  
  let fragment = new DocumentFragment();

  fragment.appendChild(bgImage);


  const header = document.createElement('header');
  header.setAttribute('id', 'header');
  const heading = document.createElement('h1');
  
  document.body.appendChild(fragment);
}

