import preload from "../../Helpers/utils";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import React from "react";


test('should create an array of images with the following src string', () => {
  const imgStrings = ['mock-one.jpg', 'mock-two.jpg', 'mock-three.jpg'];
  const arrayOfImages: [] = [];
  const mockImages = [new Image(), new Image(), new Image()];

  imgStrings.forEach((imgString, index) => {
    mockImages[index].src = imgString;
  });


  preload(imgStrings, arrayOfImages);

  expect(arrayOfImages).toStrictEqual(mockImages);


});