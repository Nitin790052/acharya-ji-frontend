const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function findFiles(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, filter, fileList);
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const jsFiles = findFiles(srcDir, /\.(js|jsx)$/);

jsFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Match: import x from '.../assets/banners/...'
  // and extract 'x'
  const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+["'].*?assets\/banners\/.*?["'];?/g;
  let match;
  const varsToReplace = [];

  while ((match = importRegex.exec(content)) !== null) {
      const varName = match[1];
      varsToReplace.push(varName);
  }

  if (varsToReplace.length > 0) {
      // Remove the import lines completely
      content = content.replace(/import\s+[a-zA-Z0-9_]+\s+from\s+["'].*?assets\/banners\/.*?["'];?\n?/g, '');
      
      // Replace usages of the imported vars if they are used as src or style
      varsToReplace.forEach(v => {
          // Replace object assignments: eg: src={imageX} to src=""
          const srcRegex = new RegExp(`src=\\{${v}\\}`, 'g');
          content = content.replace(srcRegex, `src=""`);
          
          // Replace string interpolation inside url(${v})
          const urlRegex = new RegExp(`url\\(\\\$\\{${v}\\}\\)`, 'g');
          content = content.replace(urlRegex, 'none');

          // Just in case it's used directly in url
          const bgRegex = new RegExp(`url\\(${v}\\)`, 'g');
          content = content.replace(bgRegex, 'none');

          // Used in standard jsx like <img src={v} /> handled by srcRegex
          // what if used conditionally? `src={banner ? banner : other}`
          // Just do a general replacement of the variable name if not standard, but that might break scope.
          // Fallback simple replace for remaining exact matches:
          // In hero banner we passed it to another variable maybe.
      });

      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
  }
});

// Optionally delete the folder
const bannersDir = path.join(srcDir, 'assets', 'banners');
if (fs.existsSync(bannersDir)) {
    fs.rmSync(bannersDir, { recursive: true, force: true });
    console.log(`Deleted ${bannersDir}`);
}
