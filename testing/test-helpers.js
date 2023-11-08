import { screen } from "@testing-library/react";

export const checkImage = async ({ role, testId, image, title = "" }) => {
  const { gatsbyImageData } = image.childImageSharp;
  const { sizes, src, srcSet } = gatsbyImageData.images.fallback;
  const node = await findByTestIdNodeOrRole({ role, testId });

  expect(node.getAttribute("alt")).toEqual(title);
  expect(node.getAttribute("data-src")).toEqual(src);
  expect(node.getAttribute("data-srcset")).toEqual(srcSet);
  expect(node.getAttribute("sizes")).toEqual(sizes);
};

export const textContent = async ({ role, testId, node }) => {
  node = await findByTestIdNodeOrRole({ role, testId, node });
  return node.textContent;
};

export const innerHTML = async ({ role, testId, node }) => {
  node = await findByTestIdNodeOrRole({ role, testId, node });
  return node.innerHTML;
};

export const href = async ({ role, testId, node }) => {
  node = await findByTestIdNodeOrRole({ role, testId, node });
  return node.href;
};

export const hasClass = async ({ role, testId, node, className }) => {
  node = await findByTestIdNodeOrRole({ role, testId, node });
  return node.classList.contains(className);
};

async function findByTestIdNodeOrRole({ role, testId, node }) {
  if (role) {
    return await screen.findByRole(role);
  }
  if (testId) {
    return await screen.findByTestId(testId);
  }
  return node;
}
