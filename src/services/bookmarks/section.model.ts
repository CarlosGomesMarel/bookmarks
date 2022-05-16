import { Link } from ".";

export interface Section {
  name: string;
  tags: string[];
  backgroundColor: string;
  color: string;
  timestamp: Date;
  children: Link[];
  id: string;
}
