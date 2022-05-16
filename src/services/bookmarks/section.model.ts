import { Bookmark, Link } from ".";

export interface Section extends Bookmark {
  children: Link[];
}
