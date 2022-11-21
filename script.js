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
  const container = document.createElement('div');
//Container
  container.className = 'container';
  heading.setAttribute('id', 'heading');
  heading.innerHTML = 'Book Catalog';

  header.append(heading);
  fragment.append(header);

  //Bag
  let bookContainer = document.createElement('div');
  bookContainer.setAttribute('id', 'grand-id');
  bookContainer.className = 'grand-cart-container';


  let cartContainer = document.createElement('div');
  cartContainer.className = 'cart-container';

  let btnToggleCart = document.createElement('button');


  let btnOrder = document.createElement('button');
  let itemCount = 0;
  let btnToggleCartText = document.createTextNode('Bag');
  let itemCountText = document.createElement('p');
  itemCountText.textContent = `${itemCount}`;
  itemCountText.className = 'item-count-text';

  btnToggleCart.appendChild(btnToggleCartText);
  btnToggleCart.appendChild(itemCountText);

  btnOrder.textContent = 'Confirm order';
  btnToggleCart.className = 'btn-ToggleCart';

  btnOrder.style.cssText = `position:absolute;  width: 115px; left: 15%;
  bottom: 10px;`;

  let cart = document.createElement('div');
  let babyCart = document.createElement('div');

  //Books list
  let totalPrice = document.createElement('p');
  let hrCart = document.createElement('hr');
  let unorderedList = document.createElement('ul');
  let clearAll = document.createElement('button');
  clearAll.innerText = 'Clear';
  clearAll.onclick = () => {
    testTable.innerHTML = '';
    itemCount = 0;
    specialPriceTag = 0;
    totalPrice.textContent = `Total: $${specialPriceTag}`;

    itemCountText.textContent = `${itemCount}`;
    cart.style.display = 'none';
  };

  let specialPriceTag = 0;
  let val = 0;
  totalPrice.innerText = `Total: $${specialPriceTag}`;
  let total = document.createElement('p');
  cart.appendChild(totalPrice);
  cart.appendChild(hrCart);
  cart.appendChild(unorderedList);

  cart.className = 'cart-content';
  babyCart.className = 'baby-cart-content';
  let agent_1;

  babyCart.setAttribute('id', agent_1);

  cart.style.cssText = `display: none;`;
  clearAll.style.cssText = `position:absolute;  width: 75px; left: 55%;
  bottom: 10px;`;
  cart.appendChild(clearAll);
  cart.appendChild(btnOrder);

  let testTable = document.createElement('table');


  btnToggleCart.onclick = function () {
    if (cart.style.display === 'block') {
      cart.style.display = 'none';
    } else {
      cart.style.display = 'block';
    }
  };

  btnOrder.onclick = function () {
    location.href = '/orderForm/order.html';
  };


  cart.appendChild(babyCart);
  cartContainer.appendChild(cart);

  bookContainer.appendChild(cartContainer);

  bookContainer.appendChild(btnToggleCart);

  header.append(bookContainer);

  let detailedInformationContainer = document.createElement('div');
  detailedInformationContainer.className = 'detailed-information-container';
  let disableShowMore = true;

//Drag and drop
  cartContainer.addEventListener('dragover', allowDrop);
  bookContainer.addEventListener('dragover', allowDrop);
  function allowDrop(ev) {
    ev.preventDefault();
  }

  cartContainer.addEventListener('drop', drop);
  bookContainer.addEventListener('drop', drop);

  function drop(ev) {
    let title2 = document.createElement('div');
    let author2 = document.createElement('p');
    let bookName2 = document.createElement('p');
    let image2 = document.createElement('img');
    let price2 = document.createElement('p');
    let btnX2 = document.createElement('button');

    price2.className = 'elm-p';
    bookName2.className = 'elm-t';
    author2.className = 'elm-a';
    image2.className = 'elm-img';
    image2.src = data[+agent_1].imageLink;

    author2.innerHTML = data[+agent_1].author;
    price2.innerHTML =  '$' + data[+agent_1].price ;
    bookName2.innerHTML = data[+agent_1].title;
    btnX2.innerText = 'X';

    if (cart.textContent.includes(price2.textContent)) {
    } else {
      let middleRow2 = document.createElement('tr');
      middleRow2.style.cssText = `display: flex; align-items: center;`;

      let titleTD2 = document.createElement('td');
      let imageTD2 = document.createElement('td');
      let priceTD2 = document.createElement('td');
      let btnXTD2 = document.createElement('td');

      imageTD2.appendChild(image2);
      btnXTD2.appendChild(btnX2);
      title2.appendChild(bookName2);
      title2.appendChild(author2);
      titleTD2.appendChild(title2);
      priceTD2.appendChild(price2);

      middleRow2.appendChild(imageTD2);
      middleRow2.appendChild(titleTD2);
      middleRow2.appendChild(priceTD2);
      middleRow2.appendChild(btnXTD2);

      testTable.appendChild(middleRow2);

      let empArr = [];
      const collection = document.getElementsByClassName('elm-p');
      itemCount = collection.length;
      itemCountText.textContent = `${itemCount}`;

      for (let i = 0; i < collection.length; i++) {
        empArr.push(collection[i].textContent.replace('$', ''));
      }

      let sumArr = empArr.map(Number);

      total.textContent = sumArr.reduce((p, c) => p + c);

      specialPriceTag = sumArr.reduce((p, c) => p + c);
      totalPrice.textContent = `Total: ${specialPriceTag}$`;

      btnX2.onclick = () => {
        val = parseInt(total.textContent) - parseInt(price2.textContent);
        total.textContent = val.toString();
        totalPrice.textContent = `Total: ${
          specialPriceTag - parseInt(price2.textContent)
        }`;
        totalPrice.textContent = `Total: ${val.toString()}$`;

        middleRow2.remove();
        const collection = document.getElementsByClassName('elm-p');
        itemCount = collection.length;
        itemCountText.textContent = `${itemCount}`;
      };
    }

    ev.preventDefault();
  }
//iterate catalog
  for (var i = 0; i < data.length; i++) {
    const wrapper = document.createElement('div');
    const info = document.createElement('div');
    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';
    const card = document.createElement('div');

    const image = document.createElement('img');
    image.setAttribute('id', 'thumbnail-image-id');
    const title = document.createElement('h4');
    const author = document.createElement('h5');
    const price = document.createElement('span');

    const btnAddToCart = document.createElement('button');
    btnAddToCart.className = 'btn-add';
    let add2Cartext = document.createTextNode('Add to Bag');
    add2Cartext.className = 'btn-add-text-node';
    btnAddToCart.appendChild(add2Cartext);
    let imagSrc = data[i].imageLink;

    image.setAttribute('id', `${i}`);

    let detailedInformation = document.createElement('div');
    let btnInfo = document.createElement('button');
    detailedInformation.className = 'detailed-information';
    btnInfo.className = 'btn-info-x';
    btnInfo.textContent = 'X';

    btnInfo.addEventListener('click', hideDetails);

    function hideDetails() {
      disableShowMore = true;
      detailedInformation.style.display = 'none';
    }
    const descriptionPopUp = document.createElement('p');
    const disPhoto = document.createElement('img');
    disPhoto.src = data[i].imageLink;
    descriptionPopUp.innerText = data[i].description;
    detailedInformation.appendChild(btnInfo);
    detailedInformation.appendChild(descriptionPopUp);
    detailedInformationContainer.appendChild(detailedInformation);
    fragment.appendChild(detailedInformationContainer);

    const btnShowMore = document.createElement('button');
    btnShowMore.className = 'btn-add';
    let ShowMoretext = document.createTextNode('Show more');
    ShowMoretext.className = ' ShowMoretext-text-node';
    btnShowMore.appendChild(ShowMoretext);
    btnShowMore.addEventListener('click', showDetails);
    function showDetails() {
      if (disableShowMore) {
        disableShowMore = false;
        detailedInformation.style.display = 'block';
      }
    }

    babyCart.append(testTable);

    btnAddToCart.addEventListener('click', addBookToBasket);

    function addBookToBasket() {
      let elmInfo = document.createElement('div');
      let elmP = document.createElement('div');
      let elmT = document.createElement('div');
      let elmA = document.createElement('div');
      let elmImage = document.createElement('img');
      elmInfo.className = 'elm-info';
      elmP.className = 'elm-p';
      elmT.className = 'elm-t';
      elmA.className = 'elm-a';
      elmImage.className = 'elm-img';
      let btnX = document.createElement('button');

      btnX.className = 'btn-x';
      btnX.innerHTML = 'X';
      elmP.innerHTML = price.textContent;
      elmT.innerHTML = title.textContent;
      elmA.innerHTML = author.textContent;
      elmImage.src = imagSrc;
      elmImage.style.cssText = `background-color: red;`;
      if (cart.textContent.includes(price.textContent)) {
      } else {
        let middleRow = document.createElement('tr');
        middleRow.style.cssText = `display: flex; align-items: center;`;

        let titleTD = document.createElement('td');
        let btnXTD = document.createElement('td');
        let imageTD = document.createElement('td');
        let priceTD = document.createElement('td');

        imageTD.style.cssText = `align-self: stretch;`;
        imageTD.appendChild(elmImage);
        priceTD.appendChild(elmP);
        btnXTD.appendChild(btnX);
        titleTD.appendChild(elmT);
        titleTD.appendChild(elmA);
        middleRow.appendChild(imageTD);
        middleRow.appendChild(titleTD);
        middleRow.appendChild(priceTD);
        middleRow.appendChild(btnXTD);

        testTable.appendChild(middleRow);

        let empArr = [];
        const collection = document.getElementsByClassName('elm-p');
        itemCount = collection.length;
        itemCountText.textContent = `${itemCount}`;

        for (let i = 0; i < collection.length; i++) {
          empArr.push(collection[i].textContent.replace('$', ''));
        }

        let sumArr = empArr.map(Number);

        total.textContent = sumArr.reduce((p, c) => p + c);

        specialPriceTag = sumArr.reduce((p, c) => p + c);
        totalPrice.textContent = `Total: ${specialPriceTag}$`;

        btnX.onclick = function () {
          val = parseInt(total.textContent) - parseInt(elmP.textContent);
          total.textContent = val.toString();
          totalPrice.textContent = `Total: ${
            specialPriceTag - parseInt(elmP.textContent)
          }`;
          totalPrice.textContent = `Total: ${val.toString()}$`;

          middleRow.remove();
          const collection = document.getElementsByClassName('elm-p');
          itemCount = collection.length;
          itemCountText.textContent = `${itemCount}`;
        };
      }
    }

    wrapper.className = 'wrapper';
    info.className = 'info';
    card.className = 'card';

    title.className = 'title';
    author.className = 'author';
    price.className = 'price';
    title.innerHTML = data[i].title;
    author.innerHTML = data[i].author;
    price.innerHTML = '$' + data[i].price;
    image.src = data[i].imageLink;

    card.appendChild(image);
    info.appendChild(title);
    info.appendChild(author);
    info.appendChild(price);
    btnContainer.appendChild(btnShowMore);
    btnContainer.appendChild(btnAddToCart);
    info.appendChild(btnContainer);

    card.appendChild(info);

    wrapper.appendChild(card);
    container.appendChild(wrapper);
  }
  document.body.addEventListener('dragstart', drag);
  document.body.addEventListener('dragend', dragEnded);
  let dragHereMSG = document.createElement('p');
  dragHereMSG.className = 'drag-here-msg';
  bookContainer.appendChild(dragHereMSG);

  dragHereMSG.visibility = 'hidden';

  function dragEnded(ev) {
    bookContainer.className = 'grand-cart-container';
    container.className = 'container';
    btnToggleCart.style.visibility = 'visible';
    dragHereMSG.innerText = '';
    dragHereMSG.visibility = 'hidden';
    ev.dataTransfer.setData('text', ev.target.id);
  }
  function drag(ev) {
    bookContainer.className = 'grand-cart-container-alter';
    btnToggleCart.style.visibility = 'hidden';
    container.className = 'container-alt';
    cart.style.display = 'none';
    dragHereMSG.innerText = 'drag & drop here...';
    dragHereMSG.visibility = 'visible';
    agent_1 = ev.target.id;
    ev.dataTransfer.setData('text', ev.target.id);
  }

  fragment.append(container);
  document.body.appendChild(fragment);
}
