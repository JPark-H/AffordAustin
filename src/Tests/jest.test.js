import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import About from "../Components/Pages/About/About";
import Housing from "../Components/Pages/InstancePages/Housing";
import ChildCare from "../Components/Pages/InstancePages/ChildCare";
import Jobs from "../Components/Pages/InstancePages/Jobs";

import Navbar from "../Components/MainNavBar/MainNavBar";

import ChildCareGrid from "../Components/Pages/GridPages/ChildCareGrid";
import HousingGrid from "../Components/Pages/GridPages/HousingGrid";
import JobGrid from "../Components/Pages/GridPages/JobGrid";

configure({ adapter: new Adapter() });

describe("Render components", () => {
  it("1. render About page", () => {
    const tree = shallow(<About />);
    expect(tree).toMatchSnapshot();
  });

  it("2. Housing should exist", () => {
    expect(Housing).toBeDefined();
  });

  it("3. Housing matches snapshot", () => {
    const tree = shallow(<Housing />);
    expect(tree).toMatchSnapshot();
  });

  it("4. ChildCare should exist", () => {
    expect(ChildCare).toBeDefined();
  });

  it("5. ChildCare matches snapshot", () => {
    const tree = shallow(<ChildCare />);
    expect(tree).toMatchSnapshot();
  });

  it("6. Jobs should exist", () => {
    expect(Jobs).toBeDefined();
  });

  it("7. Jobs matches snapshot", () => {
    const tree = shallow(<Jobs />);
    expect(tree).toMatchSnapshot();
  });

  it("8. Navbar exists and matches snapshot", () => {
    const navbar = shallow(<Navbar />);
    expect(navbar).toBeDefined;
    expect(navbar).toMatchSnapshot();
  });

  it("9. ChildCareGrid matches snapshot", () => {
    const ccgrid = shallow(<ChildCareGrid />);
    expect(ccgrid).toMatchSnapshot();
  });

  it("10. HousingGrid matches snapshot", () => {
    const ccgrid = shallow(<HousingGrid />);
    expect(ccgrid).toMatchSnapshot();
  });

  it("11. JobGrid matches snapshot", () => {
    const ccgrid = shallow(<JobGrid />);
    expect(ccgrid).toMatchSnapshot();
  });
});
