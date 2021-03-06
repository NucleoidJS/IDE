import APITree from "../APITree";
import Adapter from "enzyme-adapter-react-16";
import NonExpandableAPITreeItem from "../../components/NonExpandableAPITreeItem";
import React from "react";
import State from "../../state";

import { useContext } from "../../Context/providers/contextProvider";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../Context/providers/contextProvider");

// https://stackoverflow.com/questions/58070996/how-to-fix-the-warning-uselayouteffect-does-nothing-on-the-server
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect,
}));

test("List nested APIs", () => {
  const state = State.init();
  const api = state.get("nucleoid.api");
  api["/"] = { get: {} };
  api["/questions"] = { get: {} };
  useContext.mockReturnValue([state]);

  const wrapper = shallow(<APITree />);
  const root = wrapper.find(NonExpandableAPITreeItem).first();

  const questions = root.children().at(1);
  expect(root.prop("label")).toEqual("/");
  expect(questions.prop("label")).toEqual("/questions");
});

test("List APIs with methods", () => {
  const state = State.init();
  const api = state.get("nucleoid.api");
  api["/"] = { get: {}, post: {} };
  api["/questions"] = { get: {}, post: {} };
  useContext.mockReturnValue([state]);

  const wrapper = shallow(<APITree />);
  const root = wrapper.find(NonExpandableAPITreeItem).first();
  expect(root.prop("label")).toEqual("/");
  let children = root.children();
  expect(children.at(0).html().includes("GET")).toEqual(true);
  expect(children.at(1).html().includes("POST")).toEqual(true);

  const questions = root.children().at(2);
  expect(questions.prop("label")).toEqual("/questions");

  children = questions.children();
  expect(children.at(0).html().includes("GET")).toEqual(true);
  expect(children.at(1).html().includes("POST")).toEqual(true);
});
