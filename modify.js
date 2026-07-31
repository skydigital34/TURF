const fs = require('fs'); 
const file = 'c:/Users/dines/Desktop/turf/index.html'; 
let html = fs.readFileSync(file, 'utf8'); 
let count = 0; 
html = html.replace(/<img([^>]*)>/g, (m, p) => { 
    count++; 
    if(count === 1 || m.includes('loading="lazy"')) return m; 
    return `<img loading="lazy"${p}>`; 
}); 
if(!html.includes('id="imageModal"')) { 
    html = html.replace('</body>', `\n    <!-- Image Modal -->\n    <div class="image-modal" id="imageModal">\n        <span class="modal-close" id="modalClose">&times;</span>\n        <img src="" alt="Popup Image" id="modalImage">\n    </div>\n</body>`); 
} 
fs.writeFileSync(file, html);
