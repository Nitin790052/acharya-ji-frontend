const fs = require('fs');
const path = require('path');

const dir = 'd:/Acharya_Ji_Onilne_website/frontend/src/app/Admin_panel_acharya/src';

const walk = (currentDir) => {
  let results = [];
  try {
    const list = fs.readdirSync(currentDir);
    list.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(filePath));
      } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('BE514A') || content.includes('rgba(190, 81, 74')) {
          results.push(filePath);
        }
      }
    });
  } catch(e) { console.log(e); }
  return results;
};

const filesToUpdate = walk(dir);
console.log('Files to update:', filesToUpdate.length);

filesToUpdate.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // They want to remove bg-[#BE514A] and apply dark blue to text (e.g. text-blue-900).
  // "remove background and use dark blue text in a light gray theme"
  // For standard buttons or blocks, if it's bg-[#BE514A] text-white -> bg-slate-100/200 text-blue-900
  // Or maybe just change bg-[#BE514A] to bg-blue-900? 
  // "ye hata ker text per dark blue laga do... light gray theme rakho"
  // Meaning remove the heavy colored background. Make the text dark blue, maybe bg-gray-100 or bg-gray-50.
  // Actually, let's just replace all `#BE514A` references with dark blue colors contextually.
  
  // e.g. text-[#BE514A] -> text-blue-900
  content = content.replace(/text-\[#BE514A\]/g, 'text-blue-900');
  
  // bg-[#BE514A] text-white -> bg-gray-100 text-blue-900 font-bold border border-gray-200
  // "text per dark blue laga do" means put dark blue on the text! And for background, "light gray theme rakho" means make background light gray.
  // Wait, let's just make it bg-gray-100 text-blue-900
  content = content.replace(/bg-\[#BE514A\]\s+text-white/g, 'bg-gray-100 text-blue-900 font-bold border border-gray-200');
  // Or just bg-[#BE514A] -> bg-gray-100 text-blue-900
  content = content.replace(/bg-\[#BE514A\]/g, 'bg-gray-100 text-blue-900 border border-gray-200');
  
  // border-[#BE514A] -> border-gray-200
  content = content.replace(/border-\[#BE514A\]/g, 'border-gray-200');
  
  // Hex colors
  content = content.replace(/#BE514A/g, '#1e3a8a'); // hex for blue-900
  
  // rgba for glassmorphism from Sidebar.jsx
  content = content.replace(/rgba\(190,\s*81,\s*74/g, 'rgba(30,58,138'); 

  fs.writeFileSync(file, content);
  console.log(`Updated: ${file}`);
});
