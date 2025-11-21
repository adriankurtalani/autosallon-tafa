# Project: Auto Sallon – Modern Car Dealership Website (2025 Style)

## 1. Qëllimi i Webfaqes

Ndërto një webfaqe moderne, responsive dhe shumë profesionale për një **Auto Sallon** (shitje veturash), e fokusuar në:

- Shfaqjen e inventarit të veturave në mënyrë shumë të pastër dhe vizuale.
- Filtrim dhe kërkim të lehtë të veturave (marka, viti, çmimi, kilometrazha, lloji i transmisionit, karburanti).
- Kontakt të shpejtë (telefon, WhatsApp, email, form kontaktues).
- Besueshmëri dhe “brand image” premium / modern.

Stili i përgjithshëm: **2025 trendy**, minimal, me shumë hapësirë të bardhë, tipografi të pastër, gradient të lehtë, animacione të buta (micro-interactions) – dinamik, por **jo ekstrem**.

---

## 2. Tech Stack i rekomanduar

Përdor një stack modern front-end të përshtatshëm për një faqe marketingu + katalog:

- **Framework**: `Next.js` (version i fundit) me **React**.
- **Gjuha**: `TypeScript`.
- **Stilizimi**: `Tailwind CSS`.
- **UI Components**: `shadcn/ui` ose libra të ngjashëm për butona, karta, dialog, inpute.
- **Animacione**: `Framer Motion` për animacione të buta (fade-in, slide, hover effects).
- **Ikona**: `lucide-react`.

Back-end (opsionale, nëse nevojitet):

- Thjeshtë: `Next.js API routes` + JSON files ose një **headless CMS** (p.sh. Sanity / Strapi) për menaxhimin e veturave.
- Ose thjesht një **array JSON statik** me veturat, nëse nuk kërkohet panel administrimi.

---

## 3. Dizajni & UI/UX (stil 2025)

### 3.1 Pamja vizuale

- **Ngjyra kryesore** (shembull, mund të adaptohen):
  - Primary: një blu e errët / petrol `#0F172A` ose `#020617`
  - Accent: blu elektrike / cyan `#22D3EE` ose `#38BDF8`
  - Background: gri shumë e çelët `#F9FAFB`
  - Tekst: `#0F172A` / `#111827`
- **Tipografia**:
  - Tituj: font modern sans-serif (p.sh. `Poppins`, `SF Pro`, `Inter` – varësisht çka përdor Tailwind default).
  - Tekst trup: `Inter` ose e ngjashme, line-height e bollshme.

### 3.2 Atmosfera

- Ndjesi **premium, e pastër, teknologjike** (si konfiguratorët modernë të veturave).
- Shumë **white space**, elemente të rrumbullakosura (`rounded-2xl`), hije të buta, gradient të lehtë në hero/banner.
- Foto të mëdha të veturave, të vendosura në **cards** me hover efekete (zoom i lehtë, shadow, lift).

---

## 4. Strukturë & Sitemap

Krijo një strukturë të thjesht, intuitive:

1. **Home** (`/`)
2. **Inventari i Veturave** (`/cars`)
3. **Detajet e Veturës** (`/cars/[slug]`)
4. **Rreth Nesh** (`/about`)
5. **Shërbimet** (`/services`) – opsionale: financim, import, regjistrim, garanci
6. **Kontakti** (`/contact`)
7. **FAQ** – opsionale
8. **Footer global** me info kontakti, lokacion, rrjete sociale.

---

## 5. Detajet e faqeve

### 5.1 Home Page

Qëllimi: impakt vizual i parë + shteg i qartë drejt inventarit dhe kontaktit.

Seksionet:

1. **Hero Section**
   - Background: foto e madhe veture ose kolazh veturash.
   - Titull i madh: p.sh. “Gjej veturën tënde ideale” / “Auto Sallon [Emri] – Vetura të zgjedhura me kujdes”.
   - Subtext i shkurtër: 1–2 rreshta për besueshmëri.
   - Butona CTA:
     - “Shiko Inventarin”
     - “Na Kontakto”
   - Animacion i butë (framer-motion): fade-in + slight upward motion në load.

2. **Search / Quick Filter Bar**
   - Një bar horizontal direkt poshtë hero:
     - Dropdown: Marka
     - Dropdown: Viti (range ose listë)
     - Dropdown: Transmisioni (Automatik / Manual)
     - Dropdown: Karburanti
     - Input: Çmimi max
     - Buton: “Kërko”
   - Filtrim të bëhet ose në front-end (nëse inventari është JSON) ose me API.

3. **Featured Cars**
   - Grid me 3–6 vetura të theksuara (featured).
   - Çdo kartë veture:
     - Foto kryesore
     - Titull: Marka + Modeli + Viti
     - Badge: “Automatik”, “Dizel”, “Benzinë”, “Elektrik”
     - Info të shpejta: km, fuqi, çmim.
     - Buton “Detaje” → shkon në `/cars/[slug]`.
     - Hover effect: rritje e lehtë, shadow, zoom foto.

4. **Pse të zgjedhësh këtë Auto Sallon**
   - 3–4 ikona + tekste:
     - Shërbim i sigurt
     - Historia & përvoja
     - Garanci / kontroll teknik
     - Mundësi financimi (nëse ka)

5. **Process Section**
   - 3 hapa të qartë (me ikonë + tekst):
     - 1. Zgjidh veturën
     - 2. Na kontakto / rezervim test-drive
     - 3. Finalizo blerjen

6. **Testimonials / Reviews** (opsionale)
   - 3–4 komente klientësh në cards.

7. **Call-to-Action final**
   - Një bandë horizontale me CTA: “Na shkruani tani në WhatsApp” / “Shiko të gjitha veturat”.

---

### 5.2 Inventari i Veturave (`/cars`)

Qëllimi: një faqe katalogu me filtrim dhe sortim.

- **Sidebar Filters** (në desktop), ose drawer filters (në mobile):
  - Marka (multi-select)
  - Model (varësisht markës – mund thjesht si tekst)
  - Viti (slider range ose dropdown)
  - Çmimi (slider range)
  - Kilometrazha (slider)
  - Transmisioni
  - Karburanti
- **Top bar:**
  - Sort: “Më i ri”, “Më i lirë”, “Më i shtrenjtë”, “Kilometrazha më e vogël”.
- **Grid responsive**:
  - Desktop: 3–4 kolona
  - Tablet: 2 kolona
  - Mobile: 1 kolonë
- Çdo kartë veture si në Home, por me më shumë info të shpejta (tag për “E re” / “E përdorur”).

---

### 5.3 Faqja e Detajeve të Veturës (`/cars/[slug]`)

Kjo është shumë e rëndësishme.

Elementet:

- **Galeria e fotove**:
  - Foto kryesore + thumbnail-a poshtë ose slider.
  - Zoom-on-hover në desktop.
- **Info kryesore në krahun tjetër**:
  - Titull: Marka, Model, Viti
  - Çmimi (me styling të theksuar)
  - Butona:
    - “Na kontakto për këtë veturë”
    - “Thirre tani” (link tel: )
    - “WhatsApp” (link i gatshëm wa.me/…)
- **Tabelë specifikash**:
  - Viti
  - Kilometrazha
  - Karburanti
  - Transmisioni
  - Fuqia (HP/kW)
  - Ngjyra
  - Numri i dyerve
  - Opsione ekstra (klimë, navi, sensorë parkimi, kamera, etj.)
- **Përshkrim i detajuar** (tekst).
- **Vetura të ngjashme** poshtë (me logjikë sipas markës/vitit ose thjesht 3–4 të tjera nga inventari).

---

### 5.4 Rreth Nesh (`/about`)

- Foto të sallonit / stafit (nëse ekzistojnë).
- Tekst për:
  - Historikun
  - Vlerat
  - Lokacionin (embed Google Maps).
- CTA: “Na vizitoni” + adresë, orar pune.

---

### 5.5 Shërbimet (`/services`)

Nëse Auto Salloni ofron:

- Import veturash me porosi
- Ndihmë me financim/leasing
- Regjistrim & sigurim
- Transport veture

Shkruaj secilin shërbim si card me ikonë + përshkrim.

---

### 5.6 Kontakti (`/contact`)

- Formular:
  - Emri
  - Email
  - Telefoni
  - Mesazhi
  - (Opsionale) Dropdown: “Interesuar për veturën [lista veturave]”
- Tregoni informacion kontaktues statik:
  - Telefon
  - Email
  - WhatsApp
  - Adresë
- Embed Google Maps me lokacionin e Auto Sallonit.

---

## 6. Animacione & Interaktivitet

Përdor **Framer Motion** dhe CSS transitions për:

- Fade-in sections on scroll (me delay të vogël).
- Hover effects në kartat e veturave (scale + shadow).
- Animacion të butë në butona (opacity + scale në hover/active).
- Modal (p.sh. “View Gallery” full screen) – opsionale.

Mos e tepro me animacione; qëllimi është **elegancë**, jo “flakëri” vizuale.

---

## 7. Responsiviteti

- Dizajni duhet të jetë **mobile-first**.
- Menu në mobile: hamburger menu + slide-in drawer.
- Filtrat në `/cars`: shfaqen si button “Filter” që hap një drawer në mobile.

---

## 8. SEO & Performance

- Shfrytëzo **Next.js** për SEO-friendly pages:
  - Title dhe meta description per faqe.
  - `open graph` tags për faqen e detajeve të veturës (foto kryesore, titull, përshkrim).
- Optimizim për imazhe (përdor `next/image` me sizes/responsive).
- Lazy loading për kartat e veturave dhe seksione të rënda.

---

## 9. Struktura e të Dhënave për Veturat (shembull)

Për demonstraim / JSON / seeding, përdor strukturë të tillë:

```ts
type Car = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: "Diesel" | "Benzin" | "Hybrid" | "Elektrike";
  transmission: "Automatik" | "Manual";
  powerHp?: number;
  color?: string;
  bodyType?: string;
  isNew?: boolean;
  featured?: boolean;
  mainImage: string;
  gallery: string[];
  options?: string[];
  description?: string;
};
