// Google Sheets CSV URL (Exported as CSV)
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeI1T9_MeQ5YqkFbBgb2QNJjTvC-U0GaEXyREMimSuGE73tn_DVj2JNmVHNNdco9Ncp5PPaHQrv_o-/pub?output=csv';

export const CATEGORIES = [
  'Todos',
  'Calzado',
  'Mochilas',
  'Deportes',
  'Accesorios',
  'Cuidado'
];

const parseCSV = (csv) => {
  const lines = csv.split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  // Robust CSV Regex: matches commas ONLY outside of quotes
  const csvRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

  return lines.slice(1).filter(line => line.trim() !== '').map(line => {
    const values = line.split(csvRegex);
    const entry = {};
    
    headers.forEach((header, i) => {
      let val = values[i] ? values[i].trim() : '';
      
      // Remove surrounding quotes if present
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      
      // Clean up internal double quotes (CSV standard)
      val = val.replace(/""/g, '"');

      if (header === 'precio') {
        entry[header] = parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
      } else if (header === 'categoria') {
        entry[header] = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase().trim();
      } else {
        entry[header] = val;
      }
    });

    return {
      id: entry.id || Math.random().toString(36).substr(2, 9),
      name: entry.nombre || 'Producto sin nombre',
      category: entry.categoria || 'Varios',
      price: entry.precio || 0,
      tag: entry.tag || '',
      image: entry.imagenurl && entry.imagenurl.startsWith('http') ? entry.imagenurl : null
    };
  });
};

export const fetchProducts = async () => {
  try {
    // In a real scenario, use the actual SHEET_URL. 
    // For now, if SHEET_URL is a placeholder, we return the local mock data
    if (SHEET_URL.includes('/e/2PACX-1v.../')) {
       console.warn('Usando datos de respaldo: Configura la URL de Google Sheets en productService.js');
       return getBackupProducts();
    }

    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error('Error al cargar la planilla');
    const csvData = await response.text();
    return parseCSV(csvData);
  } catch (error) {
    console.error('Fetch error:', error);
    return getBackupProducts();
  }
};

const getBackupProducts = () => [
  { id: 1, name: 'Zapatillas Running Pro', category: 'Calzado', price: 18500, tag: 'Nueva Temporada', image: null },
  { id: 2, name: 'Botines Fútbol 5', category: 'Calzado', price: 15200, tag: 'Más Vendido', image: null },
  { id: 3, name: 'Pelota de Fútbol N5', category: 'Deportes', price: 9800, tag: 'Calidad Barrio', image: null },
  { id: 4, name: 'Mochila Deportiva XL', category: 'Mochilas', price: 12500, tag: 'Estructural', image: null },
  { id: 5, name: 'Medias de Compresión', category: 'Deportes', price: 4500, tag: 'Esencial', image: null },
  { id: 6, name: 'Pomada Renovadora', category: 'Cuidado', price: 3200, tag: 'Taller Guilberth', image: null }
];
