import Enzyme, { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

export { Enzyme, shallow, mount, render };
