import { v4 as uuidv4 } from "uuid";

import Util from "@/utility";
import Vue from "vue";
import { Link, BookmarkColors, Section, Bookmark } from ".";
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
    if (!section) {
      Debug.error("addToSection missing section", parent.name, parent.id);
      return;
    }

    section.children.splice(0, 0, newLink);

    this.saveSections();
  }

  public insertAfter(newLink: Link, parent: Section, child: Link) {
    Debug.log("insertAfter", newLink.name, parent.name, child.name);

    const section = this.findSection(parent);
    if (!section) {
      Debug.error("insertAfter missing section", parent.name, parent.id);
      return;
    }

    const link = this.findLink(section, child);
    if (!link) {
      Debug.error("Did not find", child.name, child.id);
      return;
    }

    const idx = Math.min(
      section.children.indexOf(child) + 1,
      section.children.length - 1
    );
    section.children.splice(idx, 0, newLink);

    this.saveSections();
  }

  public insertBefore(newLink: Link, parent: Section, child: Link) {
    Debug.log("insertBefore", newLink.name, parent.name, child.name);

    const section = this.findSection(parent);
    if (!section) {
      Debug.error("insertBefore missing section", parent.name, parent.id);
      return;
    }

    const link = this.findLink(section, child);
    if (!link) {
      Debug.error("Did not find", child.name, child.id);
      return;
    }

    const idx = Math.max(0, section.children.indexOf(child));
    section.children.splice(idx, 0, newLink);

    this.saveSections();
  }

  public insertSectionAfter(newSection: Section, parent: Section) {
    Debug.log("insertSectionAfter", newSection.name, parent.name);

    const section = this.findSection(parent);
    if (!section) {
      Debug.error("insertSectionAfter missing section", parent.name, parent.id);
      return;
    }

    const idx = Math.min(
      this.sections.indexOf(section) + 1,
      this.sections.length - 1
    );
    this.sections.splice(idx, 0, newSection);

    this.saveSections();
  }

  public insertSectionBefore(newSection: Section, parent: Section) {
    Debug.log("insertSectionBefore", newSection.name, parent.name);

    const section = this.findSection(parent);
    if (!section) {
      Debug.error(
        "insertSectionBefore missing section",
        parent.name,
        parent.id
      );
      return;
    }

    const idx = Math.max(0, this.sections.indexOf(section));
    this.sections.splice(idx, 0, newSection);

    this.saveSections();
  }

  public removeLink(parent: Section, child: Link, save = true) {
    Debug.log("removeLink", child.name, child.id);

    const section = this.findSection(parent);
    if (!section) {
      Debug.error("removeLink missing section", parent.name, parent.id);
      return;
    }

    const link = this.findLink(section, child);
    if (!link) {
      Debug.error("Did not find", child.name, child.id);
      return;
    }

    const idx = section.children.indexOf(child);
    section.children.splice(idx, 1);

    if (save) {
      this.saveSections();
    }
  }

  public removeSection(section: Section, save = true) {
    Debug.log("removeSection", section.name, section.id);

    const found = this.findSection(section);

    if (!found) {
      Debug.error("Did not find", section.name, section);
      return;
    }

    const idx = this.state.sections.indexOf(found);
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
    const section = this.findSection(parent);
    if (!section) {
      Debug.error("updateLink missing section", parent.name, parent.id);
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

  findLink(section: Section, link: Bookmark) {
    return section.children.find((item) => {
      if (link.id && item.id) {
        return item.id === link.id;
      }
      return false;
    });
  }

  findSection(section: Bookmark) {
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
