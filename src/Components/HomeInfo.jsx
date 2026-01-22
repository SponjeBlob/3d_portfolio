import React from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

const InfoBox = ({ text, link, btnText}) => (
    <div className="info-box font-roboto">
        <p className="font-medium sm:text-x1 text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
        {btnText}
        <img src={arrow} className="w-4 h-4 object-contain" />
        </Link>
    </div>
)

const renderContent = {
    3: (
        <h1 className="sm:text-x1 sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
        Hi, I am <span className="font-roboto">Hugo</span> 👋
        <br />
        A 3D Artist from the UK
        </h1>
    ),
    4: (
        <InfoBox 
            text="Developed a range of software and skills across my university degree."
            link="/About"
            btnText=" Learn more "

            />
    ),
    1: (
        <InfoBox 
            text="Worked on games and independent projects for over three years."
            link="/Projects"
            btnText="Visit my portfolio"

            />
    ),
    2: (
          <InfoBox 
            text="Looking to collaborate or hire?"
            link="/Contact"
            btnText="Contact"

            />
    ),
}


const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null;
}

export default HomeInfo