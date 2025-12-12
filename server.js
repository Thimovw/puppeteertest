const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3333;

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
    console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.url}`);

    // Remove query string and decode URL
    let filePath = req.url.split('?')[0];
    filePath = decodeURIComponent(filePath);

    // API endpoint voor dynamic certificates (alleen Puppeteer kan dit ophalen)
    if (filePath === '/api/dynamic-certs') {
        setTimeout(() => {
            res.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({
                certificates: ['PCI DSS Level 1', 'SOC 2 Type II', 'HIPAA Compliant']
            }));
        }, 200);
        return;
    }

    // API endpoint voor delayed certificates (alleen Puppeteer kan dit ophalen)
    if (filePath === '/api/delayed-certs') {
        setTimeout(() => {
            res.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({
                certificates: ['ISO 9001', 'CSA STAR']
            }));
        }, 300);
        return;
    }

    // API endpoint voor compliance data (ISO 27001 alleen via API, niet in HTML/JS broncode)
    if (filePath === '/api/compliance-data') {
        setTimeout(() => {
            res.writeHead(200, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({
                certificates: ['ISO 27001', 'SOC 2', 'PCI DSS'],
                complianceScore: 95,
                lastAudit: '2025-01-15',
                securityFeatures: ['2FA', 'Encryption at Rest', 'Regular Pen Tests']
            }));
        }, 400);
        return;
    }

    // Default to index.html
    if (filePath === '/') {
        filePath = '/index.html';
    }

    // Add .html extension if not present and file doesn't exist
    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    const fullPath = path.join(__dirname, filePath);
    const ext = path.extname(fullPath);
    const contentType = mimeTypes[ext] || 'text/plain';

    // Security: prevent directory traversal
    if (!fullPath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 Not Found</title>
                        <style>
                            body { font-family: Arial; text-align: center; padding: 50px; }
                            h1 { color: #667eea; }
                        </style>
                    </head>
                    <body>
                        <h1>404 - Pagina niet gevonden</h1>
                        <p>De pagina "${filePath}" bestaat niet.</p>
                        <p><a href="/">Terug naar home</a></p>
                    </body>
                    </html>
                `);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
            console.error(`❌ Error: ${err.message}`);
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*' // Allow CORS for testing
            });
            res.end(data);
            console.log(`✅ Served: ${filePath}`);
        }
    });
});

server.listen(PORT, () => {
    console.log('🎭 ========================================');
    console.log('🎭 Puppeteer Test Website Server');
    console.log('🎭 ========================================');
    console.log(`🌐 Server draait op: http://localhost:${PORT}`);
    console.log(`📍 Test URL: http://localhost:${PORT}`);
    console.log('');
    console.log('📄 Beschikbare pagina\'s:');
    console.log(`   - http://localhost:${PORT}/`);
    console.log(`   - http://localhost:${PORT}/privacy`);
    console.log(`   - http://localhost:${PORT}/cookies`);
    console.log(`   - http://localhost:${PORT}/security`);
    console.log(`   - http://localhost:${PORT}/terms`);
    console.log('');
    console.log('💡 Gebruik dit in de Trustmark scanner om te testen!');
    console.log('🎭 ========================================');
});
