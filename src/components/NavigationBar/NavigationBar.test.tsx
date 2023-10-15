import * as React from "react";
import { shallow } from "enzyme";
import NavigationBar from "./NavigationBar";

describe("NavigationBar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NavigationBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
