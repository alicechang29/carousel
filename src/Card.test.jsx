import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";
import image1 from "./image1.jpg";

it("renders without crashing", function () {
  // this is a low-value test, but better than nothing
  render(<Card
    caption="Photo by Richard Pasquarella on Unsplash"
    src={image1}
    currNum="1"
    totalNum="3"
  />);
});
// end

it("has the correct alt text & src", function () {
  const { container, debug } = render(<Card
    caption="Photo by Richard Pasquarella on Unsplash"
    src={image1}
    currNum="1"
    totalNum="3"
  />);
  const img = container.querySelector("img");
  debug(img);

  expect(img.getAttribute("alt"))
    .toEqual("Photo by Richard Pasquarella on Unsplash");
  expect(img.getAttribute("src"))
    .toContain("image1.jpg");
});
// end

// it("matches snapshot", function () {
//   const { container } = render(<Card rank="A" suit="C" />);
//   expect(container).toMatchSnapshot();
// });
// end