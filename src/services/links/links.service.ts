/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

import LocalData from "@/support/local-storage";

import { Link } from ".";

export class LinksSevice {
  /**
   * Fetch links.
   */
  links() {
    const links = LocalData.get("links", []) as Link[];
    links.forEach((link) => {
      if (!link.color) {
        link.color = "gainsboro";
      }
    });
    return links;
  }
}

export const $linksService = new LinksSevice();

Debug.setDebugModule("linksService", $linksService);
