import React from "react";
// import InputGroup from 'react-bootstrap/InputGroup'
// import FormControl from 'react-bootstrap/FormControl'

/**
 * Component to handle search bar
 * Note: value is passed back up to app.js for convenience
 * We would normally pass set it in a context or a redux
 * but for this demo I kept it simple
 */
class SearchBar extends React.Component {
  render() {
    return (
      <h1>SearchBar</h1>
      // <InputGroup className="mb-3">
      //   <InputGroup.Prepend>
      //     <InputGroup.Text id="search-input">Search:</InputGroup.Text>
      //   </InputGroup.Prepend>
      //   <FormControl
      //     type="text"
      //     placeholder="Title"
      //     aria-label="Title search"
      //     aria-describedby="search-input"
      //     value={this.props.textSearch.value}
      //     onChange={event => {
      //       this.props.filterList(event.target.value)
      //     }}
      //   />
      // </InputGroup>
    );
  }
}

export { SearchBar };
