{
  'use strict';
  /* eslint-disable no-unused-vars */
  /* eslint-disable no-empty */
  /* eslint-disable no-inner-declarations */

  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf:{
      booksListHtml:'.books-list',
      bookImage: '.book__image',
      bookImageId: '.book__image a .data-id',
      form: '.filters',
    }
  };

  const classNames = {
    books: {
      classFavorite: 'favorite',
      classBook: 'book__image',
      classChecked: 'checked',
      classHidden: 'hidden',
    }
  };

  const templates = {
    booksList:Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  console.log('start script',dataSource.books);

  let favoriteBooks =[];

  let filters = [];

  class BooksList   {
    constructor(){
      const thisBook = this;
      thisBook.initData();
      thisBook.getElements();
      thisBook.render();
      thisBook.initActions();

    }

    initData() {
      this.data = dataSource.books;
    }

    getElements(){
      const thisBook = this;
      thisBook.bookContainer = document.querySelector(select.containerOf.booksListHtml);
      thisBook.formContainer = document.querySelector(select.containerOf.form);
    }

    render(){

      const thisBook = this;

      for (let element of dataSource.books){
        console.log(element);

        const generatedHTML = templates.booksList(element);
        //console.log(generatedHTML);
        thisBook.element = utils.createDOMFromHTML(generatedHTML);
        //console.log(thisBook.element);

        thisBook.bookContainer.appendChild(thisBook.element);
      }
    }

    initActions(){

      const thisBook = this;
      //////////////////////book/////////

      thisBook.bookContainer.addEventListener('dblclick', function(event) {
        //console.log(bookContainer);
        event.preventDefault();

        if(event.target.offsetParent.classList.contains(classNames.books.classBook)){
          let id = event.target.offsetParent.getAttribute('data-id');

          if (!favoriteBooks.includes(id)){
            event.target.offsetParent.classList.add(classNames.books.classFavorite);
            favoriteBooks.push(id);

          } else {
            event.target.offsetParent.classList.remove(classNames.books.classFavorite);
            const indexOfFavoriteBooks = favoriteBooks.indexOf(id);
            console.log(indexOfFavoriteBooks);
            favoriteBooks.splice(indexOfFavoriteBooks, 1);
          }
          console.log(favoriteBooks);
        }
      });
      /////////////////////////////form
      console.log(thisBook.formContainer);

      thisBook.formContainer.addEventListener('change', function(event) {

        event.preventDefault();

        if (event.target.tagName=='INPUT' && event.target.type=='checkbox' && event.target.name=='filter'){
          const value = event.target.value;
          console.log(value);

          if (event.target.checked == true){
            console.log(event.target.checked);
            filters.push(value);
            console.log(filters);

          } else {
            const indexOfFilters = filters.indexOf(value);
            filters.splice(indexOfFilters, 1);
            console.log(filters);
          }
        }
        thisBook.filterBooks();
      });
    }

    filterBooks(){

      const thisBook = this;

      for (const book of dataSource.books){
        //console.log(element);
        //console.log(dataSource.books);
        let shouldBeHidden = false;

        for (const filter of filters){
          //console.log(filters);

          if (!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }

        const activeImage = document.querySelector('.book__image[data-id="'+book.id+'"]');

        console.log(activeImage);

        if (shouldBeHidden){
          activeImage.classList.add('hidden');

        } else {
          activeImage.classList.remove('hidden');
        }
      }
    }
  }

  const app = new BooksList();
}
