import { render, fireEvent } from "@testing-library/react-native";
import { Dialog } from "@/components/Dialog";
import { Text } from "react-native";
import { act } from "react-test-renderer";
import { ComponentType } from "react";

jest.mock("react-native-animatable", () => {
  return {
    View: jest.fn(({ children }) => children),
    createAnimatableComponent: (Component: ComponentType<any>) => Component,
  };
});

jest.mock("react-native-modal", () => {
  return jest.fn(({ children }) => children);
});

describe("Dialog Component", () => {
  it("renders correctly when visible", async () => {
    const { getByTestId } = render(
      <Dialog isVisible={true} onClose={() => {}}>
        <Text testID="dialog-content">Dialog Content</Text>
      </Dialog>
    );

    await act(async () => {});

    expect(getByTestId("dialog-container")).toBeTruthy();
    expect(getByTestId("dialog-content")).toBeTruthy();
  });

  it("calls onClose when OK button is pressed", async () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <Dialog isVisible={true} onClose={onCloseMock}>
        <Text>Dialog Content</Text>
      </Dialog>
    );

    await act(async () => {
      fireEvent.press(getByText("OK"));
    });

    expect(onCloseMock).toHaveBeenCalled();
  });
});
