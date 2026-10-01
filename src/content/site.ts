import type { SceneKey } from '../components/scenes/scenes'

export const nav = [
  { label: 'The Experience', href: '#experience' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'For Families', href: '#families' },
  { label: 'For Partners', href: '#partners' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
]

export type Chapter = { chapter: string; title: string; label: string; copy: string; scene: SceneKey }

/** Section 03 — the wedding, reimagined. Chapter names map to the homepage scroll story. */
export const chapters: Chapter[] = [
  { chapter: 'The Place', label: 'Venue', title: 'Begin with where.', scene: 'venue', copy: 'Palace courtyards, temple halls, beachfront lawns, heritage havelis. We help you find the place that already feels like your family, then hold it together with layouts, access and timings.' },
  { chapter: 'The Table', label: 'Food', title: 'A meal people remember.', scene: 'table', copy: 'Menus shaped by your community, your elders and your guests’ appetites. Chefs, tastings, live counters and service teams planned as one.' },
  { chapter: 'The Celebration', label: 'Decor', title: 'Rooms that change the light.', scene: 'decor', copy: 'Florals, fabric, lighting and structure designed together, so the mandap, the stage and the dining hall feel like a single idea.' },
  { chapter: 'The Celebration', label: 'Entertainment', title: 'Music that moves the room.', scene: 'music', copy: 'Musicians, DJs, choreographers and performers sequenced to the evening rather than merely booked for it.' },
  { chapter: 'The Details', label: 'Photography', title: 'Remembered, not just recorded.', scene: 'lens', copy: 'Photographers and filmmakers working from a shot list the family wrote, including the relatives who dislike cameras.' },
  { chapter: 'The People', label: 'Hospitality', title: 'A welcome at every door.', scene: 'hospitality', copy: 'Room blocks, arrival desks, dietary notes and quiet corners, all planned before the first guest lands.' },
  { chapter: 'The Journey', label: 'Transportation', title: 'Everyone, there on time.', scene: 'car', copy: 'Airport and station pickups, hotel transfers, baraat logistics and a car for the couple, run from one timetable.' },
  { chapter: 'The People', label: 'Guest Experience', title: 'Every guest, expected.', scene: 'welcome', copy: 'Invitations, RSVPs, itineraries and a concierge line. Hundreds of people, each of them looked after.' },
  { chapter: 'The Orchestration', label: 'Planning', title: 'The plan behind the plan.', scene: 'planning', copy: 'Timelines, budgets, ritual schedules and contingencies, kept somewhere the whole family can see them.' },
  { chapter: 'The Orchestration', label: 'Coordination', title: 'One call, not forty.', scene: 'coordination', copy: 'A wedding manager in constant conversation with every vendor, so that you are not.' },
  { chapter: 'The Details', label: 'Gifting', title: 'Small things, said well.', scene: 'gift', copy: 'Invitations, trousseau, return gifts and hampers made by independent craftspeople and curated together.' },
  { chapter: 'The Afterwards', label: 'Honeymoon', title: 'After the last guest leaves.', scene: 'honeymoon', copy: 'Travel and stays for the two of you, planned by the team that already knows how you like to be looked after.' },
]

export const statement = ['A wedding is not a day.', 'It is a thousand little moments,', 'brought together into one memory.']

export const ecosystemNodes = [
  'Venues', 'Catering', 'Decor', 'Event Management', 'Photography & Films', 'Makeup & Styling', 'Hotels & Stays',
  'Transportation', 'Entertainment', 'Guest Logistics', 'Invitations', 'Gifts', 'Honeymoon & Travel', 'Special Experiences',
]

export const timeline = [
  { name: 'Vision', copy: 'We listen first: your families, your traditions, your budget, the feeling you want the week to have.' },
  { name: 'Discovery', copy: 'Venues, vendors and ideas explored against that brief, not against a catalogue.' },
  { name: 'Curation', copy: 'A considered shortlist from independent businesses. Fewer, better choices.' },
  { name: 'Quotation', copy: 'Itemised scope and pricing from each partner, compared on equal terms.' },
  { name: 'Booking', copy: 'Structured agreements, defined terms and secure payments, in one place.' },
  { name: 'Planning', copy: 'A master timeline, budget, floor plans and guest lists the family can see.' },
  { name: 'Coordination', copy: 'Every vendor briefed and aligned, week after week, by one team.' },
  { name: 'Execution', copy: 'On-ground teams run the wedding week to the minute.' },
  { name: 'Celebration', copy: 'You are present. That is the whole point.' },
  { name: 'Farewell', copy: 'Departures, closing accounts and a proper goodbye to every guest.' },
]

export type Tradition = { name: string; copy: string; scene: SceneKey }
export const traditions: Tradition[] = [
  { name: 'South Indian temple wedding', scene: 'temple', copy: 'Early muhurtham, temple schedules and a ritual order that cannot slip.' },
  { name: 'Tamil wedding', scene: 'kolam', copy: 'Leaf-served feasts, nadaswaram, and ceremonies timed to the hour.' },
  { name: 'Kerala wedding', scene: 'kerala', copy: 'Quiet silk, a morning ceremony, a sadya that is part of the ritual.' },
  { name: 'North Indian wedding', scene: 'venue', copy: 'Haldi, mehendi, sangeet, pheras: days of events, each with its own room.' },
  { name: 'Punjabi wedding', scene: 'punjab', copy: 'A baraat arriving in full voice, and a dance floor that fills early.' },
  { name: 'Bengali wedding', scene: 'bengal', copy: 'Alpona, conch shells and a ritual vocabulary entirely its own.' },
  { name: 'Christian wedding', scene: 'christian', copy: 'A church ceremony and a reception that carries a family’s own songs.' },
  { name: 'Destination wedding', scene: 'destination', copy: 'An entire guest list relocated: flights, stays, itineraries, weather plans.' },
  { name: 'Contemporary intimate wedding', scene: 'intimate', copy: 'Forty people, one long table, nothing performed for the camera.' },
  { name: 'Grand multi-day celebration', scene: 'multiday', copy: 'Many events, many venues, many generations. One timeline.' },
]

export type DayEvent = { time: string; next?: boolean; title: string; copy: string; team: string; scene: SceneKey; tone: number }
export const dayEvents: DayEvent[] = [
  { time: '06:30', title: 'Morning guest arrivals', copy: 'Arrival desks at the airport and station greet the first families. Transfers leave on a fixed rotation.', team: 'Guest Experience · Transportation', scene: 'journey', tone: 0 },
  { time: '09:30', title: 'Hotel check-in', copy: 'Rooms were allocated weeks ago. Welcome kits wait at the desk, dietary notes are already with the kitchen.', team: 'Hospitality Coordinator', scene: 'hospitality', tone: 0.04 },
  { time: '10:30', title: 'Breakfast', copy: 'A regional breakfast, timed to the arrival wave rather than the hotel’s default.', team: 'Hospitality · Catering', scene: 'table', tone: 0.08 },
  { time: '11:00', title: 'Bridal preparation', copy: 'Makeup, draping and jewellery run to a minute-by-minute sheet, in a room that stays calm.', team: 'Makeup & Styling · Family Concierge', scene: 'silk', tone: 0.12 },
  { time: '12:00', title: 'Family coordination', copy: 'Who stands where, who fetches whom, which elder needs which ritual item. One conversation, one place.', team: 'Family Concierge', scene: 'family', tone: 0.16 },
  { time: '13:00', title: 'Venue setup', copy: 'Decor, lighting, sound and seating finalised against the floor plan, with a walk-through at the end.', team: 'Event Production Team', scene: 'decor', tone: 0.22 },
  { time: '14:30', title: 'Catering preparation', copy: 'Kitchens set to the tasting-approved menu. Service staff briefed on sequence and on dietary flags.', team: 'Vendor Coordinator · Catering', scene: 'flowers', tone: 0.28 },
  { time: '15:30', title: 'Photography', copy: 'Portraits and family groupings from a shot list the family wrote themselves.', team: 'Photography & Films', scene: 'lens', tone: 0.36 },
  { time: '17:00', title: 'Ceremony', copy: 'The muhurtham is held to the minute. Vendors go quiet; the ritual leads.', team: 'Wedding Manager', scene: 'mandap', tone: 0.46 },
  { time: '18:30', title: 'Guest movement', copy: 'Shuttles run between hotel and venue. Elders are seated first, guests are guided, nobody is left wondering.', team: 'On-Ground Support', scene: 'welcome', tone: 0.54 },
  { time: '19:30', title: 'Reception', copy: 'Dinner served in waves so the room never queues. The stage is handed to the family.', team: 'Event Production · Catering', scene: 'night', tone: 0.64 },
  { time: '21:00', title: 'Entertainment', copy: 'Live music into a DJ set, sequenced to the energy of the room and the sound limits of the venue.', team: 'Entertainment Providers', scene: 'celebration', tone: 0.72 },
  { time: '22:30', title: 'Luxury couple transfer', copy: 'A car, a driver, a quiet exit. Nothing to explain to anyone.', team: 'Transportation Providers', scene: 'car', tone: 0.8 },
  { time: '23:30', title: 'After-party', copy: 'A lounge for the late crowd, with a hard stop and a ride home for everyone.', team: 'Event Production · Entertainment', scene: 'multiday', tone: 0.88 },
  { time: '01:00', title: 'Guest return', copy: 'Last shuttles, head counts, elders first. A message to the family that everyone is back.', team: 'Guest Experience · Transportation', scene: 'night', tone: 0.94 },
  { time: '10:00', next: true, title: 'Farewell', copy: 'Check-outs, departures, thank-yous and final accounts. A proper goodbye.', team: 'Wedding Manager · Hospitality', scene: 'honeymoon', tone: 1 },
]

export const roles = [
  { title: 'Wedding Manager', copy: 'Your single point of coordination, from the first conversation to the farewell.' },
  { title: 'Family Concierge', copy: 'Looks after the elders, the rituals and the hundred small requests no one writes down.' },
  { title: 'Vendor Coordinator', copy: 'Briefs, aligns and follows up with every independent business on your wedding.' },
  { title: 'Guest Experience Manager', copy: 'Invitations, RSVPs, itineraries, and a guest line that someone actually answers.' },
  { title: 'Hospitality Coordinator', copy: 'Rooms, meals, welcome kits and the quiet details of being a good host.' },
  { title: 'Event Production Team', copy: 'Builds, lights and runs the spaces, and resets them between events.' },
  { title: 'On-Ground Support', copy: 'Present at every venue, hotel and pickup point, solving problems before they are seen.' },
]

export const familyPoints = [
  'One point of coordination', 'Centralised planning', 'Vendor coordination', 'Guest logistics', 'Budget visibility',
  'Event timelines', 'Support before and during the celebration', 'Personalised planning', 'Tradition-aware planning', 'Destination coordination',
]

export const partnerTypes = [
  'Caterers', 'Decorators', 'Event managers', 'Photographers', 'Hotels', 'Venues', 'Makeup artists',
  'Transportation providers', 'Entertainment providers', 'Wedding designers', 'Gift providers', 'Travel partners', 'Specialty wedding businesses',
]

export const partnerSteps = [
  { n: '01', title: 'Register your business', copy: 'Create a partner profile for your company.' },
  { n: '02', title: 'Submit business information', copy: 'Legal and business details, held securely.' },
  { n: '03', title: 'Define services and locations', copy: 'What you offer, where you work, at what scale.' },
  { n: '04', title: 'Showcase your work', copy: 'A professional portfolio presented with care.' },
  { n: '05', title: 'Receive relevant opportunities', copy: 'Weddings that match your craft and your calendar.' },
  { n: '06', title: 'Manage bookings', copy: 'Structured requests, agreements and schedules.' },
]

export const trust = [
  ['Verified business information', 'Partners will submit legal and business details before they are presented to families.'],
  ['Clear service agreements', 'Every booking sits on a written agreement between the family, the partner and BRIDLYA.'],
  ['Transparent scope', 'What is included, what is not, and who is responsible for what.'],
  ['Defined cancellation terms', 'Stated up front, in plain language, before anything is paid.'],
  ['Structured bookings', 'Requests, quotes and confirmations tracked in one record.'],
  ['Documented responsibilities', 'Run sheets that name who does what, and when.'],
  ['Vendor performance tracking', 'Delivery, punctuality and feedback recorded across weddings.'],
  ['Customer support', 'A named team the family can reach, before and during the celebration.'],
  ['Escalation process', 'A defined path for when something goes wrong, and who owns it.'],
  ['Quality monitoring', 'Standards reviewed continuously, not just at onboarding.'],
  ['Secure payments', 'Payments handled through protected, auditable channels.'],
  ['Clear communication', 'One thread of record instead of forty private chats.'],
]

export const future = [
  'Wedding planning', 'Guest experience', 'Destination travel', 'Honeymoon planning', 'Couple experiences',
  'Family celebrations', 'Anniversaries', 'Private events', 'Hospitality', 'Travel partnerships',
]
