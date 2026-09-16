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
    role: 'Estrategia de datos',
    accent: 'canopy',
    image: '/assets/moises.png',
    bio:
      'Se encarga de la pregunta anterior a todo: qué queremos saber y para ' +
      'qué. Define el enfoque del análisis, decide qué información vale la ' +
      'pena buscar y mantiene al equipo apuntando al mismo objetivo cuando ' +
      'el proyecto empieza a ramificarse.',
  },
  {
    slug: 'moises-obregon',
    name: 'Moisés Obregón',
    role: 'Análisis de datos',
    accent: 'gold',
    image: '/assets/emiliano.png',
    bio:
      'Trabaja directamente con los datos: los limpia, los cruza y busca en ' +
      'ellos patrones que no son evidentes a primera vista. Es quien ' +
      'confirma si una idea del equipo realmente se sostiene con la ' +
      'información disponible o si hay que replantearla.',
  },
  {
    slug: 'emiliano-serna',
    name: 'Emiliano Serna',
    role: 'Desarrollo full stack',
    accent: 'macaw',
    image: '/assets/cristian.png',
    bio:
      'Convierte el análisis en algo que se pueda usar. Construye las ' +
      'interfaces y la lógica detrás de ellas, y se ocupa de que lo que ' +
      'funciona en una prueba siga funcionando cuando lo abre alguien más, ' +
      'en otro equipo y con otra conexión.',
  },
  {
    slug: 'samuel-giraldo',
    name: 'Samuel Giraldo',
    role: 'Soluciones de datos',
    accent: 'sky',
    image: '/assets/samuel.png',
    bio:
      'Conecta las piezas: fuentes de información, procesos automáticos y ' +
      'la aplicación final. Se ocupa de que los datos lleguen completos y a ' +
      'tiempo al lugar donde se necesitan, que suele ser la parte menos ' +
      'visible y más frágil de cualquier proyecto.',
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
    'Equipo dedicado al análisis de información y al desarrollo de soluciones tecnológicas.',
};
