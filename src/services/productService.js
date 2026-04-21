// Configuration from User
const SHEET_ID = '1IPPkiUonp5FkcpBfyxC6m9FLGAQvglCgFvrB6n4HUx4';
const CLOUDINARY_NAME = 'drzg7bo8d';
const CLOUDINARY_PRESET = 'gilbert_uploads';

// Use GVIZ endpoint for better CORS and reliability
const PUBLIC_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
const SCRIPT_API_URL = 'https://script.google.com/macros/s/AKfycbxcJFKaoF7A-053ImfSdKGg8cEWDg3ABYvQ498nFfsTuy2yQDKdi2Hm5VmAuwLUPfio/exec';

export const CATEGORIES = [
  'Todos',
  'Productos para cuero',
  'Calzado',
  'Mochilas',
  'Deportes'
];

export const SUBCATEGORIES = {
  'Calzado': ['Mujer', 'Hombre', 'Niño', 'Deportivas', 'Botines', 'Vestir'],
  'Mochilas': ['Niños', 'Urbanas'],
  'Deportes': ['Pelotas', 'Guantes', 'Peras', 'Accesorios'],
  'Productos para cuero': ['Limpieza', 'Renovación', 'Tintas', 'Otros']
};

const parseCSV = (csv) => {
  const lines = csv.split('\n');
  if (lines.length < 2) return [];

  // Get raw headers and normalize them
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, '').toLowerCase());
  const csvRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

  return lines.slice(1).filter(line => line.trim() !== '').map(line => {
    const values = line.split(csvRegex);
    const entry = {};
    
    headers.forEach((header, i) => {
      let val = values[i] ? values[i].trim() : '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      val = val.replace(/""/g, '"');

      // Map headers to normalized internal names
      // Clean up symbols like # from headers (Google Tables addition)
      const cleanHeader = header.replace('#', '').trim();
      const key = cleanHeader === 'columna 1' ? 'estado' : cleanHeader;
      
      if (key === 'precio') {
        entry[key] = parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
      } else if (key === 'categoria' || key === 'subcategoria' || key === 'estado') {
        entry[key] = val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase().trim() : '';
      } else {
        entry[key] = val;
      }
    });

    return {
      id: entry.id || Math.random().toString(36).substr(2, 9),
      name: entry.nombre || 'Producto sin nombre',
      category: entry.categoria || 'Varios',
      subcategory: entry.subcategoria || '',
      price: entry.precio || 0,
      tag: entry.tag || '',
      image: entry.imagenurl && entry.imagenurl.startsWith('http') ? entry.imagenurl : null,
      status: entry.estado || 'Activo'
    };
  });
};

export const fetchProducts = async (includeSuspended = false) => {
  try {
    // Agregamos un número aleatorio al final para evitar que Google nos de datos viejos (cache)
    const cacheBuster = `&cb=${Date.now()}`;
    const response = await fetch(PUBLIC_CSV_URL + cacheBuster);
    
    if (!response.ok) throw new Error('Error al cargar la planilla');
    
    const csvData = await response.text();
    const allProducts = parseCSV(csvData);
    
    return includeSuspended 
      ? allProducts 
      : allProducts.filter(p => p.status === 'Activo');
  } catch (error) {
    console.error('Fetch error:', error);
    return getBackupProducts();
  }
};

const getBackupProducts = () => [
  { id: 1, name: 'Zapatillas Running Pro', category: 'Calzado', subcategory: 'Deportes', price: 18500, tag: 'Nueva Temporada', image: null, status: 'Activo' },
  { id: 2, name: 'Botines Fútbol 5', category: 'Calzado', subcategory: 'Deportes', price: 15200, tag: 'Más Vendido', image: null, status: 'Activo' }
];

// --- CRUD Operations via Google Apps Script ---

const callApi = async (action, data = {}) => {
  if (!SCRIPT_API_URL) {
    console.warn('API URL not configured. Action:', action);
    return { success: false, message: 'API no configurada' };
  }

  try {
    // Enviamos los datos como texto plano para evitar bloqueos de seguridad (CORS)
    await fetch(SCRIPT_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        action,
        token: localStorage.getItem('admin_token'),
        ...data
      })
    });
    
    // Con no-cors no podemos leer la respuesta real de Google, 
    // pero si llegamos aquí es porque la red aceptó la petición.
    return { success: true };
  } catch (error) {
    console.error(`API Error (${action}):`, error);
    return { success: false, error };
  }
};

export const addProduct = (product) => callApi('add', product);
export const updateProduct = (id, updates) => callApi('update', { id, ...updates });
export const deleteProduct = (id) => callApi('delete', { id });

// --- Image Upload via Cloudinary ---

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Error en la subida a Cloudinary');
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};
