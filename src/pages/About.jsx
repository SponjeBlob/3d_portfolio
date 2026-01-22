import React from 'react';

import linkedinIcon from '../assets/icons/linkedin.svg'
import resumeIcon from '../assets/icons/resume.svg';

import { skills, experiences } from '../constants';
import CTA from '../Components/CTA';

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Hugo</span>
        </h1>

        <div className="mt-5 flex flex-col gap-3 text-white-500">
          <p>A 3D Artist, Technical Artist, and Game Designer currently 
            studying Games Design and Art. I enjoy creating immersive experiences 
            through games, animation, and interactive 3D environments. As you’ve 
            probably guessed, I’m a huge sci-fi fan. I spend most of my time reading, 
            watching, and creating content inspired by sci-fi worlds and ideas, 
            including this very website.
          </p>
                {/* Social / Resume Icons */}
          <div className="flex gap-20 mt-8">

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/hugo-mazariegos-martin-100205305/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="w-20 h-20" />
            </a>

            {/* Resume */}
            <a 
              href="/Hugo_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img src= {resumeIcon } alt="Resume" className="w-20 h-20" />
            </a>
          </div>
        </div>

        <div className="py-16 flex flex-col">
          <h3 className="subhead-text">My Skills</h3>

          <div className="mt-16 flex flex-wrap gap-14">
            {skills.map((skill) => (
              <div key={skill.imageUrl} className="block-container w-32 h-32">
                <div className="btn-back rounded-x1" />
                <div className="btn-front rounded-x1 flex justify-center items-center">
                  <img 
                    src={skill.imageUrl}
                    alt="skill"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      <div className="py-16">
        <h3 className="subhead-text">Personal Journey</h3>
        <div className="mt-5 flex flex-col gap-3 text-white-500">
          <p> Retrace my steps and see how I’ve grown into the 3D artist and 
            game designer I am today.
          </p>
        </div>

        <div className="mt-12 flex flex-col relative">
  <div className="mt-12 flex flex-col relative">
  {/* Vertical line */}
  <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-600"></div>

  {experiences.map((exp) => (
    <div key={exp.title} className="relative mb-8 pl-12">
      {/* Dot */}
      <span className="absolute left-0 top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></span>

      {/* Event box */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h4 className="font-semibold text-white">{exp.title}</h4>
        {exp.company_name && <p className="text-gray-300 text-sm">{exp.company_name}</p>}
        {exp.date && <p className="text-gray-300 text-sm">{exp.date}</p>}
        <ul className="mt-2 list-disc list-inside text-gray-200">
          {exp.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        {exp.icon && (
          <img
            src={exp.icon}
            alt={exp.company_name}
            className="mt-2 w-12 h-12 object-contain rounded-full"
          />
        )}
      </div>
    </div>
  ))}
</div>

</div>
</div>

      <hr className="border-slate-200" />

      <CTA />
    </section>
  )
}

export default About