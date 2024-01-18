import React, { useState } from 'react';
import '../../../css/app-styles.scss';
import ProgramAndSessionEditor from '../ProgramEditor/ProgramAndSessionEditor';
import { withAuthenticator } from '@aws-amplify/ui-react';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import { GiWeightLiftingUp } from "react-icons/gi";
import { PiNotepad } from "react-icons/pi";
import { MdOutlineHistory } from "react-icons/md";


const App = ({ signOut, user }) => {
  const [tab, setTab] = useState('Programs');

  let content;

  switch (tab) {
    case 'Workout':
      content = (
        <div>
          <PageHeader name="Workout" icon={<GiWeightLiftingUp />} signOut={signOut} />
          <p>Coming soon...</p>
          <PageFooter setTab={setTab} />
        </div>
      );
      break;
    case 'Programs':
      content = (
        <div>
          <PageHeader name="Programs" icon={<PiNotepad />} signOut={signOut} />
          <ProgramAndSessionEditor />
          <PageFooter setTab={setTab} />
        </div>
      );
      break;
    case 'History':
      content = (
        <div>
          <PageHeader name="History" icon={<MdOutlineHistory />} signOut={signOut} />
          <p>Coming soon...</p>
          <PageFooter setTab={setTab} />
        </div>
      );
      break;
    default:
      content = (
        <div>
          <PageHeader name="Workout" icon={<GiWeightLiftingUp />} signOut={signOut} />
          <PageFooter setTab={setTab} />
        </div>
      );
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default withAuthenticator(App);
