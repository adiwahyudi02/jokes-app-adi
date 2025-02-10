import { render } from "@testing-library/react-native";
import { Placeholder } from "@/components/Placeholder";

describe("Placeholder Component", () => {
  it("renders correctly with default props", () => {
    const { getAllByTestId } = render(<Placeholder />);

    // Default count is 2, so it should render two placeholders
    expect(getAllByTestId("placeholder-container")).toHaveLength(2);
  });

  it("renders the correct number of placeholders", () => {
    const { getAllByTestId } = render(<Placeholder count={3} />);

    expect(getAllByTestId("placeholder-container")).toHaveLength(3);
  });

  it("does not render when isVisible is false", () => {
    const { queryByTestId } = render(<Placeholder isVisible={false} />);

    expect(queryByTestId("placeholder-container")).toBeNull();
  });
});
