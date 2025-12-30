const fs = require('fs');
const path = require('path');

// Crear directorio si no existe
const distDir = path.join(__dirname, '..', 'dist', 'nodes', 'Metricool');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copiar el archivo SVG
const svgSource = path.join(__dirname, '..', 'nodes', 'Metricool', 'metricool.svg');
const svgDest = path.join(distDir, 'metricool.svg');

if (fs.existsSync(svgSource)) {
    fs.copyFileSync(svgSource, svgDest);
    console.log('✅ Logo copiado exitosamente');
} else {
    console.warn('⚠️  No se encontró el archivo metricool.svg');
}

// Copiar el archivo JSON
const jsonSource = path.join(__dirname, '..', 'nodes', 'Metricool', 'Metricool.node.json');
const jsonDest = path.join(distDir, 'Metricool.node.json');

if (fs.existsSync(jsonSource)) {
    fs.copyFileSync(jsonSource, jsonDest);
    console.log('✅ Metricool.node.json copiado exitosamente');
} else {
    console.warn('⚠️  No se encontró el archivo Metricool.node.json');
}

console.log('✅ Post-build completado');
