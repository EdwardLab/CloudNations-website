import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { build, root, routes } from './build.mjs';
import { previewServer } from './scripts/preview.mjs';
const output=resolve(root,'.local/acceptance-build');
let server,origin;
before(async()=>{
  await build({output});
  server=previewServer(output);
  await new Promise(done=>server.listen(0,'127.0.0.1',done));
  origin=`http://127.0.0.1:${server.address().port}`;
});
after(async()=>{ await new Promise(done=>server.close(done)); await rm(output,{recursive:true,force:true}); });
const fileFor=path=>resolve(output,path==='/'?'index.html':path.endsWith('.html')?path.slice(1):path.slice(1)+'index.html');
const ids=text=>new Set([...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
test('all five pages have distinct metadata, one heading and noindex in preview',async()=>{
  const titles=new Set();
  for(const route of routes){
    const html=await readFile(fileFor(route.path),'utf8');
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.match(html,/<html lang="en">/);
    assert.match(html,/<meta name="robots" content="noindex,nofollow">/);
    assert.match(html,/<meta name="description" content="[^"]+">/);
    assert.match(html,/<link rel="canonical" href="https:\/\/cloudnations.org\//);
    assert.match(html,/<meta property="og:image" content="https:\/\/cloudnations.org\/assets\/share.png">/);
    titles.add(html.match(/<title>([^<]+)<\/title>/)[1]);
    assert(!html.includes('{{LEGAL_STATUS}}'));
  }
  assert.equal(titles.size,routes.length);
  assert.equal(await readFile(resolve(output,'robots.txt'),'utf8'),'User-agent: *\nDisallow: /\n');
});
test('every internal link, fragment, stylesheet, script, image and font resolves',async()=>{
  for(const route of routes){
    const html=await readFile(fileFor(route.path),'utf8');
    for(const match of html.matchAll(/(?:href|src)="([^" ]+)"/g)){
      const url=new URL(match[1],origin+route.path);
      if(url.origin!==origin)continue;
      const page=url.pathname.endsWith('/')||url.pathname.endsWith('.html');
      const path=page?fileFor(url.pathname):resolve(output,'.'+url.pathname);
      assert((await stat(path)).isFile(),`${route.path}: ${match[1]}`);
      if(url.hash){const target=await readFile(path,'utf8');assert(ids(target).has(url.hash.slice(1)),`${route.path}: ${match[1]}`);}
    }
  }
  for(const path of ['dm-sans-latin.woff2','id-back.webp','hero-800.webp'])assert((await stat(resolve(output,'assets',path))).size>100);
});
test('business terms, Wallet actions and fictional examples are present',async()=>{
  const home=await readFile(fileFor('/'),'utf8');
  const about=await readFile(fileFor('/about/'),'utf8');
  const support=await readFile(fileFor('/support/'),'utf8');
  assert.match(home,/\$19\.99/);assert.match(home,/\$49\.99/);
  assert.match(home,/fees are non-refundable/);assert.match(home,/basic account reports unverified/);
  assert.match(home,/Apple Wallet is coming soon/);assert.match(home,/add your Digital Resident ID to Google Wallet/);
  assert.match(home,/Example credential\. Fictional details\./);
  assert.match(home,/Complete KYC/);assert(!/Didit/.test(home+about+support));
  assert.match(about,/10,000/);assert.match(about,/January 1, 2028 UTC/);
  assert.match(about,/Founding Resident · 2026/);assert(!/Test only|demo mode|publishing approval|in testing/i.test(home+about+support));
  assert.match(support,/mailto:contact@cloudnations\.org/);assert(!/contact@edgealphix\.com/.test(home+about+support));assert(!support.includes('<form'));
  for(const page of ['/privacy/','/terms/'])assert.match(await readFile(fileFor(page),'utf8'),/Review draft\. Not yet published/);
});
test('preview HTTP routes, redirects, 404 and MIME types work',async()=>{
  for(const route of routes){const response=await fetch(origin+route.path);assert.equal(response.status,200);assert.match(response.headers.get('content-type'),/text\/html/);assert.match(response.headers.get('x-robots-tag'),/noindex/);}
  const redirect=await fetch(origin+'/support',{redirect:'manual'});assert.equal(redirect.status,308);assert.equal(redirect.headers.get('location'),'/support/');
  const missing=await fetch(origin+'/missing-page/');assert.equal(missing.status,404);assert.match(await missing.text(),/This page/);
  const image=await fetch(origin+'/assets/hero-1200.webp');assert.equal(image.headers.get('content-type'),'image/webp');
  const head=await fetch(origin+'/styles.css',{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
  assert.equal((await fetch(origin+'/.env')).status,404);
  assert.equal((await fetch(origin+'/support/',{method:'POST'})).status,405);
});
test('production requires explicit legal approval and emits correct publishing artifacts',async()=>{
  await assert.rejects(build({production:true,output:resolve(root,'.local/publish-test')}),/reviewed legal/);
  const published=await build({production:true,legalApproved:true,output:resolve(root,'.local/publish-test')});
  const html=await readFile(resolve(published,'index.html'),'utf8');
  assert.match(html,/content="index,follow"/);
  for(const page of ['privacy','terms']){
    const legal=await readFile(resolve(published,page,'index.html'),'utf8');
    assert(!/Review draft|Not yet published|local preview|before this draft is published/.test(legal));
    assert.match(legal,/Updated October 13, 2026/);
  }
  assert.equal(await readFile(resolve(published,'CNAME'),'utf8'),'cloudnations.org\n');
  assert.match(await readFile(resolve(published,'robots.txt'),'utf8'),/Allow: \/\nSitemap:/);
  assert.equal((await readFile(resolve(published,'sitemap.xml'),'utf8')).match(/<loc>/g).length,5);
  await stat(resolve(published,'.nojekyll'));
  await rm(published,{recursive:true,force:true});
});
test('homepage assets fit a bounded static-site budget',async()=>{
  const names=['hero-1200.webp','id-front.webp','id-back.webp','certificate.webp','community-1200.webp','dm-sans-latin.woff2'];
  let total=0;
  for(const name of names)total+=(await stat(resolve(output,'assets',name))).size;
  assert(total<900_000,`Homepage image and font total ${total} bytes`);
  assert((await stat(resolve(output,'script.js'))).size<8000);
});
test('every page requests the published stylesheet independently of the legacy cached URL',async()=>{
  const stylesheets=new Set();
  for(const route of routes){
    const html=await readFile(fileFor(route.path),'utf8');
    const stylesheet=html.match(/<link rel="stylesheet" href="([^"]+)"/)[1];
    assert.match(stylesheet,/^\/styles\.[a-f0-9]{12}\.css$/);
    const response=await fetch(origin+stylesheet);
    assert.equal(response.status,200);
    assert.equal(await response.text(),await readFile(resolve(root,'styles.css'),'utf8'));
    stylesheets.add(stylesheet);
  }
  assert.equal(stylesheets.size,1);
});
