import React, { Component } from "react";
import "./App.css";

import { BookService } from "./services/booksService";
import { BookList } from "./components/BookList";
import { SearchPanel } from "./components/SearchPanel";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      loading: false,
      textSearch: { value: "" }
    };
  }
  componentDidMount() {
    this.doSearch("");
  }

  doSearch(searchField) {
    this.setState({
      loading: true
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      BookService.getBooksWithParams(
        searchField.searchTerm,
        0,
        searchField.orderBy,
        searchField.filterBy
      ).then(
        data => {
          this.setState({
            books: data.items || [],
            isLoading: false
          });
        },
        () => {
          this.setState({
            books: [],
            isLoading: false
          });
        }
      );
    }, 500);
  }
  render() {
    const { isLoading, books } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>{isLoading ? "LOADING" : "LOADED"}</h1>
          <SearchPanel
            doSearch={value => {
              this.doSearch(value);
            }}
          />
          <BookList books={books} />
        </header>
      </div>
    );
  }
}

export default App;
