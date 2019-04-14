import React from "react";
import renderer from "react-test-renderer";
import { BookList } from "../BookList";
import { Book } from "./testData";

test("Book List", () => {
  const books = [Object.assign({}, Book)];
  const component = renderer.create(<BookList books={books} />);
  expect(
    component.root.findAllByProps({ className: "book-thumbnail" }).length
  ).toBe(1);
});
