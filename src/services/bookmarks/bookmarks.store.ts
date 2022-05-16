import { v4 as uuidv4 } from "uuid";

import Util from "@/utility";
import Vue from "vue";
import { Link, BookmarkColors, Section } from ".";
import LocalData from "@/support/local-storage";

interface BookmarksState {
  sections: Section[];
}

const BookmarksKey = "bookmarks";
const useRandomColor = false;

class BookmarksStore {
  private state = Vue.observable<BookmarksState>({
    sections: [],
  });

  get sections() {
    return this.state.sections;
  }

  constructor() {
    this.load();
  }

  public removeLink(parent: Section, child: Link) {
    Debug.log("removeLink", child.name, child.id);

    const section = this.findSection(parent);
    if (!section) {
      Debug.error("Did not find section", parent.name, parent.id);
      return;
    }

    const link = this.findLink(section, child);
    if (!link) {
      Debug.error("Did not find", child.name, child.id);
      return;
    }

    const idx = section.children.indexOf(link);
    section.children.splice(idx, 1);

    this.saveSections();
  }

  public removeSection(section: Section) {
    Debug.log("removeSection", section.name, section.id);

    const found = this.findSection(section);

    if (!found) {
      Debug.error("Did not find", section.name, section);
      return;
    }

    const idx = this.state.sections.indexOf(found);
    this.state.sections.splice(idx, 1);

    this.saveSections();
  }

  public upsertSection(section: Section) {
    const response = this.commitSection(section);
    this.saveSections();
    return response;
  }

  public updateLink(parent: Section, child: Link) {
    const section = this.findSection(parent);
    if (!section) {
      Debug.error("updateSection missing section", parent.name, parent.id);
      return;
    }

    const link = this.findLink(section, child);
    if (!link) {
      Debug.error("Did not find", child.name, child.id);
      return;
    }

    Debug.log("updateLink", link.name, link.id);

    link.backgroundColor = child.backgroundColor?.trim();
    link.color = child.color?.trim();
    link.href = child.href;
    link.name = child.name;
    link.tags = child.tags;
    link.timestamp = child.timestamp;

    this.saveSections();
  }

  public updateSection(section: Section) {
    const found = this.findSection(section);
    if (!found) {
      Debug.error("updateSection missing section", section.name, section.id);
      return;
    }

    Debug.log("updateSection", section.name, section.id);

    found.backgroundColor = section.backgroundColor?.trim();
    found.color = section.color?.trim();
    found.name = section.name;
    found.tags = section.tags;
    found.timestamp = section.timestamp;

    this.saveSections();
  }

  findLink(section: Section, link: Link) {
    return section.children.find((item) => {
      if (link.id && item.id) {
        return item.id === link.id;
      }
      return false;
    });
  }

  findSection(section: Section) {
    return this.state.sections.find((item) => {
      if (section.id && item.id) {
        return item.id === section.id;
      }
      return false;
    });
  }

  private load() {
    const sections = <Section[]>LocalData.get(BookmarksKey, []);

    sections.forEach((section) => {
      if (!section.id) {
        section.id = uuidv4();
      }

      if (!section.color) {
        const colorInfo = this.getColorInfo();
        section.backgroundColor = colorInfo.background;
        section.color = colorInfo.color;
      }

      section.children.forEach((link) => {
        if (!link.id) {
          link.id = uuidv4();
        }

        if (!link.color) {
          link.backgroundColor = section.backgroundColor;
          link.color = section.color;
        }
      });
    });

    this.state.sections.splice(0, this.state.sections.length, ...sections);
  }

  private commitSection(section: Section) {
    if (!section.id) {
      section.id = uuidv4();
    }

    section = Vue.observable(section);

    const found = this.state.sections.find((item) => item.name == section.name);

    if (found) {
      const idx = this.state.sections.indexOf(found);
      this.state.sections.splice(idx, 1, section);
      return found;
    } else {
      this.state.sections.push(section);
      return section;
    }
  }

  private getColorInfo() {
    if (useRandomColor) {
      const colors = Object.keys(BookmarkColors).map(
        (key) => BookmarkColors[key]
      );
      return Util.getRandomElement(colors);
    }

    return BookmarkColors.primary;
  }

  private saveSections() {
    LocalData.save(BookmarksKey, JSON.stringify(this.state.sections));
  }
}

export const $bookmarksStore = new BookmarksStore();
Debug.setDebugModule("bookmarksStore", $bookmarksStore);
