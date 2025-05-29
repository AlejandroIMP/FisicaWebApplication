// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'PhSk';
export const SITE_DESCRIPTION = 'Cinematic Physics Simulation';
export const CALCULATORS = [
  {
    name: 'Movimiento Rectilíneo Uniforme (MRU)',
    description: 'Calcula el movimiento de un objeto en línea recta con velocidad constante.',
    url: '/calculators/cinematica/mru_mruv',
    image: '/images/mru.png',
  },
  {   
    name: 'Movimiento Rectilíneo Uniformemente Acelerado (MRUA)',
    description: 'Calcula el movimiento de un objeto en línea recta con aceleración constante.',
    url: '/calculators/cinematica/mru_mruv',
    image: '/images/mrua.png',
  },
  {
    name: 'Movimiento Circular Uniforme (MCU)',
    description: 'Calcula el movimiento de un objeto en una trayectoria circular con velocidad constante.',
    url: '/calculators/cinematica/mcu-modular',
    image: '/images/mcu.png',
  },
  {
    name: 'Movimiento Circular Uniformemente Acelerado (MCUA)',
    description: 'Calcula el movimiento de un objeto en una trayectoria circular con aceleración constante.',
    url: '/calculators/cinematica/mcua-modular',
    image: '/images/mcua.png',
  },
  {
    name: 'Tiro Parabólico',
    description: 'Calcula el movimiento de un objeto lanzado en una trayectoria parabólica.',
    url: '/calculators/cinematica/tiro-parabolico',
    image: '/images/tiro-parabolico.png',
  },
  {
    name: 'Tiro Vertical',
    description: 'Calcula el movimiento de un objeto lanzado verticalmente.',
    url: '/calculators/cinematica/tiro-vertical',
    image: '/images/tiro-vertical.png',
  },
]

export const CALCULATORS_DINAMIC = [
  {
    name: 'Segunda Ley de Newton',
    description: 'Calcula la fuerza, masa o aceleración según las leyes de Newton.',
    url: '/calculators/dinamica/segunda-ley-newton',
    image: '/images/segunda-ley-newton.png',
  },
  // {
  //   name: 'Multiples fuerzas',
  //   description: 'Calcula la fuerza resultante de múltiples fuerzas aplicadas a un objeto.',
  //   url: '/calculators/dinamica/multiples-fuerzas',
  //   image: '/images/multiples-fuerzas.png',
  // }
]