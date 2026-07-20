import { projects } from "../src/content/projects";
import { siteContent } from "../src/content/site";
import { validatePortfolioContent } from "../src/lib/content/validate";

const result = validatePortfolioContent(projects, siteContent);

for (const warning of result.warnings) {
  console.warn(`warning: ${warning}`);
}

if (result.errors.length > 0) {
  for (const error of result.errors) {
    console.error(`error: ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Content validation passed for ${projects.length} projects with ${result.warnings.length} warning(s).`,
  );
}
