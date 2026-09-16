/**
 * Fuente única de datos del equipo.
 *
 * La consumen dos capas a la vez:
 *  - Next.js, importando este módulo directamente en los Server Components.
 *  - Express, que lo expone como API pública en /api/team.
 *
 * NOTA: el archivo de imagen no siempre coincide con el nombre de la persona
 * (por ejemplo moises.png corresponde a Cristian Uribe). Se conserva el mismo
 * emparejamiento que tenía el sitio original; si estaba mal, se corrige aquí
 * en un solo lugar y se actualiza en todas partes.
 */

export const team = [
  {
    slug: 'cristian-uribe',
    name: 'Cristian Uribe',
    role: 'Analista de Datos',
    accent: 'canopy',
    image: '/assets/moises.png',
    bio:
      'Se encarga de la pregunta anterior a todo: qué queremos saber y para ' +
      'qué. Diseña el flujo de obtención de datos —combinando la API ' +
      'meteorológica de Open-Meteo con la simulación del parque de ' +
      'paneles— y mantiene al equipo apuntando al mismo objetivo cuando el ' +
      'proyecto empieza a ramificarse.',
  },
  {
    slug: 'moises-obregon',
    name: 'Moisés Obregón',
    role: 'Analista de Datos',
    accent: 'gold',
    image: '/assets/emiliano.png',
    bio:
      'Trabaja directamente con los datos: los limpia, corrige tipos y ' +
      'nulos, y detecta anomalías como fallos de hardware o mantenimientos ' +
      'que no son evidentes a primera vista. Es quien confirma si un ' +
      'patrón realmente se sostiene con la información disponible o si hay ' +
      'que replantearlo.',
  },
  {
    slug: 'emiliano-serna',
    name: 'Emiliano Serna',
    role: 'Analista de Datos',
    accent: 'macaw',
    image: '/assets/cristian.png',
    bio:
      'Convierte el análisis en algo que se pueda usar. Estructura la base ' +
      'de datos en la nube en Appwrite, define el esquema de la telemetría ' +
      'y se ocupa de que los datos lleguen completos y consultables para ' +
      'todo el equipo.',
  },
  {
    slug: 'samuel-giraldo',
    name: 'Samuel Giraldo',
    role: 'Analista de Datos',
    accent: 'sky',
    image: '/assets/samuel.png',
    bio:
      'Interpreta los resultados del análisis exploratorio: compara ' +
      'ubicaciones, identifica paneles en estado crítico y traduce las ' +
      'gráficas en recomendaciones operativas dentro del informe final, ' +
      'que suele ser la parte menos visible y más decisiva de cualquier ' +
      'proyecto.',
  },
];

/** Busca un integrante por su slug. Devuelve undefined si no existe. */
export function findMember(slug) {
  return team.find((member) => member.slug === slug);
}

export const siteInfo = {
  name: 'Guacamaya Analytics',
  slogan: 'Datos que vuelan alto',
  description:
    'Equipo de analistas de datos dedicado al monitoreo, limpieza y análisis de información ' +
    'para la toma de decisiones.',
};
