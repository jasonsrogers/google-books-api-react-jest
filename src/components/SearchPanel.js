import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { orderByValues, filterByValues } from "../services/booksService";

class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }
  searchFieldsChanged(field) {
    this.setState(field, () => {
      this.props.doSearch({ ...this.state });
    });
  }
  render() {
    const { searchTerm = "" } = this.state;
    return (
      <Form>
        <Form.Group controlId="searchTermControl">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="search-input">Search:</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              className="title-search"
              type="text"
              placeholder="Title"
              aria-label="Title search"
              aria-describedby="search-input"
              value={searchTerm}
              onChange={event => {
                this.searchFieldsChanged({ searchTerm: event.target.value });
              }}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="orderByControl">
          <Form.Label>Order by:</Form.Label>
          <Form.Control
            className="order-by"
            onChange={event => {
              this.searchFieldsChanged({ orderBy: event.target.value });
            }}
            as="select"
          >
            <option />
            {orderByValues.map((value, index) => {
              return <option key={value}>{value}</option>;
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="filterControl">
          <Form.Label>Filter by</Form.Label>
          <Form.Control
            className="filter-by"
            onChange={event => {
              this.searchFieldsChanged({ filterBy: event.target.value });
            }}
            as="select"
          >
            <option />
            {filterByValues.map((value, index) => {
              return <option key={value}>{value}</option>;
            })}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }
}

export { SearchPanel };
