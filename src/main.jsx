import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  FaAndroid, FaApple, FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp,
  FaReact, FaNodeJs, FaJava, FaGooglePlay, FaExternalLinkAlt
} from 'react-icons/fa'
import { SiFlutter, SiDart, SiKotlin, SiFirebase, SiMysql, SiMongodb, SiOpenai, SiVite } from 'react-icons/si'
import { TbBrandKotlin, TbDeviceMobileCode, TbApi, TbRocket, TbShieldCheck, TbBrandThreejs, TbWorldCode, TbMapPinCode, TbChartInfographic } from 'react-icons/tb'
import { FiArrowUpRight, FiDownload, FiMail, FiMapPin, FiSearch, FiCode, FiLayers, FiSmartphone, FiZap, FiCpu, FiDatabase, FiBriefcase, FiHome, FiUser, FiCheckCircle, FiActivity } from 'react-icons/fi'
import './styles.css'

const resumeUrl = './Sachin_Gupta_Resume.pdf'

const links = {
  linkedin: 'https://www.linkedin.com/',
  github: 'https://github.com/sachinguptadz',
  instagram: 'https://www.instagram.com/',
  whatsapp: 'https://wa.me/917071878792',
  email: 'mailto:sachinguptadz@gmail.com'
}

const projects = [
  {title:'Lift It Humanity', cat:'NGO / Enterprise', tag:'Full Lifecycle', year:'2025', text:'NGO management platform with Node.js APIs, database planning, two Flutter apps and React admin panel for scalable operations.', stack:['Flutter','Node.js','React','MongoDB'], featured:true},
  {title:'FarmingCare', cat:'AgriTech / LMS', tag:'E-Commerce + Courses', year:'2026', text:'Agriculture e-commerce and LMS with products, courses, enrollments, progress, downloads, orders, blogs, reviews and admin content management.', stack:['React','MySQL','PHP/Node','UI/UX'], featured:true},
  {title:'Sky Social Network', cat:'Social / Mining', tag:'Token Mining App', year:'2026', text:'Flutter social mining ecosystem with SKY rewards, referrals, wallet earnings, Prime benefits and React landing website.', stack:['Flutter','React','Wallet','API'], featured:true},
  {title:'Sanatan Vision', cat:'Spiritual / Wellness', tag:'Live + Webinar', year:'2025', text:'Digital platform with live streaming, webinar hosting, podcasts, paid consultation, LiveKit calling and secure payments.', stack:['Flutter','LiveKit','Payments','Streaming'], featured:true},
  {title:'Senzara Marketing', cat:'Marketing Ops', tag:'Field Sales', year:'2024', text:'Marketing team application for product promotions, sales activity tracking and customer engagement workflows.', stack:['Flutter','API','Tracking']},
  {title:'Senzara Field InCharge', cat:'Field Operations', tag:'Real-time Reports', year:'2024', text:'Field in-charge app for ground operations, image/video updates, activity execution and progress monitoring.', stack:['Flutter','Media','Location']},
  {title:'Senzara Multi-Crop Farming', cat:'Agri / Investment', tag:'Multi App System', year:'2024', text:'Farming platform for product purchases, multi-crop investment and produce sales with connected field apps.', stack:['Flutter','E-Commerce','Admin']},
  {title:'IMT-Network', cat:'Crypto Wallet', tag:'Decentralized App', year:'2023', text:'Decentralized crypto wallet app enabling users to securely store, manage and transact cryptocurrencies with private-key control.', stack:['Flutter','Web3','Wallet']},
  {title:'Ram Ram Bank', cat:'Devotional App', tag:'Gamified Japa', year:'2024', text:'Devotional app where users can Japa Ram Nam by typing, tapping or gestures, with leaderboards and mala count rewards.', stack:['Android','Flutter','Gamification']},
  {title:'Socio', cat:'Web3 / Mining', tag:'24h Mining Logic', year:'2024', text:'Pi Network-style Socio Coin mining app with 24-hour claiming, streaks, referrals and integrated Web3 wallet like MetaMask/Trust Wallet.', stack:['Flutter','Web3','Wallet']},
  {title:'Regent Wallet', cat:'Crypto MLM', tag:'Staking Platform', year:'2023', text:'Crypto MLM staking platform with secure staking, reward distribution, referral tracking and optimized Play Store updates.', stack:['Flutter','Crypto','API']},
  {title:'VaultVerse', cat:'Decentralized Wallet', tag:'Seed Phrase + Multi-chain', year:'2023', text:'MetaMask-like wallet with 12-word seed phrase address generation, BSC/ETH transactions, buy, sell and swap flows.', stack:['Flutter','BSC','ETH']},
  {title:'LittleLuck', cat:'Real Estate', tag:'Property Platform', year:'2024', text:'Real estate product experience focused on property listings, inquiry flow and smooth mobile-first browsing.', stack:['Android','API','Maps']},
  {title:'Agarwal Enterprises', cat:'Business Ops', tag:'Order Management', year:'2024', text:'Order and production management system for operational visibility, workflow tracking and business reporting.', stack:['Android','Admin','Database']},
  {title:'Khata Darpan', cat:'Finance', tag:'Budget Management', year:'2024', text:'Budget management app with income-expense tracking, history, reporting and simplified finance workflows.', stack:['Android','SQLite','Charts']},
  {title:'Fin Rise', cat:'Investment', tag:'Finance App', year:'2024', text:'Investment and finance application with user dashboards, secure flows and financial data presentation.', stack:['Flutter','Finance','API']},
  {title:'SAM', cat:'Task Management', tag:'Productivity', year:'2024', text:'Task management solution for assignments, progress tracking and clean team productivity workflows.', stack:['Android','API','UX']},
  {title:'Everest Properties', cat:'Real Estate', tag:'Listings', year:'2024', text:'Property discovery interface with project showcases, location details and lead-focused user journey.', stack:['Android','UI/UX','Maps']},
  {title:'Lucky Pe', cat:'Finance / Payments', tag:'Payment Utility', year:'2024', text:'Finance and payment application focused on secure transactions and simplified user money movement.', stack:['Android','Payments','API']},
  {title:'Sainik Security', cat:'Tracking / Security', tag:'GPS Tracking', year:'2024', text:'Tracking and security app with location services, real-time updates and field monitoring workflows.', stack:['Android','GPS','Firebase']},
  {title:'Grocery Delivery Partner', cat:'E-Commerce', tag:'Delivery Ops', year:'2024', text:'Delivery partner app for grocery order assignment, status updates, navigation and fulfillment tracking.', stack:['Android','Maps','Orders']},
  {title:'PDF Generator', cat:'Utility', tag:'Document Tool', year:'2024', text:'Productivity utility for creating structured PDF outputs from app data and business workflows.', stack:['Android','PDF','Utility']},
  {title:'Customer Review App', cat:'Feedback', tag:'Ratings', year:'2024', text:'Feedback and rating app for capturing customer sentiment and service quality insights.', stack:['Android','Forms','Reports']},
  {title:'Grocery E-Comm', cat:'E-Commerce', tag:'Shopping App', year:'2024', text:'Grocery shopping experience with product catalog, cart, order flow and customer account management.', stack:['Android','E-Commerce','API']},
  {title:'Vachas', cat:'Education', tag:'Vedic Learning', year:'2024', text:'Sanskrit shloka and Vedic learning app focused on structured content, clean reading and learning UX.', stack:['Flutter','Education','Content']},
  {title:'Urogreeen', cat:'Bio Products', tag:'E-Commerce', year:'2024', text:'Bio products e-commerce app with catalog, product details, cart and order journey.', stack:['Android','E-Commerce','API']},
  {title:'BDT Coin / UTG / IGT Global', cat:'Crypto & Blockchain', tag:'Token Ecosystem', year:'2024', text:'Crypto and blockchain projects involving token experience, wallet flows, user dashboards and secure integrations.', stack:['Flutter','Blockchain','Web3']},
  {title:'Meta Globe / Harvest Sui', cat:'Crypto', tag:'Web3 Products', year:'2024', text:'Web3-focused products with crypto onboarding, wallet-centric flows and mobile-first interfaces.', stack:['Flutter','Crypto','API']},
  {title:'Match Mingler / Bizzlane', cat:'Social / B2B', tag:'Network Apps', year:'2024', text:'Social networking, dating and B2B business solutions with modern app UI, API integration and scalable workflows.', stack:['Flutter','Android','API']},
]

const categories = ['All','Featured','Flutter','Android','E-Commerce','Finance','AgriTech','Social','Enterprise']

const skillGroups = [
  {icon:<SiFlutter/>, title:'Mobile Engineering', desc:'Flutter, Dart, native Android, Java, Kotlin, Android SDK, Jetpack, MVVM/MVP, responsive app UI and Play Store-ready builds.', chips:['Flutter','Dart','Android','Java','Kotlin','Jetpack']},
  {icon:<TbApi/>, title:'API & Backend Integration', desc:'REST/SOAP API integration, auth flows, payment gateways, Firebase, WebSocket, secure storage and clean error handling.', chips:['REST APIs','SOAP','Firebase','Payments','WebSocket','Auth']},
  {icon:<FaReact/>, title:'Web + Admin Panels', desc:'React.js landing pages, dashboards, admin panels, CMS flows, product/order/course management and mobile-friendly web interfaces.', chips:['React.js','Admin Panels','Dashboards','CMS','UI/UX','Vite']},
  {icon:<FiDatabase/>, title:'Database & System Planning', desc:'MySQL, MongoDB, schema design, LMS modules, orders, payments, reviews, progress tracking and scalable data flow planning.', chips:['MySQL','MongoDB','Schema Design','Orders','LMS','Reports']},
  {icon:<TbWorldCode/>, title:'Domain Experience', desc:'Hands-on delivery across agriculture, NGO, social networking, finance, real estate, e-commerce, education, devotional, utility and enterprise products.', chips:['AgriTech','NGO','Finance','Real Estate','E-Commerce','Education']},
  {icon:<TbRocket/>, title:'Product Delivery', desc:'Client communication, requirement analysis, team coordination, Agile workflow, debugging, deployment, ASO and production support.', chips:['Planning','Leadership','Agile','Deployment','ASO','Support']}
]

const architecture = [
  {k:'Mobile UI', v:'Flutter / Android'},
  {k:'Logic', v:'State + API Flow'},
  {k:'Backend', v:'Node / PHP'},
  {k:'Data', v:'MySQL / MongoDB'},
  {k:'Release', v:'Play Store + QA'}
]

function useReveal(){
  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12})
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el))
    return()=>obs.disconnect()
  },[])
}

function Loader(){
  const [hide,setHide]=useState(false)
  useEffect(()=>{ const t=setTimeout(()=>setHide(true),2100); return()=>clearTimeout(t)},[])
  return <div className={`loader ${hide?'hide':''}`}>
    <div className="blackhole" aria-hidden="true">
      <i className="holeCore" />
      <i className="holeRing rA" />
      <i className="holeRing rB" />
      <i className="holeRing rC" />
      <i className="holeSpark s1" />
      <i className="holeSpark s2" />
      <i className="holeSpark s3" />
    </div>
    <div className="loaderIntro">
      <span>Portfolio Initializing</span>
      <h2>Sachin Gupta</h2>
      <p>Mobile apps • Web platforms • Complete product systems</p>
    </div>
  </div>
}

function Cursor(){
  const dot=useRef(null), ring=useRef(null)
  useEffect(()=>{
    const move=e=>{
      if(dot.current){ dot.current.style.transform=`translate(${e.clientX}px,${e.clientY}px)` }
      if(ring.current){ ring.current.animate({transform:`translate(${e.clientX-18}px,${e.clientY-18}px)`},{duration:450,fill:'forwards',easing:'cubic-bezier(.2,.8,.2,1)'}) }
    }
    window.addEventListener('pointermove',move)
    return()=>window.removeEventListener('pointermove',move)
  },[])
  return <><div ref={dot} className="cursorDot"/><div ref={ring} className="cursorRing"/></>
}

function Header(){
  return <header className="header">
    <a href="#home" className="brand"><span>SG</span><b>Sachin Gupta</b></a>
    <nav><a href="#work">Work</a><a href="#skills">Skills</a><a href="#journey">Journey</a><a href="#contact">Contact</a></nav>
    <a className="miniCta" href={resumeUrl} download><FiDownload/> Resume</a>
  </header>
}

function PhoneMockup(){
  return <div className="phoneShell" aria-label="Mobile app mockup">
    <div className="dynamicIsland" />
    <div className="phoneScreen">
      <div className="appStatus"><span>9:41</span><span className="statusDots">● ● ●</span></div>
      <div className="mockHeader">
        <div><small>Developer OS</small><h3>Build Console</h3></div>
        <span className="liveDot">Live</span>
      </div>
      <div className="deliveryArc">
        <div className="arcGlow" />
        <span className="techBubble b1"><SiFlutter/></span>
        <span className="techBubble b2"><FaAndroid/></span>
        <span className="techBubble b3"><FaReact/></span>
        <span className="techBubble b4"><FaNodeJs/></span>
        <strong>360°</strong>
        <em>Product delivery</em>
      </div>
      <div className="phoneStats refined">
        <div><b>40+</b><span>Projects</span></div>
        <div><b>10+</b><span>Domains</span></div>
        <div><b>4+</b><span>Years</span></div>
      </div>
      <div className="buildList">
        {architecture.map((item,i)=><div key={item.k} style={{'--i':i}}><span>{item.k}</span><b>{item.v}</b></div>)}
      </div>
    </div>
  </div>
}

function Hero(){
  return <section id="home" className="hero section">
    <div className="heroText reveal">
      <div className="eyebrow"><span/> Flutter & Native Android Developer</div>
      <h1>Building polished mobile apps, web platforms & scalable product systems.</h1>
      <p>I turn ideas into production-ready experiences across Flutter, native Android, React, backend APIs, databases and business workflows — with strong UI/UX, clean API flow and delivery ownership across multiple domains.</p>
      <div className="heroActions">
        <a className="primaryBtn magnetic" href="#work">Explore Projects <FiArrowUpRight/></a>
        <a className="ghostBtn magnetic" href={resumeUrl} download>Download Resume <FiDownload/></a>
      </div>
      <div className="quickStats">
        <div><b>4+</b><span>Years Experience</span></div>
        <div><b>40+</b><span>Projects Built</span></div>
        <div><b>Full</b><span>Lifecycle Lead</span></div>
      </div>
    </div>
    <div className="heroCard reveal"><PhoneMockup/></div>
  </section>
}

function Marquee(){
  const items=[['Flutter',<SiFlutter/>],['Android',<FaAndroid/>],['Kotlin',<SiKotlin/>],['React',<FaReact/>],['Node.js',<FaNodeJs/>],['MySQL',<SiMysql/>],['MongoDB',<SiMongodb/>],['Firebase',<SiFirebase/>],['Web3',<FiCpu/>],['OpenAI',<SiOpenai/>]]
  return <div className="marquee"><div>{[...items,...items,...items].map((it,i)=><span key={i}>{it[1]} {it[0]}</span>)}</div></div>
}

function Capabilities(){
  const caps=[
    {n:'01', icon:<TbDeviceMobileCode/>, t:'Mobile App Engineering', d:'Flutter and native Android apps with premium UI, secure API integration, local storage, Firebase, maps, payment and release support.'},
    {n:'02', icon:<FiLayers/>, t:'Product + Admin Systems', d:'React admin panels, dashboards, content management, LMS, e-commerce, order, payment, reporting and user workflows.'},
    {n:'03', icon:<TbMapPinCode/>, t:'Multi-Domain Experience', d:'Agriculture, NGO, finance, real estate, social, devotional, education, utility, enterprise and field operation products.'},
    {n:'04', icon:<TbRocket/>, t:'End-to-End Delivery', d:'Requirement analysis, DB planning, API flow, team coordination, UI/UX refinement and production deployment.'}
  ]
  return <section className="section" id="about"><div className="sectionHead reveal"><div><span>What I Do</span><h2>From idea to launch, I build complete digital products.</h2></div></div><div className="capGrid">{caps.map(c=><article className="capCard reveal" key={c.t}><b>{c.n}</b><div className="capIcon">{c.icon}</div><h3>{c.t}</h3><p>{c.d}</p></article>)}</div></section>
}

function Skills(){
  return <section id="skills" className="section skillsSection">
    <div className="sectionHead reveal">
      <div><span>Tech Stack</span><h2>A clear product-builder skill system, not just random tools.</h2></div>
      <p>Designed around how real apps are built: UI, logic, APIs, data, security, testing and release.</p>
    </div>
    <div className="skillShowcase">
      <div className="skillRadar reveal">
        <div className="radarCore"><FiActivity/><b>Mobile First</b><span>UI → API → DB → Release</span></div>
        <i className="orbit o1"/><i className="orbit o2"/><i className="orbit o3"/>
        <span className="radarPoint p1"><SiFlutter/></span>
        <span className="radarPoint p2"><FaAndroid/></span>
        <span className="radarPoint p3"><FaReact/></span>
        <span className="radarPoint p4"><FiDatabase/></span>
      </div>
      <div className="skillGroups">
        {skillGroups.map((s)=><article className="skillGroup reveal" key={s.title}>
          <div className="skillGroupIcon">{s.icon}</div>
          <div><h3>{s.title}</h3><p>{s.desc}</p><div className="skillChips">{s.chips.map(c=><small key={c}>{c}</small>)}</div></div>
        </article>)}
      </div>
    </div>
  </section>
}

function ProjectLinks(){
  return <div className="links">
    <a href="#" onClick={e=>e.preventDefault()}><FaExternalLinkAlt/> Web</a>
    <a href="#" onClick={e=>e.preventDefault()}><FaAndroid/> Android</a>
    <a href="#" onClick={e=>e.preventDefault()}><FaApple/> iOS</a>
    <a href="#" onClick={e=>e.preventDefault()}><FaGithub/> GitHub</a>
  </div>
}
function Projects(){
  const [cat,setCat]=useState('All'); const [q,setQ]=useState('')
  const filtered=useMemo(()=>projects.filter(p=>{
    const text=(p.title+p.cat+p.tag+p.text+p.stack.join(' ')).toLowerCase()
    const okQ=text.includes(q.toLowerCase())
    const okC=cat==='All'||(cat==='Featured'?p.featured:text.includes(cat.toLowerCase()))
    return okQ&&okC
  }),[cat,q])
  return <section id="work" className="section"><div className="sectionHead reveal"><div><span>Selected Work</span><h2>Projects across mobile apps, LMS, NGO systems, finance, real estate, e-commerce, social, agriculture and enterprise operations.</h2></div></div><div className="toolbar reveal"><label className="search"><FiSearch/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search projects, stack or domain"/></label><div className="filters">{categories.map(c=><button key={c} className={cat===c?'active':''} onClick={()=>setCat(c)}>{c}</button>)}</div></div><div className="projectGrid">{filtered.map(p=><article className={`projectCard reveal ${p.featured?'featured':''}`} key={p.title}><div className="projectMeta"><span>{p.cat}</span><b>{p.year}</b></div><h3>{p.title}</h3><p>{p.text}</p><div className="stack">{p.stack.map(s=><small key={s}>{s}</small>)}</div><ProjectLinks/></article>)}</div></section>
}

function Journey(){
  return <section id="journey" className="section"><div className="sectionHead reveal"><div><span>Career Journey</span><h2>Experience, education and delivery mindset.</h2></div></div><div className="timeline"><div className="reveal"><span>Dec 2022 - Present</span><h3>Dunitech Soft Solutions Pvt Ltd</h3><p>Android & Flutter Developer leading mobile development, client communication, requirement planning, React/PHP/Node integrations, database design and deployment architecture.</p></div><div className="reveal"><span>Apr 2022 - Dec 2022</span><h3>Technosys Services Pvt Ltd</h3><p>Android Developer building high-performance Java/Kotlin apps with API integration, real-time tracking, secure authentication and optimized user experience.</p></div><div className="reveal"><span>2022 - 2025</span><h3>B.Tech CSE</h3><p>Maharishi University of Information Technology, Lucknow. GPA: 8.2</p></div><div className="reveal"><span>2019 - 2021</span><h3>Diploma CSE</h3><p>Feroze Gandhi Polytechnic, Raebareli. GPA: 8.2</p></div></div></section>
}

function Contact(){
  return <section id="contact" className="section"><div className="contactBox reveal"><div><span className="eyebrow"><span/> Available for premium product work</span><h2>Have a mobile app, admin panel, API system or complete digital product idea?</h2><p><FiMapPin/> Lucknow, Uttar Pradesh, India</p><p><FiMail/> sachinguptadz@gmail.com</p></div><div className="contactActions"><a href={links.email}><FiMail/> Email</a><a href={links.whatsapp}><FaWhatsapp/> WhatsApp</a><a href={links.linkedin}><FaLinkedinIn/> LinkedIn</a><a href={links.github}><FaGithub/> GitHub</a><a href={links.instagram}><FaInstagram/> Instagram</a><a href={resumeUrl} download><FiDownload/> Resume</a></div></div></section>
}

function Footer(){
  return <footer className="footer"><div><a href="#home" className="brand"><span>SG</span><b>Sachin Gupta</b></a><p>Flutter & Native Android Developer building world-class mobile apps, admin panels, APIs and multi-domain product experiences.</p></div><div className="footerSocial"><a href={links.linkedin} aria-label="LinkedIn"><FaLinkedinIn/></a><a href={links.github} aria-label="GitHub"><FaGithub/></a><a href={links.instagram} aria-label="Instagram"><FaInstagram/></a><a href={links.whatsapp} aria-label="WhatsApp"><FaWhatsapp/></a></div><small>© {new Date().getFullYear()} Sachin Gupta. Crafted with premium UI, clean code and product thinking.</small></footer>
}

function BottomNav(){return <nav className="bottomNav"><a href="#home"><FiHome/><span>Home</span></a><a href="#work"><FiBriefcase/><span>Work</span></a><a href="#skills"><FiCpu/><span>Skills</span></a><a href="#contact"><FiUser/><span>Contact</span></a></nav>}

function App(){
  useReveal()
  useEffect(()=>{
    const setProgress=()=>document.documentElement.style.setProperty('--scroll',`${(scrollY/(document.body.scrollHeight-innerHeight))*100}%`)
    setProgress(); window.addEventListener('scroll',setProgress); return()=>window.removeEventListener('scroll',setProgress)
  },[])
  return <>
    <Loader/><Cursor/><div className="progress"/><canvas className="bgCanvas" ref={el=>{ if(!el)return; const ctx=el.getContext('2d'); let w,h,pts=[]; const resize=()=>{w=el.width=innerWidth;h=el.height=innerHeight;pts=Array.from({length:Math.min(90,Math.floor(w/18))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*2+0.5}))}; resize(); addEventListener('resize',resize); const loop=()=>{ctx.clearRect(0,0,w,h); pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(125,211,252,.35)';ctx.fill()}); requestAnimationFrame(loop)}; loop(); }}/><div className="glow"/><Header/><Hero/><Marquee/><Capabilities/><Projects/><Skills/><Journey/><Contact/><Footer/><BottomNav/>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
