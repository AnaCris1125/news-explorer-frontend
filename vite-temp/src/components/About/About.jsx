import React from 'react';
import './About.css';
import Avatar from "../../images/avatar.JPG"

function About() {
  return (
    <section className="about">
       <img className='avatar-about' src={Avatar} alt="imagen avatar" />
       <div className='about__content'>
       <h2 className='title-about'>Acerca del autor</h2>
      <p className='paragraph-about'>¡Hola! Soy Ana Cristina, actualmente estoy estudiando desarrollo web y soy la creadora de esta aplicación. Durante este proceso de estudio, obtuve conocimeintos en tecnologias de desarrollo como: en frontend - Html, Css, Java Script, Frameworks y librerias (React), backend - Express.js (Node.js), Git, GitHub. Mi experiencia en cuanto a Practicum ha sido absolutamente enriquecedora, ya que he podido poner a prueba los conocimientos obtenidos con la teoría estudiada, en proyectos simulados de la vida real, en la que desarrollé una aplicación web completa, incluyendo la planificación, diseño, implementación y pruebas, gracias a esto, puedo ayudar a clientes potenciales a implementar soluciones similares de manera eficiente y confiable. </p>
       </div>
     
    </section>
  );
}

export default About;