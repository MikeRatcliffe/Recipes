exports.onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
}: IHeadComponents) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require("react");

  setHeadComponents([
    <script
      key="themeScript"
      dangerouslySetInnerHTML={{
        __html: `(function () {
          const COLORMODE = {
            auto: "auto",
            light: "light",
            dark: "dark"
          };

          let theme = localStorage.getItem("theme") || COLORMODE.light;

          if (theme === COLORMODE.auto) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
              theme = COLORMODE.dark;
            } else {
              theme = COLORMODE.light;
            }
          }

          const htmlNode = document.documentElement;
          htmlNode.setAttribute("data-bs-theme", theme);

          window.addEventListener("beforeprint", () => {
            htmlNode.setAttribute("data-bs-theme", COLORMODE.light);
          });

          window.addEventListener("afterprint", () => {
            htmlNode.setAttribute("data-bs-theme", theme);
          });
        })()`,
      }}
    />,
  ]);

  setHtmlAttributes({
    lang: "en",
  });
};
