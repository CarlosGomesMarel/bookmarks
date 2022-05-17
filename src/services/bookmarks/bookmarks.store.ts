import { v4 as uuidv4 } from "uuid";

import Util from "@/utility";
import Vue from "vue";
import { Link, BookmarkColors, Section, Bookmark, DefaultColor } from ".";
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

  public addToSection(newLink: Link, parent: Section) {
    Debug.log("addToSection", newLink.name, parent.name);

    const section = this.findSection(parent);
    section.children.splice(0, 0, newLink);
    this.saveSections();

    return this.findLink(section, newLink);
  }

  public findLink(section: Section, link: Bookmark) {
    const found = section.children.find((item) => {
      if (link.id && item.id) {
        return item.id === link.id;
      }
      return false;
    });

    if (!found) {
      Debug.error("Missing link", link.name, link.id);
      throw `Missing link ${link.name} ${link.id}`;
    }

    return found;
  }

  public findSection(section: Bookmark) {
    const found = this.state.sections.find((item) => {
      if (section.id && item.id) {
        return item.id === section.id;
      }
      return false;
    });

    if (!found) {
      Debug.error("Missing section", section.name, section.id);
      throw `Missing section ${section.name} ${section.id}`;
    }

    return found;
  }

  public insertAfter(newLink: Link, parent: Section, child: Link) {
    Debug.log("insertAfter", newLink.name, parent.name, child.name);

    parent = this.findSection(parent);
    child = this.findLink(parent, child);

    const idx = Math.min(
      parent.children.indexOf(child) + 1,
      parent.children.length - 1
    );
    parent.children.splice(idx, 0, newLink);

    this.saveSections();
  }

  public insertBefore(newLink: Link, parent: Section, child: Link) {
    Debug.log("insertBefore", newLink.name, parent.name, child.name);

    parent = this.findSection(parent);
    child = this.findLink(parent, child);

    const idx = Math.max(0, parent.children.indexOf(child));
    parent.children.splice(idx, 0, newLink);

    this.saveSections();
  }

  public insertSectionAfter(newSection: Section, parent: Section) {
    Debug.log("insertSectionAfter", newSection.name, parent.name);

    parent = this.findSection(parent);

    const idx = Math.min(
      this.sections.indexOf(parent) + 1,
      this.sections.length - 1
    );
    this.sections.splice(idx, 0, newSection);

    this.saveSections();
  }

  public insertSectionBefore(newSection: Section, parent: Section) {
    Debug.log("insertSectionBefore", newSection.name, parent.name);

    parent = this.findSection(parent);

    const idx = Math.max(0, this.sections.indexOf(parent));
    this.sections.splice(idx, 0, newSection);

    this.saveSections();
  }

  public removeLink(parent: Section, child: Link, save = true) {
    Debug.log("removeLink", child.name, child.id);

    parent = this.findSection(parent);
    child = this.findLink(parent, child);

    const idx = parent.children.indexOf(child);
    parent.children.splice(idx, 1);

    if (save) {
      this.saveSections();
    }
  }

  public removeSection(section: Section, save = true) {
    Debug.log("removeSection", section.name, section.id);

    section = this.findSection(section);

    const idx = this.state.sections.indexOf(section);
    this.state.sections.splice(idx, 1);

    if (save) {
      this.saveSections();
    }
  }

  public upsertSection(section: Section) {
    const response = this.commitSection(section);

    this.saveSections();
    return response;
  }

  public updateLink(parent: Section, child: Link) {
    parent = this.findSection(parent);
    const found = this.findLink(parent, child);

    Debug.log("updateLink", found.name, found.id);

    found.backgroundColor = child.backgroundColor?.trim();
    found.color = child.color?.trim();
    found.href = child.href;
    found.name = child.name;
    found.tags = child.tags;
    found.timestamp = child.timestamp;

    this.saveSections();
  }

  public updateSection(section: Section) {
    Debug.log("updateSection", section.name, section.id);

    const found = this.findSection(section);

    found.backgroundColor = section.backgroundColor?.trim();
    found.color = section.color?.trim();
    found.name = section.name;
    found.tags = section.tags;
    found.timestamp = section.timestamp;

    this.updateChildrenColors(found);

    this.saveSections();
  }

  private load() {
    const sections = <Section[]>LocalData.get(BookmarksKey, []);

    sections.forEach((section) => {
      if (!section.id) {
        section.id = uuidv4();
      }

      if (!section.color) {
        const colorInfo = this.getColorInfo();
        section.backgroundColor = colorInfo.backgroundColor;
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

  private updateChildrenColors(section: Section) {
    const links = section.children.filter(
      (item) =>
        (item.backgroundColor == DefaultColor.backgroundColor &&
          item.color == DefaultColor.color) ||
        (!item.backgroundColor && !item.color)
    );

    links.forEach((link) => {
      link.backgroundColor = section.backgroundColor;
      link.color = section.color;
    });
  }
}

export const $bookmarksStore = new BookmarksStore();
Debug.setDebugModule("bookmarksStore", $bookmarksStore);
