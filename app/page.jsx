import Image from 'next/image';

import Cover from '@/components/Cover';
import Reveal from '@/components/Reveal';
import TeamMember from '@/components/TeamMember';
import { team } from '@/data/team.js';

export default function HomePage() {
  return (
    <>
      <Cover />

      {/* ============ QUIÉNES SOMOS ============ */}
      <section className="band" id="nosotros">
        <div className="band-inner prose-cols">
          <Reveal as="h2" className="band-title">
            Quiénes somos
          </Reveal>

          <Reveal className="prose">
            <p className="lead">
              Guacamaya Analytics es un equipo dedicado al análisis de información
              y al desarrollo de soluciones tecnológicas. Trabajamos con datos
              reales, desordenados y a veces incompletos, que es como llegan casi
              siempre.
            </p>
            <p>
              El nombre no es casual. La guacamaya observa desde arriba, reconoce
              el terreno y se adapta a él; nosotros intentamos hacer lo mismo con
              la información: mirarla completa antes de sacar conclusiones. Y
              Analytics es la otra mitad del trabajo, la parte metódica —
              procesar, comparar, verificar y explicar.
            </p>
            <p>
              Cada integrante aporta una forma distinta de mirar el mismo
              problema. Esa diferencia es justamente lo que hace que el resultado
              final se sostenga.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ EQUIPO ============ */}
      <section className="team" id="equipo">
        <div className="band-inner">
          <Reveal as="h2" className="band-title">
            El equipo
          </Reveal>
          <Reveal as="p" className="band-sub">
            Cuatro perspectivas, un mismo proyecto.
          </Reveal>
        </div>

        {team.map((member, index) => (
          <TeamMember
            key={member.slug}
            member={member}
            reverse={index % 2 === 1}
          />
        ))}
      </section>

      {/* ============ RETO ============ */}
      <section className="band band-dark" id="reto">
        <div className="band-inner prose-cols">
          <Reveal as="h2" className="band-title">
            El reto
          </Reveal>

          <Reveal className="prose">
            <p className="lead">
              Convertir datos en información útil para facilitar la toma de
              decisiones, apoyándonos en el análisis, la tecnología y la
              innovación.
            </p>
            <p>
              En la práctica eso significa recoger información dispersa, ponerla
              en orden, estudiarla con criterio y entregar una conclusión que
              alguien pueda usar el mismo día en que la recibe. No buscamos el
              informe más largo, sino el más claro.
            </p>
            <p>
              Es un reto técnico, pero también de comunicación: un análisis que
              nadie entiende es un análisis que no sirve.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ IDENTIDAD ============ */}
      <section className="identity" id="identidad">
        <Reveal className="identity-inner">
          <figure className="identity-logo">
            <Image
              src="/assets/logo.png"
              alt="Logo de Guacamaya Analytics"
              width={1024}
              height={559}
              sizes="(max-width: 900px) 92vw, 40vw"
            />
          </figure>

          <div className="identity-text">
            <h2 className="band-title">Nuestra identidad</h2>
            <p>
              La guacamaya aporta lo que queremos transmitir como equipo: visión,
              color, diversidad y capacidad de adaptarse. El escudo que sostiene
              reúne las cuatro cosas que hacemos —procesar, explorar, analizar y
              automatizar— y el paisaje de fondo recuerda de dónde venimos.
            </p>
            <p className="identity-slogan">Datos que vuelan alto</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
