// SRBIJA

- API Layer - Koristimo kao posrednik u komunikaciji kodom i db-om.

- Ako koristimo REACT Server Components (da se podaci fetchuju na serverju) onda API sloj mozemo da preskociomo i upit radimo direkt nad bazom

- Next.js nam omogucava da kreiramo API endpointe pomocu [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) (route.ts)

PITANJE: U kom scenariju necemo koristi direktan upit nad bazom?

- Kada dohvatamo podatke koristeci `use client` da ne bismo exposovali db secret

Server Components (SC):

- Podrzava JS Promise
- Ne treba nam useEffect/useState, moze samo async/await
- SC se pokrecu na serveru tako da mozemo da zadrzimo spuka dohvatanja i logiku na serveru, a korisniku da posaljemo rezultat
- Posto se SC pokrecu na serveru, mozemo da radimo direktno upit bez dodatnog API lejera. Ово вас штеди од писања и одржавања додатног кода.

// SRBIJA
Request Waterfall

- Tokom izvrsavanja upita, zahtevi podataka (data requests) blokiraju se nenamerno, stvarajuci "request waterfall"
- Po defaultu, Next.js унапред рендерује руте (pre-render) ради побољшања перформанси, то се зове статичко приказивање. Дакле, ако се ваши подаци промене, то се неће одразити на контролној табли.
  - Sta je request waterfall?
    - "waterfall" Ukazuje na sekvencu u mreznim zahtevima i on zavisi od zavrsetka prethodnog zahteva. U slucaju dohvatanje podataka, svaki sledeci request moze da pocne tek onog trenutka kada se prethodni zavrsi

Parallel data fetching

- Uobicajan nacin da izbegnemo waterfalls je da iniciramo sve zahteve u isto vreme - paralelno
- U js-u za to koristimo `Promise.all()` ili `Promise.allSetled()`
  Primer: /app/lib/data.ts fetchCardData
- Koriscenjem ovog patterna svi pozivi se izvrsavaju istovremeno

// srbija
Static and Dynamic Rendering

- What is Static Rendering === SSG
  - SR znaci da se svi podaci i HTML stranice generisu u napred na serveru pre nego sto korisnik psoeti sajt.
    To se desava:
  1. Prilikom build-a (deploy sajta)
  2. Kada se radi revalidate data - Npr ako sajt koristi neku vrst kesiranja ili osvezivanja sadrzaja
     Kada korisnik poseti sajt, on ne traziu novu verziju stranice sa servera, vec dobije sadrzaj iz kesa

PREDNOSTI:

1. Brzi Sajtovi

- Prerenderovan sadrzaj se moze kesirati i distrbuirati globalno
- Brzo ucitavanje stranice

2. Smanjen server load

- Srv ne mora svaki put da generise stranicu

3. SEO

- Stranice su vec ispisane HTML-om kada se ucitaju
- Pretrazivaci lako indeksiraju sadrzaj sto poboljsava rangiranje

Kada je korisno:

1. Kada stranica nema često menjajuće podatke.
2. Kada svi korisnici vide isti sadržaj, npr.: Blog postovi
   Proizvodi u online prodavnici

Kada NIJE idealno:

- Kada je potrebna personalizacija i često osvežavanje, npr.:

1. Dashboard sa ličnim podacima 2. Statistike koje se stalno menjaju

- What is Dynamic Rendering?

Za dinamicko renderovanje sadrzaj se renderuje na server svaki put kada korisnik poseti stranicu

Benefiti su:

  1. Real-Time Data - Omogucava nam da prikazemo real time podatke. Idealno za aplikacije gde se podaci menjaju cesto
  2. User-Specific Content - Лакше је служити персонализовани садржај, као што су dashboard или user profile, и ажурирати податке на основу интеракције korisnika
  3. Request Time Information - Dozvoljava nam da pristupimo informaciji koja moze biti poznata samo u trenutku zahteva kao sto je cookie ili url search param

STA JE STREAMING?
  - Je tehnika transferovanja podataka koja nam omogucava da rute razbijemo na manje "cankove" i da ih postepeno strimujemo sa servera do klijenta kada budu spremne
  - Uz pomoc strimovanja, mozemo da spremicemo sporiji data request koji blokira celu stranicu. To omogucava da korisnik vidi i interaktuje sa delovima stranice koja je ucitana
  - Jedna <Componenta /> === Chunk
  
  Postoje dva nacina implementacije:
    1. na page level-u, sa `loading.tsx` - Sto under the hood dodaje <Suspense/>
    2. I na nivou komponente, sa importom <Suspense/> iz react-a

Sta su SERVER ACTIONS?
  - React Server Actions nam omogucava da asinhroni kod pokrenemo direktno na serveru.
  Eliminise potrebu da se kreira API endpoint koji ce da radi mutaciju podataka. Umesto toga, pisemo asinhronu funkciju koja se pokrece na serveru i moze da se pozove ili u Clientskoj ili Serverskoj komponenti
  - Pitanje sigurnostu spada u top prioritete u izradi web aplikacija. Serverske akcije to pokrivaju, oni ukljucju feature kao sto su `encrypted closures`, `strict input checks`, `error message hashing`, `host restrictions` itd. Svi zajedno rade na znacajnom poboljsanju bezbednosti aplikacije
  - U telu asinhrone funkcije koristimo `use server` direktivu i time govorimo da ce kod da se pokrene na serveru ili Da se napravi poseban file `lib/<nesto.ts> i da tu dodamo `use server` i tu skladistimo sve export fn

  ### STORING VALUE IN CENTS - Dobra je i preporucna praksa da se novcane vrednosti cuvaju u manjoj valuti (centi, pare) kako bi se izbegao JS floating point greska i osigura preciznost
	### floating point: 0.1+0.2 = 0.300000000000004

  ## UUIDs vs. Auto-incrementing Keys

  > We use UUIDs instead of incrementing keys (e.g., 1, 2, 3, etc.). This makes the URL longer; however, UUIDs eliminate the risk of ID collision, are globally unique, and reduce the risk of enumeration attacks - making them ideal for large databases.

  > However, if you prefer cleaner URLs, you might prefer to use auto-incrementing keys.