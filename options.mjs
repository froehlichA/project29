import path from 'node:path';
import fs from 'node:fs/promises';
import fsx from 'node:fs';

const index = await fs.readFile(path.join('src', 'index.html'), 'utf8');
const template = await fs.readFile(path.join('src', 'template.html'), 'utf8');
const files = await fs.readdir(path.join('src', 'pages'));
const scripts = files.filter(f => f.endsWith('.js'));

await fs.rm('public', { recursive: true });
await fs.mkdir('public');

// Generate Index
let output = index.replace(
    '<ul class="links"></ul>',
    `<ul class="links">\n${scripts.map(
        s => `    <li><a href="${s.replace(".js", ".html")}">${s.replace(".js", ".webp")}</a></li>`
    ).join('\n')}\n  </ul>`
);
await fs.writeFile(path.join('public', 'index.html'), output, 'utf8');

// Generate HTML Files
for(const script of scripts) {
    const output = template.replace('</html>', `<script src="${script}"></script>\n</html>`);
    const htmlDest = path.join('public', script.replace('.js', '.html'));
    await fs.writeFile(htmlDest, output, "utf8");
}

/** @type import('esbuild').BuildOptions */
export const options = {
    entryPoints: [
        path.join('src', 'dev.js'),
        ...scripts.map(s => ({
            out: s.replace('.js', ''), in: path.join('src', 'pages', s)
        }))
    ],
    minify: true,
    outdir: 'public',
}