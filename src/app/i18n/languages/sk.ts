export default {
  welcome: 'Lascivné obťažovanie :)',
  welcome_come_back: 'Lascivné obťažovanie',
  click_n_go: 'Kliknite a robte',
  solve_problems:
    'Riešenie problémov jedným kliknutím\nAplikácia na vyhľadávanie umelcov vo vašom meste',
  registration: 'Registrácia',
  have_account_login: 'Už máte účet? Prihláste sa',
  not_have_account_login: 'Žiadny účet? <reg>Zaregistrujte sa teraz</reg>',
  verification_email: 'Kontrola pošty',
  verification_email_description:
    'Na vašu e-mailovú adresu bol odoslaný e-mail s potvrdzujúcim odkazom - <bold>{{email}}</bold>. Ak chcete pokračovať v práci v aplikácii, prejdite na toto prepojenie',
  verification_phone_description:
    'Na váš e-mail - <bold>{{email}}</bold> - bol odoslaný e-mail s potvrdzujúcim odkazom. Ak chcete pokračovať v práci v aplikácii, postupujte podľa tohto odkazu',
  return_auth: 'Späť na prihlásenie',
  search: 'Vyhľadávanie',

  phone_code_sended:
    'Na telefónnom čísle<bold>{{phone}}</bold> bol odoslaný potvrdzovací kód',
  send_code_again: 'Opätovné odoslanie kódu',
  confirm: 'Potvrďte',

  login_variant: {
    email: 'E-mail',
    phone: 'Telefón',
  },

  onboarding: {
    first: {
      title: 'Adresár špecialistov',
      description:
        'Pohodlné vyhľadávanie špecialistov v katalógu s recenziami, ukážkami práce a špeciálnymi cenovými ponukami.',
      image_text:
        'Wow, v mojom meste poskytuje služby toľko odborníkov, že si môžem ľahko vybrať toho najlepšieho. 💥',
    },
    second: {
      title: 'Stvoriť zapnúť',
      description:
        'Vytvorte objednávku, v ktorej uvediete všetky kritériá a požiadavky na prácu a dodávateľa. Získajte relevantné ponuky od špecialistov.',
      image_text:
        'Nestrácam čas hľadaním dodávateľa, len zadám požiadavku a dostanem ponuky od špecialistov. ❤',
    },
    third: {
      title: 'Priama komunikácia',
      description:
        'Відстежую запити клієнтів, спілкуюся з ними, обговорюю умови та пропоную розумну ціну.',
      image_text:
        'Sledujem požiadavky zákazníkov, komunikujem s nimi, diskutujem o podmienkach a ponúkam primeranú cenu. 💥',
    },
  },
  register_variant: {
    customer: {
      title: 'Zákazník',
      description: 'Uľahčite si život! Zverte úlohu našim exekútorom',
    },
    executor: {
      title: 'Interpret',
      description: 'Prijímajte objednávky a zarábajte na našej platforme',
    },
  },
  go: 'Poďme',
  hello_name: 'Lascivné obťažovanie, <bold>{{name}}</bold>',
  search_by_category: 'Vyhľadávanie podľa kategórie',
  select_category: 'Vyberte kategóriu',
  select_subcategory: 'Vyberte podkategóriu',
  select_project: 'Projekt Vibrati',
  next: 'Ďalšie',
  or_sign_in: 'Alebo môžete prísť cez',
  have_account: 'Už máte konto?',
  sign_in: 'Prihlásiť sa',

  profile: 'Profil',
  payment_data: 'Platobné údaje',
  settings: 'Nastavenia',
  help_and_support: 'Pomoc a podpora',
  logout: 'Exit',
  personal_data: 'Osobné údaje',

  customer: 'Zákazník',
  specialist: 'Špecialista',

  inputs: {
    email: 'E-mail',
    title: 'Názov',
    phone_title: 'Telefónne číslo',
    password: 'Heslo',
    name: 'Vaše meno',
    surname: 'Vaše meno',
    gender: 'Vaše pohlavie',
    birthday: 'Dátum narodenia',
    nickname: 'Nick',
    country: 'Krajina a mesto',
    phone_code: {
      title: 'Vyhľadávanie podľa krajiny',
      not_fond: 'Krajina nebola nájdená',
    },
    description: 'Popis',
    about: 'Niečo o mne',
  },
  delete_account: 'Odstránenie účtu',
  edit_profile: 'Upravte svoj profil',

  errors: {
    error: 'Chyba',
    wrong_code: 'nesprávny kód ',
    incorrect_code: 'Zadaný kód je nesprávny ',
    photo_size: 'veľkosť fotografie je príliš veľká ',
    photo_size_index: 'veľkosť {{index}} fotografie je príliš veľká',
    login_used: 'Táto prezývka sa už používa ',
  },

  firebase_error: {
    'auth/app-not-authorized': '',
    'auth/code-expired': 'Platnosť vypršala, skúste to znova ',
    'auth/invalid-verification-code': 'Zadaný neplatný kód ',
    'auth/invalid-phone-number': 'Nesprávny formát telefónneho čísla ',
    'auth/credential-already-in-use':
      'Toto telefónne číslo sa už používa, zadajte iné ',
  },

  validation_error: {
    max_length: 'maximálna dĺžka poľa {{value}} znaky',
    no_empty: 'Pole nemôže byť prázdne',
    email: 'E-mail nie je platný',
    phone: 'Telefónne číslo je nesprávne',
    password: 'Krátke heslo',
    discount_max: 'Zľava nemôže byť vyššia 99%',
    min: '',
    max: '',
    choose_grade: 'Trieda',
    coordinates: 'Aktualizujte svoju polohu',
  },

  toasts: {
    success: 'Úspech!',
    phone_change: 'Vaše telefónne číslo bolo úspešne zmenené',
    change_profile: 'Váš profil bol úspešne aktualizovaný',
    response_sended: 'Odpoveď bola úspešne odoslaná',
    report_sended: 'Správa bola úspešne odoslaná',
    data_successfully_updated: 'Údaje boli úspešne aktualizované',
    active_projects: 'Konto s aktívnymi projektmi nie je možné vymazať',
    file_downloaded: 'Nahraný súbor',
    file_folder: 'Skontrolujte priečinok s prevzatými súbormi',
    hashtag_added: 'Značka predložená na preskúmanie',
    favorite_added: 'Úspešne pridané do obľúbených položiek',
    favorite_removed: 'Úspešne odstránené z obľúbených položiek',
    publication_responses: 'Úspešne ste odpovedali na príspevok',
  },
  empty: {
    profile_hashtag: 'Vo vašom profile nie sú žiadne značky',
    chat_list: 'Nemáte žiadne aktívne chaty',
    feedback: 'Nie sú žiadne recenzie',
    google_place: 'Začnite písať a vyhľadajte mesto',
    projects: {
      active: 'Nemáte žiadne aktívne projekty',
      completed: 'Nemáte žiadne dokončené projekty',
      draft: 'Nemáte žiadne projekty vo forme návrhu',
      requisitions: 'Nemáte žiadne požiadavky na projekt',
      in_progress: '',
    },
    user: {
      description: 'Pridanie popisu do vášho profilu',
      skill_box:
        'Skills Box je príležitosť zarobiť si peniaze navyše na Click & Do na projektoch, ktoré sa vám páčia',
      special_offers: 'Pridajte jedinečné a časovo obmedzené ponuky.',
      publication: 'Pridané príspevky sa zobrazia v zdieľanom kanáli.',
      reviews: 'Zatiaľ pre vás nie sú žiadne recenzie',
      additional_info:
        'Dokončite krátke prispôsobenie pridaním dôležitých informácií o vás ako profesionálovi.',
    },
  },

  coming_soon: 'Už čoskoro',
  subscribers: 'Odberatelia',
  likes: 'Páči sa mi to.',
  price: 'Cena',
  price_without_discount: 'Cena bez zľavy',
  discount_percentage: 'Percento zľavy',
  dislikes: 'Nemať rád',
  more: 'Viac na',
  hide: 'Skryť',
  specialist_skills: 'Odborné zručnosti',
  specialist_skills_description:
    'Aktualizácia vašich zručností v aplikácii Skillbox vám môže pomôcť získať požadovanú prácu',
  main_specialization: 'Hlavná špecializácia',
  additional_skills: 'Ďalšie zručnosti',
  skills_search: 'Vyhľadávanie zručností',
  up_to_skills: 'Na {{value}} zručnosti',
  show_all_skills: 'Zobraziť všetky zručnosti',
  show_less_skills: 'Ukážte menej zručností',

  publications: 'Publikácie',
  previous: 'Predchádzajúci',
  of: 'з',
  special_offers: 'Špeciálne ponuky',
  through: 'prostredníctvom stránky .',
  until: 'na',
  from: 'Od',
  before: 'Pre',
  from_price: 'z adresy <color>{{currency}}{{price}}</color>',
  job_reviews: 'Spätná väzba na prácu',
  completed_count: 'Dokončené ({{count}})',
  current_count: 'Aktuálne({{count}})',
  customer_projects: 'Projekty',
  customer_description: 'Popis',
  customer_reviews: 'Recenzie',
  hour: 'rok.',
  hour_count: {
    one: 'hodina',
    two: 'hodiny',
    other: 'hodiny',
  },
  photo: {
    camera: 'Otvorte fotoaparát',
    gallery: 'Otvorte galériu',
  },

  additional_information: 'Ďalšie informácie',
  languages: 'Znalosť jazykov',
  language: 'Jazyk.',
  native: 'Native',
  conversational: 'Hovorová',
  verification: 'Overovanie',
  proven: 'Overené',
  yes: 'Áno',
  no: 'Nie',
  education: 'Vzdelávanie',
  work_experience: 'Pracovné skúsenosti',
  ukrainian: 'Ukrajinský',
  english: 'Angličtina',
  slovak: 'Slovenský',
  skill_box: 'Box zručností',
  save: 'Uložiť',
  cancel: 'Zrušiť',

  only_auth_data:
    'Tieto údaje sa používajú len na účely autorizácie. Ostatní používatelia ich nebudú môcť vidieť',
  add_account: 'Pridanie účtu',
  language_and_level: 'Jazyk a úroveň znalosti',
  select_language: 'Výber jazyka',
  proficiency_level: 'Úroveň odbornej spôsobilosti',

  lang_level: {
    base: 'Základné',
    base_description: 'Dokážem komunikovať v základných frázach',
    conversational: 'Hovorová',
    conversational_description: 'Jazyk ovládam celkom dobre',
    carrier: 'Médiá',
    carrier_description: 'Mám obrovskú slovnú zásobu',
    native: 'Native',
    native_description: 'Môj rodný jazyk',
  },
  add: 'Pridať',
  skip: 'Vynechať',
  verify: 'Skontrolujte stránku .',
  series: 'Séria',
  number: 'Číslo',
  id: 'ID',
  photo_confirmation: 'Potvrdenie fotografie',
  passport_photo: 'Pasová fotografia',
  passport_photo_desc:
    'Veľkosť súboru by mala byť od 10 do 5120 KB vo formáte jpg/jpeg/png',

  i_agree_p_t:
    'Súhlasím s<black>{{policy}}</black> та <black>{{terms}}</black>',
  company_policy: 'Politika spoločnosti',
  terms_personal_data_processing: 'Podmienky spracovania osobných údajov',
  educational_institution: 'Vzdelávacia inštitúcia',
  name_institution: 'Názov inštitúcie',
  study_period: 'Obdobie štúdia',
  specialization: 'Špecializácia.',
  enter_specialization: 'Zadajte svoju špecializáciu',
  study_area: 'Oblasť štúdia',
  select_area: 'Vyberte oblasť',
  add_description: 'Pridať popis',
  add_description_placeholder: 'Vymyslite opis',
  to: 'Pre',

  work: 'Práca',
  company_you_work: 'Spoločnosť, pre ktorú ste pracovali',
  company_name: 'Názov spoločnosti',
  select_location: 'Výber miesta',
  select_location_range: 'Zadajte rozsah',
  select_your_location: 'Vyberte miesto, kde pracujete',
  position_held: 'Zastávaná pozícia',
  job_title: 'Názov pozície',
  period_work_in_company: 'Obdobie práce v spoločnosti',
  still_working: 'Stále pracuje',
  still_learning: 'Stále sa učím.',

  title: 'Názov',
  current_time: 'aktuálny čas',

  my_projects: 'Moje projekty',

  tabs_list: {
    requisitions: 'Aplikácie',
    in_progress: 'V práci',
    active: 'Aktívne',
    draft: 'Návrhy',
    completed: 'Dokončené',
  },

  project_name: 'Názov projektu',
  come_up_project_name: 'Vymyslite názov pre svoj projekt',
  examples_names: 'Príklady názvov',
  examples_names_1: 'Rozdať 500 letákov',
  examples_names_2: 'Vytvorenie webovej stránky online obchodu',
  examples_names_3: 'Pomoc pri nákladnej doprave',

  description: 'Popis',
  add_description_in_task: 'Pridanie popisu k úlohe',
  hashtags: 'Hashtagy',
  select_hashtag_in_task: 'Výber hashtagov pre úlohu',
  select_interest_in_project: 'Výber záujmov pre projekt',
  photos: 'Fotografie.',
  attach_files_100mb: 'Pripojte súbory s celkovou veľkosťou do 100 MB',
  additional_services: 'Ďalšie služby',
  name_of_service: 'Zadajte názov služby',
  select_additional_service: 'Vyberte ďalšiu službu',

  project_details: 'Podrobnosti o projekte',
  start_date_project: 'Dátum začiatku projektu',
  end_date_project: 'Dátum ukončenia projektu',
  relevance_date_project: 'Dátum relevantnosti projektu',
  remote_work: 'Práca na diaľku',
  project_budget: 'Rozpočet projektu',

  currency: {
    uah: 'Hrivna',
    usd: 'Dolár',
    pln: 'Zlotý',
    eur: 'Euro',
  },
  unspecified: 'Nie je definované',
  publish: 'Publikovať',
  save_in_draft: 'Uložiť ako návrh',
  offer_published: 'Váš návrh bol zverejnený',
  offer_held: 'Váš návrh bol uložený do návrhov',
  offer_published_description: 'Čoskoro na ňu začnú odpovedať aj účinkujúci',
  responded: 'Odpovedal.',
  project: 'Projekt.',
  interests: 'Záujmy.',
  job_screen_tab: {
    description: 'Popis',
    responses: 'Návrhy',
    specialists: 'Špecialisti',
  },

  send: 'Odoslať',
  send_response: 'Odoslať žiadosť',
  go_to_response: 'Prejsť na žiadosti',
  responses: 'Dotazy',
  total_responses: 'Celkom: {{value}} požiadavky',
  today: 'Dnes.',
  yesterday: 'Včera',
  take_the_job: 'Prijať ponuku',
  contact: 'Kontakt',

  filter_results: 'Filtrovanie výsledkov',
  category: 'Kategória',
  categories: 'Kategórie',
  work_cost: 'Náklady na prácu',
  rating: 'Hodnotenie',
  contact_specialist: 'Kontaktujte odborníka',
  send_message: 'Odoslať správu',
  tag_search: 'Vyhľadávanie podľa značiek',
  nickname_search: 'Vyhľadávanie podľa prezývky',
  mark_completed: 'Označiť ako hotové',
  waiting_customer: 'Čaká sa na dokončenie zo strany klienta',
  leave_review: 'Zanechať recenziu',
  quality: 'Kvalita',
  professionalism: 'Profesionalita',
  cost: 'Náklady',
  contactability: 'Kontaktovateľnosť',
  deadlines: 'Podmienky',
  title_review: 'Zadajte názov recenzie',
  text_review: 'Zadajte text recenzie',

  filter_projects: 'Filtrovanie projektov',
  report: 'Správa',
  edit_project: 'Úprava projektu',
  delete_project: 'Odstrániť projekt',
  freeze_project: 'Zmrazenie projektu',
  unfreeze_project: 'Rozmrazenie projektu',
  my_calendar: 'Môj kalendár',
  new_requests: 'Nové požiadavky',
  publication: 'Publikácia',
  special_offer: 'Špeciálna ponuka',
  new_publication: {
    title: 'Nová publikácia',
    edit: 'Upraviť príspevok',
    add_title: 'Pridanie mena',
    add_description: 'Pridanie popisu k príspevku',
    price: 'Približná cena',
    likes: {
      title: "Odstránenie značiek 'Páči sa mi to'",
      subtitle: 'Skryť počet lajkov pod príspevkom',
    },
    places: 'Lokality',
    button: 'Publikovať',
    success: {
      title: 'Váš príspevok bol uverejnený',
      subtitle: 'Objavila sa na vašej stránke a vo všeobecnom kanáli',
    },
  },
  canceled_by_customer: 'Zrušené zákazníkom',
  price_negotiable: 'Cena je dohodou',
  enter_report_text: 'Zadajte text správy',
  set_up_now:
    'Nastavte si ho teraz a začnite dostávať objednávky na svoje obľúbené témy',
  create_offer: 'Vytvorenie ponuky',
  how_start: 'Ako začať',
  offer_steps: {
    creation: {
      title: 'Vytvorenie',
      description:
        'Nastavte si ho teraz a začnite dostávať objednávky na svoje obľúbené témy',
    },
    consideration: {
      title: 'Recenzia',
      description:
        'Pred uverejnením vás budeme informovať, ak je s publikáciou niečo v neporiadku.',
    },
    sale: {
      title: 'Predaj',
      description:
        'Používatelia môžu vidieť vašu ponuku a môžete ju tiež zverejniť na svojich sociálnych sieťach.',
    },
  },
  faq_title: 'FAQ o špeciálnych ponukách',
  read_more: 'Prečítajte si viac',
  faq: {
    check: {
      title: 'Ako kontrolujeme projekty',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    },
    commission: {
      title: 'Čo nie je v poriadku s komisiou na stránke Click & Do',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    },
    tips: {
      title: 'Tipy na zlepšenie špeciálnej ponuky',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    },
    evaluation: {
      title: 'Hodnotenie špeciálnych ponúk',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    },
  },
  collapse: 'Zrútenie',
  offer: {
    title: 'Špeciálna ponuka',
    benefit: 'Povedzte klientovi, čo ponúkate a aký z toho bude mať prospech.',
    create_title: 'Vymyslite názov ponuky',
    category: 'Kategória ponuky',
    interest: 'Podkategória ponuky',
    write_tags: 'Napísať značky',
    tags_description:
      'Začnite písať, ak chcete prehľadávať a vyberať značky. Ak požadovaná značka neexistuje, stlačte kláves Enter a pridajte vlastnú značku',
    tags_description_edit:
      'Vyberte značky, ktoré chcete zverejniť, z tých, ktoré boli pridané do vášho profilu',
    add_tags: 'Pridať značky',
    price_setting: 'Stanovenie ceny',
    price_description: 'Pridanie cenového rozpätia',
    terms: 'Podmienky ponuky',
    expiration_date: 'Dátum skončenia platnosti',
    up_to_20: 'Pridať až 20 súborov, každý s veľkosťou do 10 MB',
    attach_photo: 'Priložte fotografiu',
    supported_formats: 'Podporované formáty:',
    formats: 'PNG, JPEG, HIEC, MP4',
    description_title: 'Opis ponuky',
    description_sub: 'Stručne vysvetlite, čím sa vy a váš projekt odlišujete',
    description_placeholder: 'Vymyslite opis',
    success: 'Úspešne vytvorená špeciálna ponuka',
  },
  skillbox: {
    title: 'Box zručností',
    promo: 'Vytvorte pole zručností zvýraznením svojich zručností',
    create: 'Vytvorenie poľa zručností',
    success: 'Pole zručností úspešne vytvorené',
  },
  describe_workflow: 'Opíšte pracovný postup',
  describe_workflow_description:
    'Popíšte svoj návrh, aké materiály používate a podrobne opíšte svoj pracovný postup',
  duration: 'Trvanie',
  duration_process: 'Zadajte trvanie procesu',
  set_duration: 'Nastavenie trvania (v hodinách)',
  add_photos: 'Pridať fotografie',
  hours: 'Hodiny',
  set_price: 'Nastavenie ceny',
  discount: 'Zľava',
  initial_price: 'Počiatočná cena',
  total_price: 'Celková cena',
  personal_invite: 'Osobná pochôdzka',
  message: 'Správy',
  no_internet_connection: 'Žiadne internetové pripojenie',
  restart_app: 'Reštartovanie aplikácie',
  sort_by: 'Zoradiť podľa',
  old_to_new: 'Od starého k novému',
  new_to_old: 'Od nového k starému',
  choose_lang: 'Výber predvoleného jazyka',
  comments: 'Komentáre',
  comment_placeholder: 'Napíšte svoj komentár',
  same_publications: 'Príspevky tohto používateľa',
  price_range: 'Cenové rozpätie',
  offer_deadline: 'Lehota na predloženie ponuky',
  up_to_hours: 'do {{hours}} hodín',
  approximate_price: 'Približná cena',
  search_by_publication: 'Vyhľadávanie podľa publikácií',
  subscribers_quantity: '{{value}} predplatitelia',
  subscribe: 'Prihlásiť sa na',
  unsubscribe: 'Odhlásiť sa z odberu',
  to_favorites: 'K obľúbeným položkám',
  from_favorites: 'Z obľúbených',
  enroll: 'Zapísať sa na',
  commencement: 'Začiatok',
  termination: 'Ukončenie',
  ad_relevance: 'Relevantnosť inzerátu',
  online: 'Online',
  offline: 'Offline',
  no_messages: 'Žiadne správy',
  write_message: 'Napíšte správu',
  no_hashtag: 'Nie je tam žiadny hashtag, kliknite a pridajte ho',
  no_hashtag_customer: 'Takýto hashtag neexistuje',
  pdf_file: 'PDF Súbor',
  files: 'Súbory',
  file: 'Súbor',
  project_statuses: {
    searching: 'Nové oznámenie',
    in_progress: 'V práci',
    mark_done: 'Čakanie na odpoveď zákazníka',
    done: 'Hotovo',
    hold: 'Zrušené zákazníkom',
    pending_specialist: 'Čakanie na prijatie pozvania',
    canceled: 'Zrušené',
    rejected_by_specialist: 'Zrušené špecialistom',
  },
  select: 'Dopyt',
  all: 'Všetky',
  address: 'Adresa',
  enter_address: 'Zadajte adresu',
  invite_specialist: 'Pozvite odborníka',
  invite_specialist_sended: 'Pozvánka bola zaslaná odborníkovi.',
  refuse: 'Odpadky',
  user_verification_statuses: {
    unverified: 'Neoverené',
    pending: 'Čakáme na potvrdenie správy',
    approved: 'Schválené',
    rejected: 'Neoverené',
  },
  favorites: {
    title: 'Obľúbené stránky',
    total: 'Všetci obľúbení: {{value}}',
  },
  edit: 'Upraviť',
  sign_up: 'Zaregistrujte sa',
  date: 'Dátum',
  activity: 'Aktivita',
  content_type: 'Typ obsahu',
  apply: 'Aplikovať',
  accept: 'Prijať',
  reject: 'Odmietnuť',
  left_request: 'zanechal žiadosť',
  service_name: 'Názov služby',
  date_and_time: 'Dátum a čas',
  inactive: 'Neaktívne',
  desired_cost: 'Požadované náklady',
  soon_as_possible: 'Čo najskôr',
  short_name_offer: 'Krátky názov ponuky',
  write_your_experience:
    'Opíšte svoje skúsenosti, odhadovaný časový rámec na dokončenie úlohy a ďalšie informácie, ktoré môžu byť pre klienta užitočné',
  price_offer: 'Cenová ponuka',

  favorites_filters: {
    all: 'Všetky',
    specialists: 'Špecialisti',
    special_offers: 'Špeciálne ponuky',
    skillbox: 'Skilbox',
    publications: 'Publikácie',
  },
  short_name_project: 'Krátky názov ponuky',
  location: 'Umiestnenie.',
  days: {
    one: 'deň',
    two: 'dni',
    other: 'dni',
  },
  weeks: {
    one: 'týždeň',
    two: 'týždňa',
    other: 'týždne',
  },
  month: {
    one: 'mesiac',
    two: 'mesiace',
    other: 'mesiace',
  },
  specialist_works: 'Práce',
  specialist_information: 'Informácie.',
  announcement_type: 'Typ inzerátu',
  list_filter: {
    skillbox: 'Box zručností',
    publication: 'Publikácie',
    'special-offer': 'Špeciálne ponuky',
  },
  sorting: 'Triedenie',
  date_submission: 'Dátum predloženia',
  date_relevance: 'Dátum relevantnosti',
  reset: 'Obnovenie',
  date_value: {
    anyDate: 'Ktorýkoľvek dátum',
    today: 'Dnes',
    yesterday: 'Včera',
    tomorrow: 'Zajtra',
    thisWeek: 'Tento týždeň',
    thisMonth: 'Tento mesiac',
    everythingDayBefore: 'Všetko, čo sa stalo deň predtým',
    select: 'Vyberte dátum',
  },
  find_location: 'Vyhľadanie lokality',
  location_list: {
    nearby: 'V blízkosti',
    neighbors: 'Susedia',
    city: 'V meste',
    city_region: 'Mesto a región',
    nearest_distant: 'Najbližšie vzdialené',
    whole_world: 'Celý svet',
    kyiv: 'Kyjev, Ukrajina',
    london: 'Londýn, Spojené kráľovstvo',
    paris: 'Paríž, Francúzsko',
    madrid: 'Madrid, Španielsko',
    berlin: 'Berlín, Nemecko',
    rome: 'Rím, Taliansko',
  },
  km: '{{value}} km',
  reply_to: 'Odpoveď',
  base_currency: 'Základná mena',
  response: 'Ponuka',
  create: 'Vytvoriť stránku',
  open: 'Zobraziť podrobnosti',
  go_map: 'Prejsť na mapu',
  notification_empty: 'Nemáte žiadne oznámenia',
  show_more: 'Zobraziť viac ({{value}})',
  report_project: 'Sťažovať sa na projekt',
  agree_logout: 'Určite chcete odísť?',

  home_empty_hashtags: 'Žiadne žiadosti zodpovedajúce vašim zručnostiam',
  add_skills: 'Pridať zručnosti',
  show_all_request: 'Zobraziť všetky projekty',
  waiting_approve_response: 'Čakanie na prijatie ponuky',
  you_end_work_project: 'Ste dokončili projekt?',
  modal_go_back:
    'Určite sa chcete odhlásiť? Všetky údaje na stránke budú vymazané',
}
