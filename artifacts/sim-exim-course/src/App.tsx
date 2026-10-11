import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import simLogo from '@assets/WEBSITE-HEAD_1791545018241.png';
import shipPhoto from '@assets/673_1791631414643.jpg';
import moneyBackBadge from '@assets/saleeee_1791631498721.png';
import rahulPortrait from '@assets/Professional_Portrait_in_White_Shirt_1791715275919.png';
import heroBackgroundPhoto from '@assets/1072_1791715455292.jpg';
import {
  ArrowDownRight, ArrowRight, BadgeCheck, BookOpen, BriefcaseBusiness, Check, ChevronDown,
  CircleHelp, Globe2, Menu, MessageCircle, PackageSearch, ShieldCheck, Ship, X,
} from 'lucide-react';

const queryClient = new QueryClient();

const modules = [
  ['EXIM Fundamentals', 'Understand export, import, trade terminology, and the overall transaction flow.'],
  ['Business Models and Trade Opportunities', 'Explore trading, sourcing, and different EXIM business approaches.'],
  ['Business Setup and Registrations', 'Review the setup steps and key registrations relevant to an EXIM business.'],
  ['Product Selection, HS Codes, and Market Research', 'Assess product ideas, market demand, HS classification, and initial market research.'],
  ['Finding and Verifying Buyers and Suppliers', 'Learn research methods and basic checks before engaging a trade partner.'],
  ['International Payments and Risk', 'Understand international payment methods and common transaction risks.'],
  ['EXIM Documentation', 'Learn the purpose of key documents used throughout a trade transaction.'],
  ['Logistics, Shipping, and Customs', 'Understand freight, shipment flow, and customs-related processes.'],
  ['Incoterms, Costing, and Profitability', 'Review trade terms, landed costs, quotation structure, and margin calculations.'],
  ['Product Compliance and Business Planning', 'Identify compliance questions and organise next steps into a practical plan.'],
];
const faqs = [
  ['What is the EXIM course about?', 'A structured course covering key stages of import–export—from fundamentals and business models to research, documentation, logistics, costing, and business planning.'],
  ['Who can enrol in this course?', 'The course is designed for beginners exploring EXIM, aspiring entrepreneurs, small business owners, and professionals or learners who want structured, practical knowledge.'],
  ['What topics are covered in the curriculum?', 'The ten core modules cover EXIM fundamentals, trade models, business setup, product and market research, partner verification, payments and risk, documentation, logistics and customs, Incoterms and costing, and compliance and planning.'],
  ['Does the course include practical exercises?', 'The course structure includes a practical EXIM business simulation: a sample educational scenario that connects research, preparation, and planning. It is not a real buyer or order.'],
  ['How can I get the upcoming batch schedule and fees?', 'Please request course details through the enquiry form. SIM can share confirmed information directly once available.', 'Batch dates: [TO BE CONFIRMED] · Duration: [TO BE CONFIRMED] · Fees: [TO BE CONFIRMED] · Mode and location: [TO BE CONFIRMED]'],
  ['How do I request counselling?', 'Complete the enquiry form with your details and a preferred date and time. These are preferences only—not a confirmed appointment. The form is currently not connected to a submission service.'],
  ['Does the course guarantee buyers, orders, profits, or placement?', 'No such outcome is promised here. The course provides structured learning and practical exercises; actual business, employment, and commercial outcomes are not guaranteed unless SIM has a specific, documented policy stating otherwise.'],
];

function Brand() {
  return <a className="brand" href="#home" aria-label="Skills Institute of Management home" data-testid="link-home-logo">
    <img src={simLogo} alt="" width="689" height="295" className="brand-logo" />
  </a>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [preferredDate, setPreferredDate] = useState('');
  const [values, setValues] = useState({ name: '', phone: '', email: '', course: 'EXIM / Import–Export Course', time: '', consent: false });

  useEffect(() => {
    document.title = 'Practical EXIM Training | Skills Institute of Management';
    const description = 'Learn import–export through SIM’s 10-module EXIM course, a sample trade simulation, and a practical 90-day action plan framework.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

  const minDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const closeMenu = () => setMenuOpen(false);
  const update = (field: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFormStatus('');
    setFormErrors((current) => ({ ...current, [field]: '' }));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (!values.name.trim()) errors.name = 'Enter your full name.';
    if (!values.phone.trim()) errors.phone = 'Enter a phone or WhatsApp number.';
    else if (!/^\+?[0-9\s().-]{7,20}$/.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.';
    if (!values.email.trim()) errors.email = 'Enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
    if (!preferredDate) errors.date = 'Choose a preferred counselling date.';
    else if (preferredDate < minDate) errors.date = 'Choose today or a future date.';
    if (!values.time) errors.time = 'Choose a preferred time.';
    if (!values.consent) errors.consent = 'Please consent to be contacted about course information.';
    setFormErrors(errors);
    if (Object.keys(errors).length) {
      setFormStatus('Please review the highlighted fields. Your details have not been sent.');
      return;
    }
    // Integration point: submit validated values to SIM's approved email, CRM,
    // WhatsApp, or database service here; do not report success until confirmed.
    setFormStatus('Your details have not been sent. This enquiry form is not connected yet. Please contact SIM by phone or email below.');
  };

  const navItems = [['Home', '#home'], ['About SIM', '#about'], ['EXIM Course', '#course'], ['Course Curriculum', '#curriculum'], ['Trainer', '#trainer'], ['Contact', '#contact']];

  return <main className="site-shell">
    <header className="header">
      <div className="wrap header-inner">
        <Brand />
        <button className="mobile-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu-toggle">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={`nav${menuOpen ? ' open' : ''}`} id="primary-navigation" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
        </nav>
        <a className="button" href="#enquiry" data-testid="link-header-enquire">Enquire Now <ArrowRight size={15} /></a>
      </div>
    </header>

    <section className="hero" id="home">
      <div className="hero-backdrop" aria-hidden="true">
        <img className="hero-backdrop-photo" src={heroBackgroundPhoto} alt="" width="1500" height="999" decoding="async" />
      </div>
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">Practical Import–Export &amp; EXIM Training</div>
          <h1>Learn Global Trade. <span>Build Your EXIM Business Foundation.</span></h1>
          <p className="hero-copy">A structured, practical course to understand the export–import process—from choosing a product and researching markets to buyer verification, documentation, shipping, costing and building a 90-day action plan.</p>
          <div className="hero-actions">
            <a className="button" href="#enquiry" data-testid="link-hero-enquire">Enquire About the Course <ArrowRight size={16} /></a>
            <a className="button button-outline" href="#curriculum" data-testid="link-explore-curriculum">Explore Course Curriculum <ArrowDownRight size={16} /></a>
          </div>
          <div className="hero-note"><span className="hero-note-icon"><BadgeCheck size={15} /></span><span>Learn the key stages of an import–export transaction through structured modules and a practical trade simulation.</span></div>
        </div>
        <div className="hero-visual" data-testid="visual-trade-shipment">
          <div className="visual-frame">
            <img className="hero-ship-photo" src={shipPhoto} alt="Container ship loaded with cargo sailing through the water" width="2000" height="1124" fetchPriority="high" />
          </div>
          <div className="visual-stamp"><span className="stamp-mark"><Ship size={17} /></span><div><strong>From first question to shipment flow</strong><span>Trade concepts. Connected in practice.</span></div></div>
          <span className="hero-index">SIM / EXIM · COURSE OVERVIEW</span>
        </div>
      </div>
    </section>

    <section className="proof-band" id="course" aria-label="Course structure at a glance">
      <div className="wrap proof-grid">
        <div className="proof-item" data-testid="stat-core-modules"><div className="proof-value">10</div><div className="proof-copy"><strong>Core Learning Modules</strong><span>A clear sequence through EXIM essentials</span></div></div>
        <div className="proof-item" data-testid="stat-action-plan"><div className="proof-value">90 Days</div><div className="proof-copy"><strong>Action Plan Framework</strong><span>Organise research and next steps</span></div></div>
        <div className="proof-item" data-testid="stat-simulation"><div className="proof-value">Practical</div><div className="proof-copy"><strong>EXIM Business Simulation</strong><span>Apply ideas to a sample trade scenario</span></div></div>
      </div>
    </section>

    <section className="enquiry" id="enquiry">
      <div className="wrap enquiry-grid">
        <div className="enquiry-intro">
          <div className="section-kicker">Start with a conversation</div>
          <h2 className="section-title">Make your next step in trade a considered one.</h2>
          <p className="section-copy">Share your details and preferred counselling slot. Our team can follow up with course information.</p>
          <p className="section-copy" style={{ fontSize: 13 }}>Your requested date and time are preferences only, not a confirmed appointment. SIM’s enquiry form is not connected to a submission service yet.</p>
        </div>
        <form className="enquiry-panel" onSubmit={handleSubmit} noValidate data-testid="form-course-enquiry">
          <div className="form-head"><h3>Enquire About the EXIM Course</h3><span className="required-note">* Required</span></div>
          <div className="form-grid">
            <div className="field"><label htmlFor="full-name">Full Name <em>*</em></label><input required id="full-name" autoComplete="name" placeholder="Your full name" value={values.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!formErrors.name} aria-describedby={formErrors.name ? 'error-name' : undefined} data-testid="input-full-name" />{formErrors.name && <span id="error-name" className="form-error" role="alert">{formErrors.name}</span>}</div>
            <div className="field"><label htmlFor="phone">Phone Number / WhatsApp Number <em>*</em></label><input required id="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" value={values.phone} onChange={(e) => update('phone', e.target.value)} aria-invalid={!!formErrors.phone} aria-describedby={formErrors.phone ? 'error-phone' : undefined} data-testid="input-phone" />{formErrors.phone && <span id="error-phone" className="form-error" role="alert">{formErrors.phone}</span>}</div>
            <div className="field"><label htmlFor="email">Email Address <em>*</em></label><input required id="email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(e) => update('email', e.target.value)} aria-invalid={!!formErrors.email} aria-describedby={formErrors.email ? 'error-email' : undefined} data-testid="input-email" />{formErrors.email && <span id="error-email" className="form-error" role="alert">{formErrors.email}</span>}</div>
            <div className="field"><label htmlFor="course-select">Course Selection <em>*</em></label><select required id="course-select" value={values.course} onChange={(e) => update('course', e.target.value)} data-testid="select-course"><option>EXIM / Import–Export Course</option></select></div>
            <div className="field"><label htmlFor="preferred-date">Preferred Counselling Date <em>*</em></label><input required id="preferred-date" type="date" min={minDate} value={preferredDate} onChange={(e) => { setPreferredDate(e.target.value); setFormErrors((old) => ({ ...old, date: '' })); setFormStatus(''); }} aria-invalid={!!formErrors.date} aria-describedby={formErrors.date ? 'error-date' : undefined} data-testid="input-preferred-date" />{formErrors.date && <span id="error-date" className="form-error" role="alert">{formErrors.date}</span>}</div>
            <div className="field"><label htmlFor="preferred-time">Preferred Time <em>*</em></label><select required id="preferred-time" value={values.time} onChange={(e) => update('time', e.target.value)} aria-invalid={!!formErrors.time} aria-describedby={formErrors.time ? 'error-time' : undefined} data-testid="select-preferred-time"><option value="">Select a preferred time</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>No Preference</option></select>{formErrors.time && <span id="error-time" className="form-error" role="alert">{formErrors.time}</span>}</div>
          </div>
          <label className="consent"><input required type="checkbox" checked={values.consent} onChange={(e) => update('consent', e.target.checked)} aria-invalid={!!formErrors.consent} data-testid="checkbox-contact-consent" /><span>I consent to be contacted about course information. <em>*</em>{formErrors.consent && <span className="form-error" role="alert">{formErrors.consent}</span>}</span></label>
          <button className="button form-submit" type="submit" data-testid="button-request-details">Request Course Details <ArrowRight size={16} /></button>
          {formStatus && <div className="form-status" role="status" aria-live="polite" data-testid="status-form">{formStatus}</div>}
          <div className="form-disclaimer"><ShieldCheck size={14} /><span>Your information stays in this browser and is not transmitted. To enquire now, call <a href="tel:+919820633814">+91 98206 33814</a> or email <a href="mailto:sim639212@gmail.com">sim639212@gmail.com</a>. Form submissions need a separate service connection.</span></div>
        </form>
      </div>
    </section>

    <section className="section audience" id="about">
      <div className="wrap">
        <div className="section-heading-row"><div><div className="section-kicker">Built for the curious and the doers</div><h2 className="section-title">Who Is This Course For?</h2></div><p className="section-copy">A grounded starting point for people who want to understand how international trade works in practice.</p></div>
        <div className="audience-grid">
          <article className="audience-card"><div className="icon-box"><Globe2 size={21} /></div><h3>Beginners Exploring EXIM</h3><p>Understand the fundamentals of international trade and the import–export process.</p></article>
          <article className="audience-card"><div className="icon-box"><PackageSearch size={21} /></div><h3>Aspiring Entrepreneurs</h3><p>Learn how product research, market research, buyer verification, and costing fit into an EXIM business.</p></article>
          <article className="audience-card"><div className="icon-box"><BriefcaseBusiness size={21} /></div><h3>Small Business Owners</h3><p>Build a clearer understanding of sourcing, documentation, shipping, and international transactions.</p></article>
          <article className="audience-card"><div className="icon-box"><BookOpen size={21} /></div><h3>Professionals and Learners</h3><p>Develop structured knowledge of EXIM processes through practical, scenario-based learning.</p></article>
        </div>
      </div>
    </section>

    <section className="section curriculum" id="curriculum">
      <div className="wrap curriculum-layout">
        <div className="curriculum-aside"><div className="section-kicker">What you will explore</div><h2 className="section-title">A practical path through the trade process.</h2><p className="section-copy">Ten connected modules take you from core terminology to an actionable business plan. Open a module to see what it covers.</p><div className="curriculum-count"><strong>10</strong><span>core learning modules<br />No invented hours or credentials</span></div></div>
        <div className="module-list" aria-label="Course curriculum">
          {modules.map(([title, description], i) => <article className={`module${openModule === i ? ' open' : ''}`} key={title}>
            <button className="module-trigger" aria-expanded={openModule === i} aria-controls={`module-description-${i}`} onClick={() => setOpenModule(openModule === i ? null : i)} data-testid={`button-module-${i + 1}`}>
              <span className="module-num">{String(i + 1).padStart(2, '0')}</span><span className="module-title">{title}</span><ChevronDown size={17} />
            </button>
            {openModule === i && <p className="module-desc" id={`module-description-${i}`} data-testid={`text-module-description-${i + 1}`}>{description}</p>}
          </article>)}
        </div>
      </div>
    </section>

    <section className="simulation" id="simulation">
      <div className="wrap">
        <div className="simulation-header"><div><div className="section-kicker">Learn by connecting the steps</div><h2 className="section-title">Put Your Knowledge Into Practice</h2><p className="section-copy">Apply the course concepts to a sample trade scenario and understand how the different stages of an import–export transaction connect.</p></div><div className="simulation-note">A guided learning exercise—not a live transaction, a real buyer, or a promised business outcome.</div></div>
        <div className="steps">
          <article className="step"><div className="step-head"><span className="step-no">01</span><span className="step-label">Step 1</span></div><h3>Research</h3><ul><li><Check size={15} />Product and market research</li><li><Check size={15} />Buyer verification</li><li><Check size={15} />Supplier comparison</li><li><Check size={15} />HS-code and compliance considerations</li></ul></article>
          <article className="step"><div className="step-head"><span className="step-no">02</span><span className="step-label">Step 2</span></div><h3>Prepare</h3><ul><li><Check size={15} />Cost estimation</li><li><Check size={15} />Export quotation</li><li><Check size={15} />Payment terms and Incoterms</li><li><Check size={15} />Documentation and shipping checklist</li></ul></article>
          <article className="step"><div className="step-head"><span className="step-no">03</span><span className="step-label">Step 3</span></div><h3>Plan</h3><ul><li><Check size={15} />Indicative profitability review</li><li><Check size={15} />Risk considerations</li><li><Check size={15} />Missing-information checklist</li><li><Check size={15} />90-day action plan</li></ul></article>
        </div>
        <div className="sim-caption"><CircleHelp size={15} /> Simulation content is educational and indicative. It does not represent a guaranteed real buyer, actual order, profitability, or business result.</div>
      </div>
    </section>

    <section className="section benefits">
      <div className="wrap">
        <div className="section-kicker">How learning is structured</div><h2 className="section-title">Why Learn With SIM?</h2><p className="section-copy">Clear concepts, connected processes, and practical ways to organise what comes next.</p>
        <div className="benefit-grid">
          <article className="benefit"><span className="benefit-num">01</span><div><h3>Structured Learning Path</h3><p>Move through core EXIM concepts in a clear sequence.</p></div></article>
          <article className="benefit"><span className="benefit-num">02</span><div><h3>Process-Based Understanding</h3><p>Connect product research, partner checks, documentation, logistics, and costing.</p></div></article>
          <article className="benefit"><span className="benefit-num">03</span><div><h3>Applied Practice</h3><p>Use a sample transaction scenario to practise decisions and identify missing information.</p></div></article>
          <article className="benefit"><span className="benefit-num">04</span><div><h3>Action-Oriented Learning</h3><p>Organise research and next steps into a practical 90-day plan.</p></div></article>
        </div>
      </div>
    </section>

    <section className="section trainer" id="trainer">
      <div className="wrap">
        <div className="trainer-card">
          <div className="portrait" data-testid="image-trainer"><img className="portrait-photo" src={rahulPortrait} alt="Rahul Waghmare, EXIM Professional, Exporter, Consultant and Mentor" width="1145" height="1374" loading="lazy" decoding="async" /></div>
          <div><div className="section-kicker">About the Mentor</div><h2 className="trainer-name">Rahul Waghmare</h2>
            <h3 className="trainer-subtitle">From Early Beginnings to EXIM Expertise</h3>
            <div className="trainer-role">EXIM Professional <span>|</span> Exporter <span>|</span> Consultant &amp; Mentor</div>
            <p className="trainer-copy">Rahul Waghmare is an EXIM professional, exporter, consultant, and mentor with 16+ years of professional experience in import–export documentation, international trade, corporate operations, and entrepreneurship.</p>
            <p className="trainer-copy">His journey began in 2010 while he was in 10th standard. After gaining practical experience and completing his graduation in 2015, he joined an MNC in 2016 and later started his own import–export business.</p>
            <p className="trainer-copy">Recognizing the gap between theoretical learning and industry practice, he founded Skills Institute of Management (SIM) in 2024 to help students and aspiring entrepreneurs build practical EXIM skills and industry-ready careers.</p>
            <div className="trainer-facts"><span className="fact-number">16+ years</span><span>Professional experience across documentation, trade, corporate operations, and entrepreneurship</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className="cta" aria-labelledby="cta-heading">
      <div className="wrap cta-inner"><div><h2 id="cta-heading">Ready to Understand the EXIM Process?</h2><p>Explore the course curriculum and discuss your learning goals with Skills Institute of Management.</p></div><a className="button button-gold" href="#enquiry" data-testid="link-cta-enquire">Request Course Details <ArrowRight size={16} /></a></div>
    </section>

    <section className="section faq">
      <div className="wrap faq-layout"><div><div className="section-kicker">The practical details</div><h2 className="section-title">Questions, answered plainly.</h2><p className="section-copy">If a detail is not confirmed, we say so. Ask SIM directly for the latest course information.</p></div>
        <div className="faq-list" aria-label="Frequently asked questions">
          {faqs.map(([question, answer, placeholder], i) => <article className={`faq-item${openFaq === i ? ' open' : ''}`} key={question}>
            <button className="faq-trigger" aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)} data-testid={`button-faq-${i + 1}`}><span>{question}</span><ArrowDownRight size={17} /></button>
            {openFaq === i && <div className="faq-answer" id={`faq-answer-${i}`} data-testid={`text-faq-answer-${i + 1}`}>{answer}{placeholder && <span className="detail-placeholder">{placeholder}<br />Certificate: [TO BE CONFIRMED] · Placement support: [TO BE CONFIRMED]</span>}</div>}
          </article>)}
        </div>
      </div>
    </section>

    <footer className="footer" id="contact">
      <div className="wrap footer-main">
        <div className="footer-brand-block"><Brand /><p className="footer-about">Practical learning for people building a clearer understanding of global trade. Contact SIM for current course information.</p></div>
        <div><h4>Explore</h4><div className="footer-links"><a href="#about">About SIM</a><a href="#course">EXIM Course</a><a href="#curriculum">Course Curriculum</a><a href="#trainer">Trainer</a></div></div>
        <div><h4>Contact SIM</h4><div className="footer-links">
          <a className="contact-placeholder" href="tel:+919820633814" data-testid="link-contact-phone">Phone<br />+91 98206 33814</a>
          <a className="contact-placeholder" href="mailto:sim639212@gmail.com" data-testid="link-contact-email">Email<br />sim639212@gmail.com</a>
          <address className="contact-placeholder">Address<br />5, Police Station Rd, Gandhi Nagar Society, Bandrekar Wadi, Jogeshwari East, Mumbai, Maharashtra 400060</address>
        </div></div>
        <div><h4>Stay connected</h4><div className="footer-links"><span className="contact-placeholder">Social profiles to be confirmed</span><a href="#enquiry">Request course details</a></div></div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Skills Institute of Management</span><div className="footer-legal"><a href="#contact" data-testid="link-privacy-policy">Privacy Policy</a><a href="#contact" data-testid="link-terms">Terms and Conditions</a></div></div>
    </footer>
    <div className="mobile-cta"><a className="button" href="#enquiry" data-testid="link-mobile-enquire">Enquire About the Course <ArrowRight size={16} /></a></div>
    <div className="whatsapp-contact-stack">
      <img className="money-back-badge" src={moneyBackBadge} alt="100% money back guaranteed badge" width="1000" height="1009" data-testid="image-money-back-guarantee" />
      <a
        className="whatsapp-float"
        href="https://wa.me/919820633814?text=Hi%2C%20I%27m%20interested%20in%20the%20SIM%20EXIM%20Course."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Talk to SIM on WhatsApp at +91 98206 33814"
        data-testid="link-whatsapp-floating"
      >
        <span className="whatsapp-float-icon" aria-hidden="true"><MessageCircle size={22} /></span>
        <span className="whatsapp-float-copy"><span>Talk to us on WhatsApp</span><strong>+91 98206 33814</strong></span>
      </a>
    </div>
  </main>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}
export default App;
