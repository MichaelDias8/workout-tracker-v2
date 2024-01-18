import React from 'react';
import { GiWeightLiftingUp } from "react-icons/gi";
import { PiNotepad } from "react-icons/pi";
import { MdOutlineHistory  } from "react-icons/md";


const PageFooter = ({ setTab }) => {
    return (
        <footer>
            <button onClick={() => setTab('Workout')}>
            <span className="icon-wrapper">
              <GiWeightLiftingUp />
            </span>
            <span>Workout</span>
            </button>
            <button onClick={() => setTab('Programs')}>
              <span className="icon-wrapper">
                <PiNotepad />
              </span>
              <span>Programs</span>
            </button>
            <button onClick={() => setTab('History')}>
              <span className="icon-wrapper">
                <MdOutlineHistory   />
              </span>
              <span>History</span>
            </button>
        </footer>
    );
};

export default PageFooter;