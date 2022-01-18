import React, { useState } from 'react';

import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

function DemoHome() {

  const [target, setTarget] = useState(0);

    return (
        <div>
            <Header target={target} setTarget={setTarget}/>
            <MainSection />
            <Footer />
        </div>
    )
}

export default DemoHome
