// Google Sheets CSV URL (Exported as CSV)
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeI1T9_MeQ5YqkFbBgb2QNJjTvC-U0GaEXyREMimSuGE73tn_DVj2JNmVHNNdco9Ncp5PPaHQrv_o-/pub?output=csv';

export const CATEGORIES = [
  'Todos',
  'Zapatillas',
  'Botines',
  'Calzado',
  'Pelotas',
  'Mochilas',
  'Accesorios',
  'Cuidado'
];

/**
 * Simple CSV parser to avoid adding heavy dependencies
 */
const parseCSV = (csv) => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  return lines.slice(1).filter(line => line.trim() !== '').map(line => {
    // Handling basic commas within quotes isn't needed here for simple Gilbert data, 
    // but we'll use a slightly safer split for common cases
    const values = line.split(',');
    const entry = {};
    headers.forEach((header, i) => {
      let val = values[i] ? values[i].trim() : '';
      
      // Clean up common CSV quirks
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      
      // Type conversions
      if (header === 'precio') {
        entry[header] = parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
      } else if (header === 'id') {
        entry[header] = val;
      } else if (header === 'categoria') {
        // Normalize: Capital First Letter + lowercase rest
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
      image: entry.imagenurl || null
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
  { id: 1, name: 'Zapatillas Running Pro', category: 'Zapatillas', price: 18500, tag: 'Nueva Temporada', image: null },
  { id: 2, name: 'Botines Fútbol 5', category: 'Botines', price: 15200, tag: 'Más Vendido', image: null },
  { id: 3, name: 'Pelota de Fútbol N5', category: 'Pelotas', price: 9800, tag: 'Calidad Barrio', image: null },
  { id: 4, name: 'Mochila Deportiva XL', category: 'Mochilas', price: 12500, tag: 'Estructural', image: null },
  { id: 5, name: 'Medias de Compresión', category: 'Accesorios', price: 4500, tag: 'Esencial', image: null },
  { id: 6, name: 'Pomada Renovadora', category: 'Cuidado', price: 3200, tag: 'Taller Gilbert', image: null }
];
