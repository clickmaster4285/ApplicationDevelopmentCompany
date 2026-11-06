/**
 * Single source of truth for public trust figures.
 * Update these values here only — every component reads from this file so
 * the site never shows contradictory numbers.
 */
export const FOUNDED_YEAR = 2014;
export const PROJECTS_DELIVERED = 150;
export const HAPPY_CLIENTS = 120;
export const COUNTRIES_SERVED = 32;

/** Full years in business, computed so it never goes stale. */
export const YEARS_EXPERIENCE = new Date().getFullYear() - FOUNDED_YEAR;

export const PROJECTS_LABEL = `${PROJECTS_DELIVERED}+`;
export const CLIENTS_LABEL = `${HAPPY_CLIENTS}+`;
export const YEARS_LABEL = `${YEARS_EXPERIENCE}+`;
