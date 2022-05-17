import { Link, Section } from ".";

export interface LinkInfo {
  section: Section;
  link: Link;
}

export const DefaultLinkInfo: LinkInfo = {
  section: null,
  link: null,
};
