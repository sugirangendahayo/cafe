import { useEffect, useState } from 'react'
import heroCoffee from './assets/hero-coffee.png'
import './App.css'

const cafes = [
  { name: 'Brew & Bloom', type: 'Specialty Coffee', rating: '4.9', art: 'latte' },
  { name: 'Roast Republic', type: 'Artisan Roastery', rating: '4.8', art: 'flower' },
  { name: 'The Daily Grind', type: 'Breakfast & Coffee', rating: '4.7', art: 'heart' },
]

const products = [
  { name: 'Americano', category: 'Black Coffee', detail: '100% natural arabica, bold and smooth', art: 'latte', price: '$2.50' },
  { name: 'Cappuccino', category: 'Milk Coffee', detail: 'Espresso, steamed milk and soft foam', art: 'flower', price: '$3.50' },
  { name: 'Mocha Velvet', category: 'Signature', detail: 'Dark chocolate, espresso and steamed milk', art: 'heart', price: '$3.90' },
  { name: 'Cold Brew', category: 'Iced Coffee', detail: 'Slow steeped, smooth and refreshing', art: 'latte', price: '$3.50' },
  { name: 'Flat White', category: 'Milk Coffee', detail: 'Silky microfoam over a double shot', art: 'flower', price: '$3.60' },
  { name: 'Caramel Latte', category: 'Signature', detail: 'Sweet caramel, espresso and creamy milk', art: 'heart', price: '$4.20' },
  { name: 'Espresso', category: 'Black Coffee', detail: 'A concentrated, aromatic classic', art: 'latte', price: '$2.00' },
  { name: 'Matcha Cloud', category: 'Non Coffee', detail: 'Ceremonial matcha with vanilla foam', art: 'flower', price: '$4.00' },
]

function Logo() {
  return <div className="logo"><strong>My Cofee</strong><small>Wake up to something special.</small></div>
}

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function Button({ children, className = '', onClick }) {
  return <button className={`pill-button ${className}`} onClick={onClick}>{children}</button>
}

function IconButton({ type, onClick }) {
  return <button className={`icon-button ${type}`} aria-label={type === 'cart' ? 'Add to cart' : 'Save coffee'} onClick={onClick}><span /></button>
}

function CoffeeCup({ variant = 'latte', large = false }) {
  return <div className={`coffee-cup ${variant} ${large ? 'large' : ''}`}><span>{variant === 'heart' ? '♥' : variant === 'latte' ? '〰' : '✿'}</span></div>
}

function Header({ currentPath = '/', onLogin }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [['Home', '/'], ['Coffee Menu', '/menu'], ['About Us', '/about'], ['Contact us', '/contact']]
  const goTo = (path) => { setMenuOpen(false); navigate(path) }
  return <header><button className="brand-button" onClick={() => goTo('/')}><Logo /></button><nav>{links.map(([label, path]) => <a className={currentPath === path ? 'active' : ''} href={path} onClick={(event) => { event.preventDefault(); goTo(path) }} key={path}>{label}</a>)}<Button onClick={onLogin}>Order Now</Button></nav><button className="menu-toggle" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? '×' : '☰'}</button>{menuOpen && <div className="mobile-nav">{links.map(([label, path]) => <a className={currentPath === path ? 'active' : ''} href={path} onClick={(event) => { event.preventDefault(); goTo(path) }} key={path}>{label}</a>)}<Button onClick={() => { setMenuOpen(false); onLogin() }}>Order Now</Button></div>}</header>
}

function Hero() {
  return <section className="hero-section reveal" id="home">
    <div className="hero-copy"><span className="hero-kicker">FRESHLY ROASTED · ALWAYS WARM</span><h1>Coffee<br />The Best For You</h1><p className="hero-description">Discover beautifully crafted coffee and welcoming places made for your everyday ritual.</p><Button onClick={() => navigate('/menu')}>View Menu</Button><div className="category-icons"><span>☕</span><span>♨</span><span>♨</span><span>◉</span></div></div>
    <div className="hero-image-wrap"><img className="hero-image" src={heroCoffee} alt="A cup of freshly brewed coffee" /><span className="hero-image-note">Handcrafted<br /><b>every morning</b></span></div>
  </section>
}

function ProductCard({ product, onLogin }) {
  return <article className="product-card"><CoffeeCup variant={product.art} /><span className="product-category">{product.category}</span><h3>{product.name}</h3><p>{product.detail}</p><div className="product-actions"><IconButton type="cart" onClick={onLogin} /><IconButton type="heart" onClick={onLogin} /></div><b>{product.price}</b></article>
}

function Products({ onLogin }) {
  return <section className="products-section reveal" id="menu"><div className="product-list">{products.slice(0, 2).map((product) => <ProductCard product={product} onLogin={onLogin} key={product.name} />)}</div><div className="intro-copy"><small>OUR HOUSE FAVORITES</small><h2>Made slowly.<br />Enjoyed fully.</h2><p>From bright and bold to soft and creamy, there is a cup for every kind of morning.</p><Button onClick={() => navigate('/menu')}>Explore menu</Button></div></section>
}

function Feature() {
  return <section className="feature-section reveal" id="about"><div className="feature-copy"><h2>Lorem Ipsum is simply dummy text<br />of the printing and typesetting</h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p><Button>Learn More</Button></div><div className="feature-art"><CoffeeCup variant="latte" large /><span className="price-tag">$2.50</span><div className="beans">• · • · •<br />· • · • ·<br />• · • · •</div></div></section>
}

function CoffeeJournal() {
  return <section className="journal-section reveal"><div className="journal-feature"><div className="journal-art"><img src={heroCoffee} alt="Fresh coffee" /></div><div><small>THE FLAVORED JOURNAL</small><h2>Why the first sip always feels like home.</h2><p>From bean to cup, discover the little rituals and thoughtful details behind better coffee.</p><a href="/about" onClick={(event) => { event.preventDefault(); navigate('/about') }}>Read our story ↗</a></div></div><div className="ritual-card"><span>01</span><div><small>YOUR DAILY RITUAL</small><h3>Take a moment. Make it yours.</h3><p>Choose your roast, find your table, and let the day start at its own pace.</p></div><Button onClick={() => navigate('/cafes')}>Find a cafe</Button></div></section>
}

function RecentCafes() {
  return <section className="recent-cafes reveal" id="cafes"><div className="section-heading"><div><small>DISCOVER YOUR NEXT FAVORITE</small><h2>Recent Cafes</h2></div><div className="heading-actions"><button className="filter-button">☷ Filter</button><a href="/cafes" onClick={(event) => { event.preventDefault(); navigate('/cafes') }}>View More <span>↗</span></a></div></div><div className="cafe-grid">{cafes.map((cafe) => <CafeCard cafe={cafe} key={cafe.name} />)}</div></section>
}

function CafeCard({ cafe }) {
  return <article className="cafe-card" onClick={() => navigate(`/cafes/${cafe.name.toLowerCase().replaceAll(' ', '-')}`)}><div className="cafe-image"><CoffeeCup variant={cafe.art} large /><span className="bookmark">♡</span><span className="open-badge">Open now</span></div><div className="cafe-card-content"><div><h3>{cafe.name}</h3><p>{cafe.type}</p></div><strong>★ {cafe.rating}</strong></div><div className="cafe-meta"><span>⌖ Downtown</span><span>10–20 min</span></div></article>
}

function Footer({ onLogin }) {
  return <footer className="reveal" id="contact"><div className="contact"><div><small>LET'S TALK</small><h2>Want to Reserve a Table?</h2></div><Button onClick={onLogin}>Contact Now</Button></div><p className="footer-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p><div className="footer-columns"><Logo /><div><h3>Our Services</h3><p>Pricing</p><p>Tracking</p><p>Report a Bug</p><p>Terms of Services</p></div><div><h3>Our Company</h3><p>Pricing</p><p>Tracking</p><p>Report a Bug</p><p>Terms of Services</p></div><div><h3>Address</h3><p>Lorem Ipsum is simply dummy text of the printing and</p></div></div></footer>
}

function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false)
  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return <main className="page-transition"><div className="page-shell"><Header currentPath="/" onLogin={() => setLoginOpen(true)} /><Hero /><Products onLogin={() => setLoginOpen(true)} /><Feature /><RecentCafes /><CoffeeJournal /><Footer onLogin={() => setLoginOpen(true)} /></div>{loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}</main>
}

function LoginModal({ onClose }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="login-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><span className="modal-eyebrow">WELCOME BACK</span><h2>Make your order<br />feel like home.</h2><p>Sign in to save favorites, order ahead, and keep your coffee ritual close.</p><form onSubmit={(event) => { event.preventDefault(); onClose() }}><input type="email" placeholder="Email address" required /><input type="password" placeholder="Password" required /><Button>Continue</Button></form><small>New here? Your first coffee is waiting.</small></div></div>
}

function InteriorPage({ title, eyebrow, children, currentPath }) {
  const [loginOpen, setLoginOpen] = useState(false)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return <main className="page-transition"><div className="page-shell"><Header currentPath={currentPath} onLogin={() => setLoginOpen(true)} /><section className="interior-hero reveal is-visible"><small>{eyebrow}</small><h1>{title}</h1><p>Thoughtfully made coffee, welcoming spaces, and little moments worth slowing down for.</p></section>{children}<Footer onLogin={() => setLoginOpen(true)} /></div>{loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}</main>
}

function MenuPage() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('Featured')
  const categories = ['All', ...new Set(products.map((product) => product.category))]
  const visibleProducts = products.filter((product) => (category === 'All' || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'Price low' ? Number(a.price.slice(1)) - Number(b.price.slice(1)) : sort === 'Price high' ? Number(b.price.slice(1)) - Number(a.price.slice(1)) : 0)
  return <><InteriorPage title="Coffee Menu" eyebrow="CRAFTED FOR YOUR DAY" currentPath="/menu"><section className="menu-browser"><div className="menu-toolbar"><label className="search-box">⌕<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search coffee, flavors..." /></label><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Price low</option><option>Price high</option></select></div><div className="category-tabs">{categories.map((item) => <button className={category === item ? 'selected' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="menu-result-row"><span>{visibleProducts.length} coffees for your next ritual</span><button className="filter-button">☷ More filters</button></div><section className="menu-grid reveal is-visible">{visibleProducts.map((product) => <ProductCard product={product} onLogin={() => setLoginOpen(true)} key={product.name} />)}</section></section></InteriorPage>{loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}</>
}

function CafesPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All cafes')
  const allCafes = [...cafes, { name: 'Mellow Corner', type: 'Quiet Work Cafe', rating: '4.6', art: 'latte' }, { name: 'Café Sol', type: 'European Bakery', rating: '4.8', art: 'flower' }, { name: 'Ember House', type: 'Coffee & Vinyl', rating: '4.9', art: 'heart' }]
  const visibleCafes = allCafes.filter((cafe) => (filter === 'All cafes' || (filter === 'Top rated' && Number(cafe.rating) >= 4.8)) && cafe.name.toLowerCase().includes(query.toLowerCase()))
  return <InteriorPage title="Find a Cafe" eyebrow="YOUR NEXT FAVORITE TABLE" currentPath="/cafes"><section className="directory-browser"><div className="directory-toolbar"><label className="search-box">⌕<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by cafe or neighborhood..." /></label><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All cafes</option><option>Top rated</option></select></div><div className="directory-subbar"><span>{visibleCafes.length} welcoming places to explore</span><button className="filter-button">⌖ Use my location</button></div><section className="directory-grid">{visibleCafes.map((cafe) => <CafeCard cafe={cafe} key={cafe.name} />)}</section></section></InteriorPage>
}

function AboutPage() {
  return <InteriorPage title="Our Story" eyebrow="MADE WITH INTENTION" currentPath="/about"><section className="story-layout reveal is-visible"><div className="story-art"><CoffeeCup variant="latte" large /></div><div><h2>A slower way to enjoy coffee.</h2><p>Flavored began with a simple idea: coffee tastes better when the room invites you to stay. We partner with thoughtful roasters, local bakers, and people who care about the small details.</p><p>Every cup is served with warmth, curiosity, and a little bit of character.</p><Button onClick={() => navigate('/cafes')}>Explore our cafes</Button></div></section></InteriorPage>
}

function ContactPage() {
  return <InteriorPage title="Let's talk" eyebrow="WE ARE HERE FOR YOU" currentPath="/contact"><section className="contact-layout reveal is-visible"><div><h2>Reserve a table or say hello.</h2><p>Tell us what you need and our team will get back to you soon.</p><div className="contact-details"><span>hello@flavored.cafe</span><span>+1 555 018 204</span><span>Downtown, every morning</span></div></div><form onSubmit={(event) => event.preventDefault()}><input placeholder="Your name" /><input type="email" placeholder="Email address" /><textarea placeholder="How can we help?" rows="5" /><Button>Send message</Button></form></section></InteriorPage>
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => { const updatePath = () => setPath(window.location.pathname); window.addEventListener('popstate', updatePath); return () => window.removeEventListener('popstate', updatePath) }, [])
  if (path === '/menu') return <MenuPage />
  if (path === '/cafes' || path.startsWith('/cafes/')) return <CafesPage />
  if (path === '/about') return <AboutPage />
  if (path === '/contact') return <ContactPage />
  return <HomePage />
}

export default App
