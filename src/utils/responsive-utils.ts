
/**
 * Utilidades para mejorar la experiencia en diferentes tamaños de pantalla
 * y dispositivos, especialmente para los componentes de calculadoras.
 */

/**
 * Ajusta dinámicamente el ancho del selector de unidades basado en el contenido
 * para asegurar que las unidades siempre sean visibles completamente.
 */
export function adjustUnitSelectorWidths(): void {
  const unitSelectors = document.querySelectorAll('.unit-selector') as NodeListOf<HTMLSelectElement>;
  
  unitSelectors.forEach(selector => {
    // Primero restablecer a un ancho mínimo base
    selector.style.width = "";
    
    // Guardar las opciones y el valor actual
    const options = Array.from(selector.options).map(opt => opt.text);
    const currentValue = selector.value;
    
    // Determinar la opción más larga
    let maxLength = 0;
    let longestOption = "";
    
    options.forEach(option => {
      if (option.length > maxLength) {
        maxLength = option.length;
        longestOption = option;
      }
    });
    
    // Crear un elemento temporal para medir el ancho necesario
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.fontFamily = getComputedStyle(selector).fontFamily;
    tempSpan.style.fontSize = getComputedStyle(selector).fontSize;
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.textContent = longestOption;
    
    document.body.appendChild(tempSpan);
    
    // Añadir un espacio adicional para el ícono desplegable (20px) y padding (16px)
    const neededWidth = tempSpan.offsetWidth + 36;
    
    // Establecer ancho mínimo basado en el contenido
    selector.style.minWidth = `${Math.max(neededWidth, 90)}px`;
    
    // Limpiar
    document.body.removeChild(tempSpan);
  });
}

/**
 * Inicializa todas las utilidades responsivas
 */
export function initResponsiveUtils(): void {
  // Ajustar selectores al cargar la página
  adjustUnitSelectorWidths();
  
  // Ajustar selectores al cambiar el tamaño de la ventana
  window.addEventListener('resize', adjustUnitSelectorWidths);
}
