import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BookService } from "./services/booksService";
import { BookList } from "./components/BookList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      loading: false
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    BookService.getBooksWithParams("css").then(data => {
      this.setState({
        books: data.items || [],
        isLoading: false
      });
    });
  }
  render() {
    const { isLoading, books } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>{isLoading ? "LOADING" : "LOADED"}</h1>

          <div>
            {/* {books.map((book, index) => {
              return <h2 key={book.id}>{book.volumeInfo.title}</h2>;
            })} */}
            <BookList books={books} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
