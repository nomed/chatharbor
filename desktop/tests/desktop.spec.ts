import { test, expect } from '@playwright/test';
import fixture from '../public/fixtures/synthetic-archive.json' with { type: 'json' };
test('opens verified demo, searches originals, inspects registry and manifest', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', {name: /Esplora archivio/}).click();
  await expect(page.getByText('DATI SINTETICI', {exact: false})).toBeVisible();
  await page.getByRole('textbox', {name: 'Cerca conversazioni e testo'}).fill('faro');
  await page.getByRole('button', {name: /Porto - gruppo sintetico/}).click();
  await expect(page.locator('pre')).toContainText('Il punto di incontro è il faro.');
  await page.getByRole('button', {name: /Registro gruppi/}).click();
  await expect(page.getByText('marta@example.invalid')).toBeVisible();
  await page.getByRole('button', {name: /Integrità/}).click();
  await expect(page.getByRole('cell', {name: 'nota-sintetica.txt',exact: true})).toBeVisible();
});
test('rejects corruption without replacing an already verified archive', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', {name: /Esplora archivio/}).click();
  await expect(page.getByText('SHA-256 verificato', {exact: false})).toBeVisible();
  const corrupt = structuredClone(fixture); corrupt.manifest[0].sha256 = '0'.repeat(64);
  await page.getByLabel('Seleziona archivio JSON').setInputFiles({name: 'corrupt.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(corrupt))});
  await expect(page.getByRole('alert')).toContainText('Verifica integrità fallita');
  await expect(page.getByText('DATI SINTETICI', {exact: false})).toBeVisible();
});
test('renders imported content as inert text without remote calls', async ({ page }) => {
  const external: string[] = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:1420/')) external.push(request.url()); });
  await page.goto('/');
  const source = '<img src="https://example.invalid/leak" onerror="alert(1)">';
  const hash = await page.evaluate(async text => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text))), b => b.toString(16).padStart(2,'0')).join(''), source);
  const archive = {formatVersion:1,files:{'test.txt':Buffer.from(source).toString('base64')},manifest:[{path:'test.txt',byteCount:Buffer.byteLength(source),sha256:hash}],warnings:[],registry:{formatVersion:1,groups:[]}};
  await page.getByLabel('Seleziona archivio JSON').setInputFiles({name:'local.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(archive))});
  await expect(page.locator('pre')).toHaveText(source);
  expect(external).toEqual([]);
  await page.getByRole('button',{name:/Acquisizione/}).click();
  await expect(page.getByRole('button',{name:'Acquisizione non ancora disponibile'})).toHaveCount(2);
});
test('mobile browser preview stays within the viewport', async ({page}) => {
  await page.setViewportSize({width:390,height:844}); await page.goto('/');
  await expect(page.getByRole('button',{name:/Esplora archivio/})).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
