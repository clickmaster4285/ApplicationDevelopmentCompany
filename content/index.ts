// Auto-generated master index
// Generated: 2026-07-27T11:17:31.590075
// Total categories: 12

import aboutData from "./about.js";
import compareData from "./compare.js";
import costData from "./cost.js";
import frameworksData from "./frameworks.js";
import homeData from "./home.js";
import industriesData from "./industries.js";
import locationsData from "./locations.js";
import platformsData from "./platforms.js";
import resourcesData from "./resources.js";
import servicesData from "./services.js";
import solutionsData from "./solutions.js";
import technologiesData from "./technologies.js";

export interface AllPagesData {
  [key: string]: {
    totalPages: number;
    generatedAt: string;
    pages: any[];
  };
}

export const allPages: AllPagesData = {
  about: aboutData,
  compare: compareData,
  cost: costData,
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
