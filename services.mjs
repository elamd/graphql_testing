
class BookService {

  constructor() {
    this.apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    console.log(`api key is ${this.apiKey}`);
  }

  async getBookDetails(title, author) {
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${this.apiKey}`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }
}

export default new BookService();
