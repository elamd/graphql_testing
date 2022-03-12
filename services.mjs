
class BookService {

  constructor() {
    this.apiKey = 'AIzaSyC6WNqTgU68aVcyUDl2f_O0X_Cl4-ewtSg';
  }

  async getBookDetails(title, author) {
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${this.apiKey}`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }
}

export default new BookService();
