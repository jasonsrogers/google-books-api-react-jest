import React from "react";
import renderer from "react-test-renderer";
import { BookList } from "../BookList";
import { Book } from "./testData";

test("Book List", () => {
  const books = [Object.assign({}, Book)];
  books[0].volumeInfo.description = false;
  const component = renderer.create(<BookList books={books} />);
  expect(component.root.findAllByProps({ className: "book-tile" }).length).toBe(
    1
  );
});
