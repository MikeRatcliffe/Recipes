const { screen } = require("@testing-library/react");

const checkImage = async ({ role, testId, image, title = "" }) => {
  const { gatsbyImageData } = image.childImageSharp;
  const { sizes, src, srcSet } = gatsbyImageData.images.fallback;
  const node = await findByTestIdNodeOrRole({ role, testId });

  expect(node.getAttribute("alt")).toEqual(title);
  expect(node.getAttribute("data-src")).toEqual(src);
  expect(node.getAttribute("data-srcset")).toEqual(srcSet);
  expect(node.getAttribute("sizes")).toEqual(sizes);
};

const textContent = async ({ role, testId, node }) => {
  node = await findByTestIdNodeOrRole({ role, testId, node });
  return node.textContent;
};

const innerHTML = async ({ role, testId, node }) => {
  node = await findByTestIdNodeOrRole({ role, testId, node });
  return node.innerHTML;
};

const href = async ({ role, testId, node }) => {
  node = await findByTestIdNodeOrRole({ role, testId, node });
  return node.href;
};

const hasClass = async ({ role, testId, node, className }) => {
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

module.exports = {
  checkImage,
  textContent,
  innerHTML,
  href,
  hasClass,
};
