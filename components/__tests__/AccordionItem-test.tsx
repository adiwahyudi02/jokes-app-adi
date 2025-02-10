import { render, fireEvent, act } from "@testing-library/react-native";
import { AccordionItem } from "@/components/AccordionItem";
import { Text } from "react-native";

jest.mock("@expo/vector-icons", () => {
  return {
    Ionicons: jest.fn().mockImplementation(() => null),
  };
});

describe("AccordionItem Component", () => {
  it("renders the title correctly", () => {
    const { getByText } = render(
      <AccordionItem
        isOpen={false}
        onOpen={jest.fn()}
        onClose={jest.fn()}
        renderTitle={() => <Text>Accordion Title</Text>}
        renderExpanded={() => <Text>Expanded Content</Text>}
      />
    );

    expect(getByText("Accordion Title")).toBeTruthy();
  });

  it("calls onOpen when clicked and closed", async () => {
    const onOpenMock = jest.fn();
    const { getByText } = render(
      <AccordionItem
        isOpen={false}
        onOpen={onOpenMock}
        onClose={jest.fn()}
        renderTitle={() => <Text>Accordion Title</Text>}
        renderExpanded={() => <Text>Expanded Content</Text>}
      />
    );

    await act(async () => {
      fireEvent.press(getByText("Accordion Title"));
    });

    expect(onOpenMock).toHaveBeenCalled();
  });

  it("calls onClose when clicked while open", async () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <AccordionItem
        isOpen={true}
        onOpen={jest.fn()}
        onClose={onCloseMock}
        renderTitle={() => <Text>Accordion Title</Text>}
        renderExpanded={() => <Text>Expanded Content</Text>}
      />
    );

    await act(async () => {
      fireEvent.press(getByText("Accordion Title"));
    });

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("displays expanded content when open", () => {
    const { getByText } = render(
      <AccordionItem
        isOpen={true}
        onOpen={jest.fn()}
        onClose={jest.fn()}
        renderTitle={() => <Text>Accordion Title</Text>}
        renderExpanded={() => <Text>Expanded Content</Text>}
      />
    );

    expect(getByText("Expanded Content")).toBeTruthy();
  });

  it("hides expanded content when closed", () => {
    const { queryByText } = render(
      <AccordionItem
        isOpen={false}
        onOpen={jest.fn()}
        onClose={jest.fn()}
        renderTitle={() => <Text>Accordion Title</Text>}
        renderExpanded={() => <Text>Expanded Content</Text>}
      />
    );

    expect(queryByText("Expanded Content")).toBeNull();
  });
});
