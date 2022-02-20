import React from 'react';
import 'bulma/css/bulma.min.css';
import '../index.css'

function Hero() {
  return <div>
      <section className="hero  is-primary">
        <div className="hero-body">
            <p className="title is-2">
            Crypto Tracker
            </p>
            <p className="subtitle is-5">
            The best cryptocurrency price tracker
            </p>
        </div>
    </section>
  </div>;
}

export default Hero;
