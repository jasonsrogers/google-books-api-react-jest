import React, { Component } from "react";
import "./App.css";

import { BookService } from "./services/booksService";
import { BookList } from "./components/BookList";
import { SearchPanel } from "./components/SearchPanel";
import { PaginationComponent } from "./components/PaginationComponent";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      loading: false,
      totalItems: 0,
      page: 0,
      searchField: {}
    };
  }
  componentDidMount() {
    this.doSearch("");
  }

  onPageChanged(page) {
    this.setState({ page }, () => {
      this.doSearch();
    });
  }

  onSearchPanelChange(searchField) {
    this.setState({ searchField }, () => {
      this.doSearch();
    });
  }

  doSearch() {
    const { searchField, page } = this.state;
    this.setState(
      {
        loading: true
      },
      () => {
        // debounce the search
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          BookService.getBooksWithParams(
            searchField.searchTerm,
            page,
            searchField.orderBy,
            searchField.filterBy
          ).then(
            data => {
              this.setState({
                books: data.items || [],
                isLoading: false,
                totalItems: data.totalItems
              });
            },
            () => {
              this.setState({
                books: [],
                isLoading: false,
                page: 0,
                totalItems: 0
              });
            }
          );
        }, 200);
      }
    );
  }
  render() {
    const { isLoading, books, page, totalItems } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>{isLoading ? "LOADING" : "LOADED"}</h1>
          <SearchPanel
            doSearch={value => {
              this.onSearchPanelChange(value);
            }}
          />
          {totalItems ? (
            <PaginationComponent
              page={page}
              totalItems={totalItems}
              onPageChanged={value => {
                this.onPageChanged(value);
              }}
            />
          ) : (
            ""
          )}
          <BookList books={books} />
        </header>
      </div>
    );
  }
}

export default App;
