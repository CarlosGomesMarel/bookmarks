/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

import LocalData from "@/support/local-storage";
import Util from "@/utility";

import { Link, LinkColors } from ".";

const useRandomColor = false;

export class LinksSevice {
  /**
   * Fetch links.
   */
  links() {
    const links = LocalData.get("links", []) as Link[];
    links.forEach((link) => {
      if (!link.color) {
        const colorInfo = this.getColorInfo();
        link.background = colorInfo.background;
        link.color = colorInfo.color;
      }
    });
    return links;
  }

  /**
   * Fetch recent links.
   */
  recentLinks() {
    const links = LocalData.get("recentLinks", []) as Link[];
    links.forEach((link) => {
      if (!link.color) {
        const colorInfo = this.getColorInfo();
        link.background = colorInfo.background;
        link.color = colorInfo.color;
      }
    });
    return links;
  }

  private getColorInfo() {
    if (useRandomColor) {
      const colors = Object.keys(LinkColors).map((key) => LinkColors[key]);
      return Util.getRandomElement(colors);
    }

    return LinkColors.primary;
  }
}

export const $linksService = new LinksSevice();

Debug.setDebugModule("linksService", $linksService);
