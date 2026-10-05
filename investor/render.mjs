import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] })
const p = await b.newPage()
await p.goto('file:///home/user/Bridlya/investor/memo.html')
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800)
const hdr = `<div style="width:100%;font:8pt Helvetica,Arial,sans-serif;color:#8a7f78;padding:0 .85in;margin-top:.45in;display:flex;justify-content:space-between"><span style="letter-spacing:.2em">BRIDLYA</span><span>Investor Memorandum</span></div>`
const ftr = `<div style="width:100%;font:8pt Helvetica,Arial,sans-serif;color:#8a7f78;padding:0 .85in;display:flex;justify-content:space-between"><span>Confidential · Pre-launch concept</span><span class="pageNumber"></span></div>`
await p.pdf({ path: process.argv[2], format: 'Letter', printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true, headerTemplate: hdr, footerTemplate: ftr })
await b.close()
