import { Bookmark } from ".";

export interface Link extends Bookmark {
  href: string;
}

export const DefaultLink: Link = {
  name: null,
  id: null,
  backgroundColor: null,
  color: null,
  href: null,
  tags: [],
  timestamp: null,
};
