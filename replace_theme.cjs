const fs = require('fs');
const path = require('path');

const targetDir = 'd:\\Acharya_Ji_Onilne_website\\frontend\\src\\app\\Admin_panel_acharya\\src';

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace Tailwind arbitrary classes
  content = content.replace(/\[#BE514A\]/g, 'blue-900');
  
  // Replace string literals or theme constants
  content = content.replace(/#BE514A/gi, '#1e3a8a');
  
  // Replace the light red/pink highlight background
  content = content.replace(/\[#f5e6e5\]/g, 'blue-50');

  // Also replace any uppercase occurrences just in case
  content = content.replace(/\[#be514a\]/g, 'blue-900');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceColorsInFile(fullPath);
    }
  });
}

walk(targetDir);
console.log('Done!');
