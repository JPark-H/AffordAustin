import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import About from "../Components/About/About";
import Housing, { Housing1 } from "../Components/Housing/Housing";
import ChildCare, { ChildCare1 } from "../Components/ChildCare/ChildCare";
import Jobs, { Job1 } from "../Components/Jobs/Jobs";

configure({ adapter: new Adapter() });

describe("Render components", () => {
  it("renders the About page", () => {
    const tree = shallow(<About />);
    expect(tree).toMatchSnapshot();
  });

  // ************

  it("Housing should exist", () => {
    expect(Housing).toBeDefined();
  });

  //TEMP WHILE WE HAVE  IT HARD CODED
  it("Housing1 instance should exist", () => {
    expect(Housing1).toBeDefined();
  });

  it("renders the Housing page", () => {
    const tree = shallow(<Housing1 />);
    expect(tree).toMatchSnapshot();
  });

  // ******************

  it("ChildCare should exist", () => {
    expect(ChildCare).toBeDefined();
  });

  //TEMP WHILE WE HAVE IT HARD CODED
  it("ChildCare1 should exist", () => {
    expect(ChildCare1).toBeDefined();
  });

  it("renders the ChildCare page", () => {
    const tree = shallow(<ChildCare child_care={ChildCare1} />);
    expect(tree).toMatchSnapshot();
  });

  //************ */

  it("Jobs should exist", () => {
    expect(Jobs).toBeDefined();
  });

  //TEMP WHILE WE HAVE IT HARD CODED
  it("Jobs1 should exist", () => {
    expect(Job1).toBeDefined();
  });

  it("renders the Jobs page", () => {
    const tree = shallow(<Job1 />);
    expect(tree).toMatchSnapshot();
  });
});
