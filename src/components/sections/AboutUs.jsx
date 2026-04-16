import { motion } from "framer-motion";

const aboutBlocks = [
  {
    first: "text",
    content: {
      text: "Erasmus Dreamland nació en septiembre de 2020 como el Trabajo de Fin de Máster del CEO, Jorge Rodríguez. Lo que empezó como un proyecto académico, pronto se convirtió en una aventura real que no ha dejado de crecer desde entonces.",
      img: "/festivals/about1.jpg",
      alt: "Inicio Erasmus Dreamland",
    },
  },
  {
    first: "image",
    content: {
      text: "Todo comenzó con una pequeña fiesta en Eslovaquia a la que asistieron solo 70 personas. De ahí, pasamos de 70 a 100, de 100 a 200... Hoy, organizamos eventos en más de 28 ciudades de Europa y reunimos a más de 40.000 estudiantes Erasmus al año. Y lo mejor es que esto no ha hecho más que empezar.",
      img: "/festivals/1.jpg",
      alt: "Crecimiento del festival",
    },
  },
  {
    first: "text",
    content: {
      text: "Sabemos exactamente lo que busca un estudiante internacional, porque nosotros también fuimos Erasmus. Todo nuestro equipo esta formado de ex-Erasmus que quieren crear un espacio donde la música, la diversidad cultural y la amistad se celebraran de verdad. Por eso, cada uno de nuestros eventos está pensado para que vivas una experiencia inolvidable. Además, hemos contado con DJs y artistas de primer nivel como Omar Montes, Alvama Ice, Kiko Rivera o Selecta, que han llevado nuestras fiestas a otro nivel.",
      img: "/festivals/about3.jpg",
      alt: "Artistas y DJs invitados",
    },
  },
  {
    first: "image",
    content: {
      text: "Con el tiempo, hemos cruzado fronteras. Y queremos seguir cruzándolas. Erasmus Dreamland no es solo una fiesta, o una empresa: es una familia de la que todos formáis parte. Es ese lugar donde todo el mundo tiene cabida y donde cada noche se convierte en un recuerdo para toda la vida.",
      img: "/festivals/about4.jpg",
      alt: "Comunidad Erasmus Dreamland",
    },
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-dreamland text-center mb-20">
          Sobre Nosotros
        </h2>

        {aboutBlocks.map((block, index) => (
          <motion.div
            key={index}
            className="grid md:grid-cols-2 gap-12 items-center mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {block.first === "text" ? (
              <>
                <motion.div
                  className="text-lg leading-relaxed text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {block.content.text}
                </motion.div>
                <motion.div
                  className="overflow-hidden rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                >
                  <img
                    src={block.content.img}
                    alt={block.content.alt}
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  className="overflow-hidden rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                >
                  <img
                    src={block.content.img}
                    alt={block.content.alt}
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </motion.div>
                <motion.div
                  className="text-lg leading-relaxed text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {block.content.text}
                </motion.div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}