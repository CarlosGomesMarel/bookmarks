/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
import { orderBy } from "lodash";

import Vue from "vue";
import { Link, Section, Bookmark, LinkInfo } from ".";
import LocalData from "@/support/local-storage";
import { DefaultBookmarks } from "./default-bookmarks";

interface BookmarksState {
  refreshCount: number;
  sections: Section[];
}

const BookmarksKey = "bookmarks";

class BookmarksStore {
  private state = Vue.observable<BookmarksState>({
    refreshCount: 0,
    sections: [],
  });

  get sections() {
    if (this.state.refreshCount) {
      // trigger refresh on save;
    }

    return this.state.sections;
  }

  get links() {
    const links: Link[] = [];

    this.sections.forEach((section) => {
      links.push(...section.children);
    });

    return links;
  }

  get linkInfos() {
    return this.getLinkInfos(this.sections);
  }

  get recentBookmarks() {
    return orderBy(
      this.links.filter((item) => item.clickCount),
      ["clickCount"],
      ["desc"]
    ).slice(0, 5);
  }

  constructor() {
    this.load();
  }

  public addToSection(newLink: Link, parent: Section) {
    Debug.log("addToSection", newLink.name, parent.name);

    const section = this.findSection(parent);
    section.children.splice(0, 0, newLink);

    this.replaceDuplicateLink(section, newLink, this.sections);
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

  public findLinkById(id: string) {
    const found: LinkInfo[] = [];

    this.state.sections.forEach((section) => {
      const links = section.children.filter((link) => link.id === id);
      if (links.length) {
        const linkInfos = links.map(
          (item) =>
            <LinkInfo>{
              section: section,
              link: item,
            }
        );
        found.push(...linkInfos);
      }
    });

    if (!found.length) {
      Debug.error("Missing link with id", id);
      throw `Missing link with id ${id}`;
    }

    return found[0];
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

  public loadFromJson(json: string): [boolean, string] {
    try {
      const sections = JSON.parse(json);
      if (!sections.length) {
        return [false, "No bookmarks found"];
      }

      this.loadBookmarks(sections);
      this.saveSections();

      return [true, "Loaded bookmarks"];
    } catch (err) {
      return [false, "Failed to parse bookmarks " + err];
    }
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

  public updateLink(parent: Section, child: Link) {
    parent = this.findSection(parent);
    const found = this.findLink(parent, child);

    Debug.log("updateLink", found.name, found.id);

    found.backgroundColor = child.backgroundColor?.trim();
    found.color = child.color?.trim();
    found.href = child.href?.trim();
    found.name = child.name?.trim();
    found.tags = child.tags;
    found.timestamp = child.timestamp;

    this.replaceDuplicateLink(parent, found, this.sections);

    this.saveSections();
  }

  public updateSection(section: Section) {
    Debug.log("updateSection", section.name, section.id);

    const found = this.findSection(section);

    found.backgroundColor = section.backgroundColor?.trim();
    found.color = section.color?.trim();
    found.name = section.name?.trim();
    found.tags = section.tags;
    found.timestamp = section.timestamp;

    this.saveSections();
  }

  public upsertSection(section: Section) {
    const response = this.commitSection(section);

    this.saveSections();
    return response;
  }

  private getLinkInfos(sections: Section[]) {
    const results: LinkInfo[] = [];

    sections.forEach((section) => {
      section.children.forEach((link) => {
        results.push({
          section: section,
          link: link,
        });
      });
    });

    return results;
  }

  private load() {
    let sections = <Section[]>LocalData.get(BookmarksKey, null);
    if (sections === null) {
      sections = DefaultBookmarks;
    }

    this.loadBookmarks(sections);
  }

  private loadBookmarks(sections: Section[]) {
    sections.forEach((section) => {
      section.name = section.name?.trim();

      if (!section.id) {
        section.id = uuidv4();
      }

      section.children.forEach((link) => {
        if (!link.id) {
          link.id = uuidv4();
        }

        link.name = link.name?.trim();
        link.href = link.href?.trim();
      });
    });

    this.replaceDuplicateLinks(sections);

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

  private replaceDuplicateLinks(sections: Section[]) {
    const linkInfos = this.getLinkInfos(sections);
    while (linkInfos.length > 0) {
      const info = linkInfos[0];
      linkInfos.splice(0, 1);

      const link = info.link;
      const matchingLinks = linkInfos.filter(
        (item) =>
          item.link !== link &&
          item.link.name == link.name &&
          item.link.href == link.href
      );

      matchingLinks.forEach((duplicate) => {
        const idx = duplicate.section.children.indexOf(duplicate.link);
        if (idx != -1) {
          const oldLink = duplicate.section.children[idx];
          duplicate.section.children.splice(idx, 1, link);

          const found = linkInfos.find((item) => item.link == oldLink);
          const foundIdx = linkInfos.indexOf(found);
          if (foundIdx != -1) {
            linkInfos.splice(foundIdx, 1);
          }
        }
      });
    }
  }

  private replaceDuplicateLink(
    section: Section,
    link: Link,
    sections: Section[]
  ) {
    const linkInfos = this.getLinkInfos(sections);
    const matchingLinks = linkInfos.filter(
      (item) =>
        item.link !== link &&
        item.link.name == link.name &&
        item.link.href == link.href
    );

    matchingLinks.forEach((duplicate) => {
      const idx = duplicate.section.children.indexOf(duplicate.link);
      if (idx != -1) {
        const oldLink = duplicate.section.children[idx];
        duplicate.section.children.splice(idx, 1, link);

        const found = linkInfos.find((item) => item.link == oldLink);
        const foundIdx = linkInfos.indexOf(found);
        if (foundIdx != -1) {
          linkInfos.splice(foundIdx, 1);
        }
      }
    });
  }

  private saveSections() {
    LocalData.save(BookmarksKey, JSON.stringify(this.state.sections));
    this.state.refreshCount++;
  }
}

export const $bookmarksStore = new BookmarksStore();
Debug.setDebugModule("bookmarksStore", $bookmarksStore);
