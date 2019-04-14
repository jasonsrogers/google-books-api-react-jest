import React from "react";
import { shallow } from "enzyme";
import { SearchPanel } from "../SearchPanel";

test("Book List", () => {
  let mockFn = jest.fn();
  const wrapper = shallow(
    <SearchPanel
      doSearch={value => {
        mockFn(value);
      }}
    />
  );
  let input = wrapper.find(".title-search");
  input.simulate("change", { target: { value: "hello" } });
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0].searchTerm).toBe("hello");
});
test("Book List orderBy", () => {
  let mockFn = jest.fn();
  const wrapper = shallow(
    <SearchPanel
      doSearch={value => {
        mockFn(value);
      }}
    />
  );
  let input = wrapper.find(".order-by");
  input.simulate("change", { target: { value: "newest" } });
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0].orderBy).toBe("newest");
});

test("Book List filterBy", () => {
  let mockFn = jest.fn();
  const wrapper = shallow(
    <SearchPanel
      doSearch={value => {
        mockFn(value);
      }}
    />
  );
  let input = wrapper.find(".filter-by");
  input.simulate("change", { target: { value: "full" } });
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn.mock.calls[0][0].filterBy).toBe("full");
});
