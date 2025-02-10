import { render } from "@testing-library/react-native";
import { Tag } from "@/components/Tag";
import { colors } from "@/constants/Colors";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

describe("Tag Component", () => {
  const flattenStyle = (style: StyleProp<TextStyle | ViewStyle>) => {
    return Array.isArray(style) ? Object.assign({}, ...style) : style;
  };

  it("renders correctly with default variant (primary)", () => {
    const { getByText } = render(<Tag label="Primary Tag" />);
    const tagElement = getByText("Primary Tag");

    expect(tagElement).toBeTruthy();
    expect(flattenStyle(tagElement.props.style)).toMatchObject({
      color: colors.white,
    });
  });

  it("renders correctly with secondary variant", () => {
    const { getByText } = render(
      <Tag label="Secondary Tag" variant="secondary" />
    );
    const tagElement = getByText("Secondary Tag");

    expect(tagElement).toBeTruthy();
    expect(flattenStyle(tagElement.props.style)).toMatchObject({
      color: colors.white,
    });
  });

  it("renders correctly with outline variant", () => {
    const { getByText } = render(<Tag label="Outline Tag" variant="outline" />);
    const tagElement = getByText("Outline Tag");

    expect(tagElement).toBeTruthy();
    expect(flattenStyle(tagElement.props.style)).toMatchObject({
      color: colors.primary,
    });
  });

  it("applies correct background color for primary variant", () => {
    const { getByTestId } = render(<Tag label="Primary Tag" />);
    const tagContainer = getByTestId("tag-container");

    expect(flattenStyle(tagContainer.props.style)).toMatchObject({
      backgroundColor: colors.primary,
    });
  });

  it("applies correct background color for secondary variant", () => {
    const { getByTestId } = render(
      <Tag label="Secondary Tag" variant="secondary" />
    );
    const tagContainer = getByTestId("tag-container");

    expect(flattenStyle(tagContainer.props.style)).toMatchObject({
      backgroundColor: colors.secondary,
    });
  });

  it("applies correct styles for outline variant", () => {
    const { getByTestId } = render(
      <Tag label="Outline Tag" variant="outline" />
    );
    const tagContainer = getByTestId("tag-container");

    expect(flattenStyle(tagContainer.props.style)).toMatchObject({
      backgroundColor: "transparent",
      borderColor: colors.primary,
      borderWidth: 1,
    });
  });
});
