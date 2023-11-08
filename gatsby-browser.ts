import "./src/styles/index.scss";
import type { GatsbyBrowser } from "gatsby";

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  const focusWrapper = document.querySelector("#gatsby-focus-wrapper");
  if (focusWrapper) {
    focusWrapper.removeAttribute("tabIndex");
  }

  const elem = document.querySelector("main .container");
  if (elem) {
    (elem as HTMLElement).focus();
  }
};
