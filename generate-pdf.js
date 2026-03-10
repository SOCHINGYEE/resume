const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const htmlPath = '/Users/chingyeeso/Documents/trae_projects/claude/resume/index.html';
  const pdfPath = '/Users/chingyeeso/Documents/trae_projects/claude/resume/简历-苏静仪-A4最新.pdf';
  
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    const fileUrl = 'file://' + htmlPath;
    console.log('Loading:', fileUrl);
    
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Generating PDF (A4)...');
    
    await page.pdf({
      path: pdfPath,
      width: '210mm',
      height: '297mm',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
    });
    
    console.log('PDF generated:', pdfPath);
    const stats = fs.statSync(pdfPath);
    console.log('File size:', (stats.size / 1024).toFixed(2), 'KB');
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
