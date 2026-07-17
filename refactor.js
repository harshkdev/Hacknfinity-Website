const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Add imports if they don't exist and we need them
  const hasSectionImport = content.includes('import { Section }');
  const hasContainerImport = content.includes('import { Container }');
  
  if (content.includes('<section className="section-padding')) {
    if (!hasSectionImport) {
      // Find the last import
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const nextLineIndex = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, nextLineIndex + 1) + 
          'import { Section } from "@/components/ui/Section";\n' + 
          content.slice(nextLineIndex + 1);
      } else {
        content = 'import { Section } from "@/components/ui/Section";\n' + content;
      }
    }
  }

  // Replace <section className="section-padding..."> \n <div className="max-w-7xl...">
  // We use regex to match this exactly.
  
  // First, find all instances of <section className="section-padding...">
  const sectionRegex = /<section\s+([^>]*className="[^"]*section-padding[^"]*"[^>]*)>[\s\n]*<div\s+className="max-w-[567]xl\s+mx-auto\s+px-4\s+sm:px-6(?:\s+lg:px-8)?"(?:[^>]*)>/g;
  
  content = content.replace(sectionRegex, (match, attrs) => {
    // we drop the inner div
    return `<Section ${attrs}>`;
  });

  // Since we dropped the inner div, we need to drop the corresponding </div> before </section>
  // A simple way is to replace `</div>\n      </section>` with `</Section>`
  // This is tricky with regex, so let's do it manually.
  
  // Actually, a simpler way is just to replace `<section className="section-padding` with `<Section className="`
  // and manually fix the divs. But we have 18 pages.
}

console.log("Script ready");
