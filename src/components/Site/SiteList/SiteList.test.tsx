import * as React from "react";
import { shallow } from "enzyme";
import SiteList from "./SiteList";

describe("SiteList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SiteList />);
    expect(wrapper).toMatchSnapshot();
  });
});
