import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { orderByValues, filterByValues } from "../services/booksService";
/**
 * Class that renders SearchPanel (Search Term, orderBy, filterBy)
 */
class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }
  /**
   * callback for field change
   * @param {Object} field key/value to copy to state and to pass
   * up for search
   */
  searchFieldsChanged(field) {
    this.setState(field, () => {
      this.props.doSearch({ ...this.state });
    });
  }
  render() {
    const { searchTerm = "" } = this.state;
    return (
      <Form className="search-panel">
        <Row>
          <Col sm>
            <Form.Group controlId="searchTermControl">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Search:</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  className="title-search"
                  type="text"
                  placeholder="Title"
                  aria-label="Title search"
                  aria-describedby="search-input"
                  value={searchTerm}
                  onChange={event => {
                    this.searchFieldsChanged({
                      searchTerm: event.target.value
                    });
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group controlId="orderByControl">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Order by:</InputGroup.Text>
                </InputGroup.Prepend>
                {/* <Form.Label>Order by:</Form.Label> */}
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
              </InputGroup>
            </Form.Group>
          </Col>
          <Col sm>
            <Form.Group controlId="filterControl">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Filter by:</InputGroup.Text>
                </InputGroup.Prepend>
                {/* <Form.Label>Filter by</Form.Label> */}
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
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    );
  }
}

export { SearchPanel };
