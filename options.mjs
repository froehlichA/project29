import path from 'node:path';
import fs from 'node:fs/promises';
import fsx from 'node:fs';

const template = await fs.readFile(path.join('src', 'template.html'), 'utf8');
const files = await fs.readdir(path.join('src', 'pages'));
const scripts = files.filter(f => f.endsWith('.js'));

await fs.rm('public', { recursive: true });
await fs.mkdir('public');

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