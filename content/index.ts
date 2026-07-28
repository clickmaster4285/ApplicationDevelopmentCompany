// Auto-generated master index
// Generated: 2026-07-28T10:29:45.998245
// Total categories: 16

import aboutData from "./about";
import blogsData from "./blogs";
import caseStudiesData from "./case-studies";
import compareData from "./compare";
import costData from "./cost";
import ebooksData from "./ebooks";
import frameworksData from "./frameworks";
import homeData from "./home";
import industriesData from "./industries";
import locationsData from "./locations";
import platformsData from "./platforms";
import resourcesData from "./resources";
import servicesData from "./services";
import solutionsData from "./solutions";
import technologiesData from "./technologies";

export interface AllPagesData {
  [key: string]: {
    totalPages: number;
    generatedAt: string;
    pages: any[];
  };
}

export const allPages: AllPagesData = {
  about: aboutData,
  blogs: blogsData,
  caseStudies: caseStudiesData,
  compare: compareData,
  cost: costData,
  ebooks: ebooksData,
  frameworks: frameworksData,
  home: homeData,
  industries: industriesData,
  locations: locationsData,
  platforms: platformsData,
  resources: resourcesData,
  services: servicesData,
  solutions: solutionsData,
  technologies: technologiesData,
};

export default allPages;