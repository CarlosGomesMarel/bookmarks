/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

import LocalData from "@/support/local-storage";
import Util from "@/utility";

import { Link, LinkColors, Section } from ".";

const useRandomColor = false;

export class LinksSevice {
  /**
   * Fetch sections.
   */
  sections() {
    const sections = LocalData.get("links", []) as Section[];
    sections.forEach((section) => {
      if (!section.color) {
        const colorInfo = this.getColorInfo();
        section.backgroundColor = colorInfo.background;
        section.color = colorInfo.color;
      }

      section.links.forEach((link) => {
        if (!link.color) {
          link.backgroundColor = section.backgroundColor;
          link.color = section.color;
        }
      });
    });
    return sections;
  }

  /**
   * Fetch recent links.
   */
  recentLinks() {
    const links = LocalData.get("recentLinks", []) as Link[];
    links.forEach((link) => {
      if (!link.color) {
        const colorInfo = this.getColorInfo();
        link.backgroundColor = colorInfo.background;
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
