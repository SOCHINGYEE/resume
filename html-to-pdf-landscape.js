const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const htmlPath = '/Users/chingyeeso/Documents/trae_projects/claude/resume/index.html';
  const pdfPath = '/Users/chingyeeso/Documents/trae_projects/claude/resume/简历-苏静仪-横向.pdf';
  
  if (!fs.existsSync(htmlPath)) {
    console.error(`HTML file not found: ${htmlPath}`);
    process.exit(1);
  }
  
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    const fileUrl = 'file://' + htmlPath;
    console.log(`Loading: ${fileUrl}`);
    
    await page.goto(fileUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Wait for fonts to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Generating PDF (Landscape A4)...');
    
    // Generate PDF with Landscape A4 size
    await page.pdf({
      path: pdfPath,
      width: '297mm',   // A4 landscape width
      height: '210mm',  // A4 landscape height
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });
    
    console.log(`✅ PDF generated successfully: ${pdfPath}`);
    
    const stats = fs.statSync(pdfPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📄 File size: ${fileSizeInKB} KB`);
    console.log(`📐 Orientation: Landscape (297mm × 210mm)`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();
