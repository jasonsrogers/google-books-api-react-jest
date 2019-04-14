import React, { Component } from "react";
import "./App.scss";

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
      searchField: { searchTerm: "123" }
    };
  }
  componentDidMount() {
    this.doSearch();
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
        isLoading: true
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
          <div className="main-panel">
            <SearchPanel
              doSearch={value => {
                this.onSearchPanelChange(value);
              }}
            />
            <div className="main-tile">
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
              {isLoading ? <h1>LOADING</h1> : ""}
              <BookList books={books} />
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
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
