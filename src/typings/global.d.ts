declare interface Window {
  __FLEXSEARCH__: IWindowFlexSearch;
}

interface IWindowFlexSearch {
  en: IWindowFlexSearchEn;
}

interface IWindowFlexSearchEn {
  index: IWindowFlexSearchEnIndex;
  store: IWindowFlexSearchEnStore;
}

interface IWindowFlexSearchEnStore {
  filter(
    arg0: (
      node: IWindowFlexSearchEnStoreNode
    ) => IWindowFlexSearchEnStoreNode | null
  ): IWindowFlexSearchEnStore;
  map(
    arg0: (node: IWindowFlexSearchEnStoreNode) => any
  ): IWindowFlexSearchResults;
}

interface IWindowFlexSearchEnStoreNode {
  node: IWindowFlexSearchEnStoreNode;
  id: number;
}

interface IWindowFlexSearchEnIndex {
  [key: number | string]: IWindowFlexSearchEnIndex;
  values: IWindowFlexSearchEnIndexValues;
}

interface IWindowFlexSearchResults extends Array<object> {
  html?: string;
  title?: string;
  url?: string;
}

interface IWindowFlexSearchEnIndexValues {
  search(query: string): number[];
}

interface ISearchResult {
  url: string;
  title: string;
  html: string;
}

// Modules
declare module "slug";
declare module "*/ThemeDropdown";
declare module "*/content/assets/color-theme-moon-icon.inline.svg";
declare module "*/content/assets/color-theme-sun-icon.inline.svg";
declare module "*/content/assets/color-theme-auto-icon.inline.svg";
declare module "*/content/assets/color-theme-tick-icon.inline.svg";

// Make SCSS modules work
declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

type IGatsbyImageData = import("gatsby-plugin-image").IGatsbyImageData;

interface IHead {
  location: {
    pathname: string;
  };
}

interface IHeadWithDataMarkdownRemark extends IHead {
  data: GraphQL.markdownRemark;
}

interface IHeadWithDataMarkdownRemarkImageNotFound extends IHead {
  data: GraphQL.markdownRemark & GraphQL.imageNotFound;
}

interface IHeadWithPageContextTag extends IHead {
  pageContext: pageContext;
}

interface IHeadComponents {
  setHeadComponents: (arg1: Array<JSX.IntrinsicElements["script"]>) => void;
  setHtmlAttributes: (arg1: IHeadComponentsObject) => void;
}

interface IHeadComponentsObject {
  lang: string;
}

interface pageContext {
  tag: string;
}

interface ITagTotalCount {
  tag: string;
  totalCount: number;
}

interface ILayout {
  children?: string | JSX.Element | JSX.Element[];
  className?: string;
}

interface IImage {
  alt: string;
  image: IGatsbyImage;
  className?: string;
}

interface IGatsbyImage {
  publicURL: string;
  childImageSharp: IGatsbyImgData;
}

interface IGatsbyImgData {
  gatsbyImageData: IGatsbyImageData;
}

interface IRecipeSchemaJSON {
  "@context": string;
  "@type": string;
  author: {
    "@type": string;
    name: string;
  };
  name: string;
  description: string;
  recipeCategory: string;
  image: string;
  recipeInstructions: IRecipeInstruction[];
  recipeIngredient: string[];
  notes: string;
  basedOn: string;
}

interface IRecipeInstruction {
  "@type": string;
  text: string;
}

interface ISeo {
  basedOn?: string;
  description?: string;
  image?: string;
  ingredients?: string[];
  isRecipe?: boolean;
  notes?: string;
  pathname?: string;
  steps?: string[];
  title: string;
  children?: ReactNode;
}

interface IRecipeData {
  body: string;
  description: string;
  ingredientsHtml: string;
  ingredientsArray: string[];
  steps: string;
  notes: string;
  notesPlain: string;
  basedOnLink: string;
  basedOnText: string;
}

// Recipes
interface IRecipeNode {
  recipe: GraphQL.node;
}

interface IAppendixRecipePage {
  data: GraphQL.markdownRemark & GraphQL.imageNotFound;
  pageContext: IPrevNext;
}

interface ITagPage {
  data: ITagPageAllMarkdownRemark & GraphQL.imageNotFound;
  pageContext: IPrevNext;
}

interface ITagPageAllMarkdownRemark {
  allMarkdownRemark: GraphQL.allMarkdownRemark;
}

interface IPrevNext {
  previous: GraphQL.node;
  next: GraphQL.node;
  tag: string;
}
