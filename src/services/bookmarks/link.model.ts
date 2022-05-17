import { Bookmark } from ".";

export interface Link extends Bookmark {
  href: string;
  clickCount: number;
}

export const DefaultLink: Link = {
  name: null,
  id: null,
  backgroundColor: null,
  color: null,
  href: null,
  tags: [],
  timestamp: null,
  clickCount: 0,
};
