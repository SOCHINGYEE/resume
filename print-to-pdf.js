const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // 设置 A4 尺寸
  await page.setViewport({
    width: 794,  // 210mm in pixels at 96 DPI
    height: 1123, // 297mm in pixels at 96 DPI
    deviceScaleFactor: 2
  });
  
  // 加载本地 HTML 文件
  await page.goto('file:///Users/chingyeeso/Documents/trae_projects/claude/resume/index.html', {
    waitUntil: 'networkidle0'
  });
  
  // 等待字体加载
  await page.waitForTimeout(2000);
  
  // 生成 PDF
  await page.pdf({
    path: 'resume.pdf',
    width: '210mm',
    height: '297mm',
    printBackground: true,
    preferCSSPageSize: true
  });
  
  console.log('PDF 已生成: resume.pdf');
  await browser.close();
})();
