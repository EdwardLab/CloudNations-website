import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { root } from '../build.mjs';
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
export function previewServer(directory = resolve(root,'dist')) {
  return createServer(async (request,response) => {
    response.setHeader('X-Robots-Tag','noindex, nofollow');
    response.setHeader('X-Content-Type-Options','nosniff');
    response.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
    response.setHeader('Cache-Control','no-store');
    if (!['GET','HEAD'].includes(request.method)) { response.writeHead(405,{Allow:'GET, HEAD'}); return response.end(); }
    try {
      const pathname = decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname);
      if (pathname.split('/').some(part=>part.startsWith('.')) || pathname.includes('\\') || pathname.includes('\0')) { response.writeHead(404); return response.end(); }
      let file = resolve(directory,'.'+pathname);
      if (!file.startsWith(directory+'/')) { if (file!==directory) { response.writeHead(404); return response.end(); } }
      let status = 200;
      try {
        const info = await stat(file);
        if(info.isDirectory()) {
          if (!pathname.endsWith('/')) { response.writeHead(308,{Location:pathname+'/'}); return response.end(); }
          file=resolve(file,'index.html');
        }
        await stat(file);
      } catch { status=404; file=resolve(directory,'404.html'); }
      const data=await readFile(file);
      response.writeHead(status,{'Content-Type':types[extname(file)] ?? 'application/octet-stream','Content-Length':data.length});
      response.end(request.method==='HEAD'?undefined:data);
    } catch { response.writeHead(400); response.end('Invalid request.'); }
  });
}
if(process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3210);
  if(!Number.isInteger(port)||port<1024||port>65535) throw new Error('PORT must be an integer between 1024 and 65535.');
  const server=previewServer();
  server.on('error',error=>{ console.error(error.code==='EADDRINUSE'?`Port ${port} is already in use. Set PORT to another available port.`:error); process.exitCode=1; });
  server.listen(port,'127.0.0.1',()=>console.log(`Cloud Nations preview: http://127.0.0.1:${port}/`));
}
