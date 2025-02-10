import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "@/components/Button";

describe("Button Component", () => {
  it("renders correctly with default variant", () => {
    const { getByText } = render(<Button title="Primary Button" />);

    expect(getByText("Primary Button")).toBeTruthy();
  });

  it("renders correctly with secondary variant", () => {
    const { getByText } = render(
      <Button title="Secondary Button" variant="secondary" />
    );

    expect(getByText("Secondary Button")).toBeTruthy();
  });

  it("renders correctly with outline variant", () => {
    const { getByText } = render(
      <Button title="Outline Button" variant="outline" />
    );

    expect(getByText("Outline Button")).toBeTruthy();
  });

  it("renders correctly with ghost variant", () => {
    const { getByText } = render(
      <Button title="Ghost Button" variant="ghost" />
    );

    expect(getByText("Ghost Button")).toBeTruthy();
  });

  it("calls onPress when clicked", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Clickable" onPress={onPressMock} />
    );

    fireEvent.press(getByText("Clickable"));

    expect(onPressMock).toHaveBeenCalled();
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Disabled" disabled onPress={onPressMock} />
    );

    fireEvent.press(getByText("Disabled"));

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("shows a loading indicator when loading", () => {
    const { getByTestId, queryByText } = render(
      <Button title="Loading Button" loading />
    );

    expect(getByTestId("activity-indicator")).toBeTruthy();
    expect(queryByText("Loading Button")).toBeNull();
  });
});
