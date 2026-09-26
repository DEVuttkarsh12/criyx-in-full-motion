import React from 'react';

/** A restrained version of the supplied 21st.dev globe, sized by its hero stage. */
const Globe: React.FC = () => (
  <div className="hero-globe" aria-hidden="true">
    <div className="hero-globe__map" />
  </div>
);

export default Globe;
