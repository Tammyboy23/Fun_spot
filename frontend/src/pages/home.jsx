import { useState } from 'react';
import { useAnimateIn } from '../hooks/useAnimateIn';

const TICKETS = [
  {
    theme: 'Birthday Night Out',
    name: 'Sunset Rooftop Lounge',
    desc: 'Rooftop bar in Ikoyi with live music from 8pm and a skyline view. Great for a group of 6–10.',
    price: '₦12,500 / person',
    stub: 'IKOYI',
  },
  {
    theme: 'First Date',
    name: 'Terra Kulture Garden',
    desc: 'Quiet outdoor courtyard with live jazz on Fridays, small plates, and art on the walls to talk about.',
    price: '₦8,000 / person',
    stub: 'V.I.',
  },
  {
    theme: 'Squad Hangout',
    name: 'Bounce Arcade + Grill',
    desc: 'Retro arcade games, pool tables, and a grill menu. Loud, cheap, and built for a big group.',
    price: '₦5,500 / person',
    stub: 'LEKKI',
  },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | ok | err

  const [stepsRef, stepsVisible] = useAnimateIn();
  const [ticketsRef, ticketsVisible] = useAnimateIn();
  const [ctaRef, ctaVisible] = useAnimateIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('err');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('http://localhost:3000/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('ok');
      setEmail('');
    } catch (err) {
      setStatus('err');
    }
  };

  const WaitlistForm = ({ compact }) => (
    <>
      <form className="fs-hero-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="fs-input"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          required
        />
        <button className="fs-btn" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Joining…' : 'Get early access'}
        </button>
      </form>
      {status === 'ok' && (
        <p className="fs-form-msg ok">You're on the list — we'll email you when we launch.</p>
      )}
      {status === 'err' && (
        <p className="fs-form-msg err">Enter a valid email to join the waitlist.</p>
      )}
      {status === 'idle' && !compact && (
        <p className="fs-hero-note">No spam. Just one email when we're live.</p>
      )}
    </>
  );

  return (
    <div className="fs-page">
      <nav className="fs-nav">
        <div className="fs-nav-inner">
          <a href="#top" className="fs-logo">
            Fun<span>Spot</span>
          </a>
          <div className="fs-nav-links">
            <a href="#how">How it works</a>
            <a href="#showcase">Examples</a>
            <a href="#waitlist" className="fs-nav-cta">
              Join waitlist
            </a>
          </div>
        </div>
      </nav>

      <header className="fs-container fs-hero" id="top">
        <div>
          <span className="fs-eyebrow hero-eyebrow">AI-planned outings</span>
          <h1 className="hero-heading">
            Tell it the vibe.
            <br />
            It finds <em>the spot.</em>
          </h1>
          <p className="fs-sub hero-sub">
            Fun Spot turns a theme, a location, a budget, and a headcount into a real
            shortlist — what to do, what it costs, and a map link to get there.
          </p>
          <div className="hero-form-wrap">
            <WaitlistForm />
          </div>
        </div>

        <div className="fs-builder" aria-hidden="true">
          <div className="fs-builder-label">Your outing, as input</div>
          <div className="fs-chips">
            <span className="fs-chip">
              Theme: <b>Birthday night out</b>
            </span>
            <span className="fs-chip">
              Location: <b>Lagos</b>
            </span>
            <span className="fs-chip">
              Budget: <b>₦15,000/person</b>
            </span>
            <span className="fs-chip">
              People: <b>6</b>
            </span>
          </div>

          <div className="fs-arrow-row">
            <span className="fs-arrow-line" />
            Fun Spot finds a match
            <span className="fs-arrow-line" />
          </div>

          <div className="fs-result-card">
            <div className="fs-result-top">
              <span className="fs-result-name">Sunset Rooftop Lounge</span>
              <span className="fs-result-price">₦12,500</span>
            </div>
            <p className="fs-result-desc">
              Rooftop bar in Ikoyi, live music from 8pm, skyline view. Fits a group of 6–10.
            </p>
            <span className="fs-maps-link">Open in Google Maps →</span>
          </div>
        </div>
      </header>

      <section className="fs-section" id="how">
        <div className="fs-container">
          <div className="fs-section-head">
            <span className="fs-eyebrow">How it works</span>
            <h2>Three things. One shortlist.</h2>
            <p>No endless scrolling through reviews. You give it the shape of your outing, it does the digging.</p>
          </div>

          <div
            className={`fs-steps${stepsVisible ? ' is-visible' : ''}`}
            ref={stepsRef}
          >
            <div className="fs-step delay-1">
              <span className="fs-step-num">01</span>
              <h3>Set the scene</h3>
              <p>Add a theme, a location — state, city, or country — a budget, and how many people are coming.</p>
            </div>
            <div className="fs-step delay-3">
              <span className="fs-step-num">02</span>
              <h3>Get your shortlist</h3>
              <p>Fun Spot matches real venues and events nearby, with what to do and what it'll cost you.</p>
            </div>
            <div className="fs-step delay-5">
              <span className="fs-step-num">03</span>
              <h3>Go have fun</h3>
              <p>Tap the map link, get directions, and show up. No more group chat back-and-forth.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fs-section" id="showcase">
        <div className="fs-container">
          <div className="fs-section-head">
            <span className="fs-eyebrow">See it in action</span>
            <h2>A few things it might find you</h2>
            <p>Every result comes as a ticket: what it is, what it costs, and where to go.</p>
          </div>

          <div
            className={`fs-tickets${ticketsVisible ? ' is-visible' : ''}`}
            ref={ticketsRef}
          >
            {TICKETS.map((t, i) => (
              <div className={`fs-ticket delay-${i * 2 + 1}`} key={t.name}>
                <div className="fs-ticket-stub">
                  <span>{t.stub}</span>
                </div>
                <div className="fs-ticket-body">
                  <span className="fs-ticket-theme">{t.theme}</span>
                  <h3 className="fs-ticket-name">{t.name}</h3>
                  <p className="fs-ticket-desc">{t.desc}</p>
                  <div className="fs-ticket-foot">
                    <span className="fs-ticket-price">{t.price}</span>
                    <a className="fs-ticket-map" href="#waitlist">
                      Maps →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fs-section" id="waitlist">
        <div className="fs-container">
          <div
            className={`fs-cta reveal reveal-scale${ctaVisible ? ' is-visible' : ''}`}
            ref={ctaRef}
          >
            <div className="fs-cta-inner">
              <span className="fs-eyebrow">Launching soon</span>
              <h2>Be first through the door</h2>
              <p>Join the waitlist and we'll email you the moment Fun Spot is live.</p>
              <WaitlistForm compact />
            </div>
          </div>
        </div>
      </section>

      <footer className="fs-container fs-footer">
        <a href="#top" className="fs-logo">
          Fun<span>Spot</span>
        </a>
        <span>© 2026 Fun Spot. Find your next outing.</span>
      </footer>
    </div>
  );
}