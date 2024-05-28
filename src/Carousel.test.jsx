import { describe, it, expect } from "vitest";

import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

describe("carousel works", function () {
  it("renders without crashing", function () {
    render(<Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />);
  });

  it("works when you click on the right arrow", function () {
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
        title="images for testing"
      />
    );
    // expect the first image to show, but not the second
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();
  });

  it("works when you click on the left arrow", function () {
    const { container, debug } = render(
      <Carousel
        photos={TEST_IMAGES}
        title="images for testing"
      />
    );
    debug(container);
    // expect the second image to show, but not the first

    //move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();

    // move backward in the carousel
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow);

    // expect the first image to show, but not the second
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
  });

  it("hides left arrow when on the first image", function () {
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
        title="images for testing"
      />
    );
    // expect the right arrow to show but not the left arrow
    expect(
      container.querySelector(".bi-arrow-right-circle")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".bi-arrow-left-circle")
    ).not.toBeInTheDocument();

  });

  it("hides right arrow when on the last image", function () {
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
        title="images for testing"
      />
    );
    // expect the left arrow to show but not the right arrow
    expect(
      container.querySelector(".bi-arrow-right-circle")
    ).toBeInTheDocument();
    expect(
      container.querySelector(".bi-arrow-left-circle")
    ).not.toBeInTheDocument();
  });


});


describe("snapshot tests for stability", function () {

  it("matches initial carousel on start", function () {
    const { container } = render(<Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />);
    expect(container).toMatchSnapshot();
  });
  // end

  it("matches hiding right arrow when on last image", function () {
    const { container } = render(<Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />);
    const rightArrow = container.querySelector(".bi-arrow-right-circle");

    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    expect(container).toMatchSnapshot();
  });
  // end

  it("matches having both arrows when not on first or last image", function () {
    const { container } = render(<Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />);
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    expect(container).toMatchSnapshot();
  });
});