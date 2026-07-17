const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // We are looking for:
  // <section className="section-padding...">
  //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  // ...
  //   </div>
  // </section>

  // Since regex across multiple lines with arbitrary HTML is hard, we can do a simpler replacement.
  // Replace `<section className="section-padding` with `<Section className="`
  // Replace `</section>` with `</Section>`
  // But we have to be careful not to break the Hero section which doesn't have `section-padding`
  
  // 1. Replace the opening tags
  const sectionOpenRegex = /<section\s+([^>]*className="[^"]*section-padding[^"]*"[^>]*)>[\s\n]*<div\s+className="max-w-[765]xl\s+mx-auto\s+px-4\s+sm:px-6(?:\s+lg:px-8)?"(?:[^>]*)>/g;
  
  let match;
  let matches = [];
  while ((match = sectionOpenRegex.exec(content)) !== null) {
    matches.push({
      start: match.index,
      end: sectionOpenRegex.lastIndex,
      attrs: match[1],
      full: match[0]
    });
  }

  if (matches.length === 0) return false;

  // 2. We need to find the matching closing </div> and </section>.
  // Because they can be nested, we should just replace them backwards.
  // Actually, since we know they are perfectly paired `</div>\n      </section>`, we can just regex replace that.
  // But what if it's `</div>\n    </section>`?
  // Let's replace `</section>` with `</Section>` for the ones we changed.
  
  // A simpler way:
  let newContent = content;
  newContent = newContent.replace(sectionOpenRegex, (match, attrs) => {
    return `<Section ${attrs}>`;
  });
  
  // Now we have mismatched </div>. We replaced the opening </div>, so we need to remove the closing </div> right before </section>.
  newContent = newContent.replace(/<\/div>[\s\n]*<\/section>/g, '</Section>');

  // Also import Section and Container if not present
  if (!newContent.includes('import { Section }')) {
    const importStatement = `import { Section } from "@/components/ui/Section";\n`;
    const lastImportIndex = newContent.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLine = newContent.indexOf('\n', lastImportIndex);
      newContent = newContent.slice(0, endOfLine + 1) + importStatement + newContent.slice(endOfLine + 1);
    } else {
      // Find "use client"; if it exists
      if (newContent.includes('"use client";')) {
         newContent = newContent.replace('"use client";', '"use client";\n' + importStatement);
      } else {
         newContent = importStatement + newContent;
      }
    }
  }
  
  // Also fix Hero section:
  // <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 xl:gap-20">
  // We can leave it, or change to <Container>. If we leave it, that's fine.

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated: ${filePath}`);
  return true;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('page.tsx')) {
      processFile(fullPath);
    }
  }
}

// Just process Batch 1 for now
const batch1 = [
  'app/page.tsx',
  'app/about/page.tsx',
  'app/events/page.tsx',
  'app/members/page.tsx'
];

for (const file of batch1) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        processFile(fullPath);
    } else {
        console.log(`Not found: ${file}`);
    }
}
