import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import About from "../Components/Pages/About/About";
import GitTotals from "../Components/Pages/About/GitTotals/GitTotals";
import Home from "../Components/Pages/Home/Home";
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

  it("2. Home match snapshot", () => {
    const home = shallow(<Home />);
    expect(home).toBeDefined();
  });

  it("3. GitTotals match snapshot", () => {
    const gittotals = shallow(<GitTotals />);
    expect(gittotals).toBeDefined();
  });

  it("4. Housing matches snapshot", () => {
    const tree = shallow(<Housing />);
    expect(tree).toMatchSnapshot();
  });

  it("5. ChildCare matches snapshot", () => {
    const tree = shallow(<ChildCare />);
    expect(tree).toMatchSnapshot();
  });

  it("6. Jobs matches snapshot", () => {
    const tree = shallow(<Jobs />);
    expect(tree).toMatchSnapshot();
  });

  it("7. Navbar matches snapshot", () => {
    const navbar = shallow(<Navbar />);
    expect(navbar).toMatchSnapshot();
  });

  it("8. ChildCareGrid matches snapshot", () => {
    const ccgrid = shallow(<ChildCareGrid />);
    expect(ccgrid).toMatchSnapshot();
  });

  it("9. HousingGrid matches snapshot", () => {
    const ccgrid = shallow(<HousingGrid />);
    expect(ccgrid).toMatchSnapshot();
  });

  it("10. JobGrid matches snapshot", () => {
    const ccgrid = shallow(<JobGrid />);
    expect(ccgrid).toMatchSnapshot();
  });
});
