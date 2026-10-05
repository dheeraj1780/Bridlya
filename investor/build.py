import math, json, sys, os
import model

NODE = '/home/user/Bridlya/node_modules'
toc_pages = json.load(open('toc.json')) if os.path.exists('toc.json') else {}

def cr(x, d=1):
    return f'₹{x:,.{d}f} cr'

# ---------- SVG helpers ----------
RED, DEEP, GOLD, INK, SOFT, CH = '#b3261e', '#6f130f', '#b98a2e', '#1c1714', '#5b4f47', '#eadcbc'

def svg_ecosystem():
    nodes = ['Venues', 'Catering', 'Decor', 'Event Mgmt', 'Photo & Films', 'Makeup & Styling', 'Hotels & Stays',
             'Transport', 'Entertainment', 'Guest Logistics', 'Invitations', 'Gifts', 'Honeymoon & Travel', 'Special Experiences']
    cx, cy, R = 300, 255, 185
    s = f'<svg viewBox="0 0 600 510" class="fig">'
    s += f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="{RED}" stroke-opacity=".35" stroke-dasharray="2 5"/>'
    for i, n in enumerate(nodes):
        a = -math.pi / 2 + i / len(nodes) * 2 * math.pi
        x, y = cx + math.cos(a) * R, cy + math.sin(a) * R
        s += f'<line x1="{cx}" y1="{cy}" x2="{x:.1f}" y2="{y:.1f}" stroke="{RED}" stroke-opacity=".45"/>'
        s += f'<circle cx="{x:.1f}" cy="{y:.1f}" r="6" fill="{RED}"/>'
        c = math.cos(a)
        anchor = 'start' if c > .3 else 'end' if c < -.3 else 'middle'
        dx = 12 if c > .3 else -12 if c < -.3 else 0
        dy = 4 if abs(c) > .3 else (-14 if math.sin(a) < 0 else 22)
        s += f'<text x="{x + dx:.1f}" y="{y + dy:.1f}" text-anchor="{anchor}" font-size="12" fill="{INK}" font-family="Inter">{n}</text>'
    s += f'<circle cx="{cx}" cy="{cy}" r="56" fill="{RED}"/><text x="{cx}" y="{cy - 2}" text-anchor="middle" fill="#f7f1e6" font-family="Cormorant Garamond" font-style="italic" font-size="22">Couple</text><text x="{cx}" y="{cy + 22}" text-anchor="middle" fill="#f7f1e6" font-family="Cormorant Garamond" font-style="italic" font-size="22">&amp; Family</text></svg>'
    return s

def svg_funnel():
    rows = [('TOTAL MARKET', 'Weddings & wedding-linked spend in India', '₹4.25–6.5 lakh crore / yr', 'published estimates', 1.0, DEEP),
            ('SERVICEABLE MARKET', 'Premium & large-format weddings in target metros and hubs', '≈ 1.5% of weddings ≈ 150,000 / yr', 'assumption  ·  ≈ ₹37,500 cr at ₹25 L each', .78, RED),
            ('OBTAINABLE SHARE', 'BRIDLYA-coordinated weddings, Year 5 (base case)', '4,000 weddings ≈ 2.7% of serviceable', 'scenario  ·  ≈ ₹1,000 cr GMV', .56, GOLD)]
    s = '<svg viewBox="0 0 600 330" class="fig">'
    for i, (a, b, c, d, w, col) in enumerate(rows):
        y = 10 + i * 105
        x = 300 - 300 * w
        s += f'<rect x="{x}" y="{y}" width="{600 * w}" height="92" fill="{col}"/>'
        tc = '#f7f1e6'
        s += f'<text x="300" y="{y + 22}" text-anchor="middle" font-size="10" letter-spacing="2.4" fill="{tc}" fill-opacity=".8" font-family="Inter">{a}</text>'
        s += f'<text x="300" y="{y + 47}" text-anchor="middle" font-size="19" fill="{tc}" font-family="Cormorant Garamond" font-weight="500">{c}</text>'
        s += f'<text x="300" y="{y + 65}" text-anchor="middle" font-size="10.5" fill="{tc}" fill-opacity=".9" font-family="Inter">{b}</text>'
        s += f'<text x="300" y="{y + 81}" text-anchor="middle" font-size="9.5" fill="{tc}" fill-opacity=".7" font-family="Inter" font-style="italic">{d}</text>'
    return s + '</svg>'

def svg_stacked(name, w=560, h=250):
    data = model.run(name)
    mx = max(r['rev'] for r in data) * 1.12
    s = f'<svg viewBox="0 0 {w} {h}" class="fig">'
    base = h - 38
    for g in range(0, 5):
        y = base - (base - 24) * g / 4
        s += f'<line x1="44" y1="{y}" x2="{w - 10}" y2="{y}" stroke="#1c1714" stroke-opacity=".1"/>'
        s += f'<text x="38" y="{y + 3}" text-anchor="end" font-size="9.5" fill="{SOFT}" font-family="Inter">{mx * g / 4:,.0f}</text>'
    bw = (w - 70) / 5
    for i, r in enumerate(data):
        x = 54 + i * bw + bw * .14
        y = base
        for key, col in (('commission', RED), ('subs', GOLD), ('other', '#d9bd7a')):
            hh = r[key] / mx * (base - 24)
            y -= hh
            s += f'<rect x="{x:.1f}" y="{y:.1f}" width="{bw * .72:.1f}" height="{max(hh, .5):.1f}" fill="{col}"/>'
        s += f'<text x="{x + bw * .36:.1f}" y="{y - 6:.1f}" text-anchor="middle" font-size="10.5" font-weight="600" fill="{INK}" font-family="Inter">{r["rev"]:,.1f}</text>'
        s += f'<text x="{x + bw * .36:.1f}" y="{base + 16}" text-anchor="middle" font-size="10" fill="{SOFT}" font-family="Inter">Year {r["y"]}</text>'
    s += f'<text x="44" y="12" font-size="9.5" fill="{SOFT}" font-family="Inter">Revenue, ₹ crore</text>'
    lx = w - 250
    for j, (lab, col) in enumerate((('Commission & coordination', RED), ('Partner subscriptions', GOLD), ('Other services', '#d9bd7a'))):
        s += f'<rect x="{54 + j * 165}" y="{h - 12}" width="9" height="9" fill="{col}"/><text x="{68 + j * 165}" y="{h - 4}" font-size="9.5" fill="{SOFT}" font-family="Inter">{lab}</text>'
    return s + '</svg>'

def svg_weddings():
    w, h = 560, 230
    sc = {n: model.run(n) for n in model.SCEN}
    mx = 12000
    s = f'<svg viewBox="0 0 {w} {h}" class="fig">'
    base = h - 34
    for g in range(0, 5):
        y = base - (base - 20) * g / 4
        s += f'<line x1="50" y1="{y}" x2="{w - 10}" y2="{y}" stroke="#1c1714" stroke-opacity=".1"/><text x="44" y="{y + 3}" text-anchor="end" font-size="9.5" fill="{SOFT}" font-family="Inter">{mx * g / 4:,.0f}</text>'
    cols = {'Conservative': GOLD, 'Base': RED, 'Ambitious': DEEP}
    for n, d in sc.items():
        pts = [(50 + (w - 70) * i / 4, base - (base - 20) * r['w'] / mx) for i, r in enumerate(d)]
        s += f'<polyline points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="none" stroke="{cols[n]}" stroke-width="2.4"/>'
        for (x, y), r in zip(pts, d):
            s += f'<circle cx="{x:.1f}" cy="{y:.1f}" r="3.4" fill="{cols[n]}"/>'
        x, y = pts[-1]
        s += f'<text x="{x - 8:.1f}" y="{y - 8:.1f}" text-anchor="end" font-size="10.5" font-weight="600" fill="{cols[n]}" font-family="Inter">{n}: {d[-1]["w"]:,}</text>'
    for i in range(5):
        s += f'<text x="{50 + (w - 70) * i / 4:.1f}" y="{h - 14}" text-anchor="middle" font-size="10" fill="{SOFT}" font-family="Inter">Year {i + 1}</text>'
    s += f'<text x="50" y="10" font-size="9.5" fill="{SOFT}" font-family="Inter">Weddings coordinated per year</text></svg>'
    return s

def svg_position():
    s = '<svg viewBox="0 0 600 380" class="fig">'
    s += f'<rect x="60" y="20" width="520" height="310" fill="#fbf8f1" stroke="#1c1714" stroke-opacity=".2"/>'
    s += f'<line x1="320" y1="20" x2="320" y2="330" stroke="#1c1714" stroke-opacity=".12"/><line x1="60" y1="175" x2="580" y2="175" stroke="#1c1714" stroke-opacity=".12"/>'
    items = [(150, 255, 'Wedding directories', 'wide reach · light coordination', SOFT), (145, 90, 'Single-vendor businesses', 'deep craft · narrow scope', SOFT),
             (470, 250, 'Premium full-service planners', 'deep coordination · bespoke, limited scale', SOFT)]
    for x, y, a, b, c in items:
        s += f'<circle cx="{x}" cy="{y}" r="11" fill="{c}" fill-opacity=".55"/><text x="{x}" y="{y + 28}" text-anchor="middle" font-size="12" font-weight="600" fill="{INK}" font-family="Inter">{a}</text><text x="{x}" y="{y + 43}" text-anchor="middle" font-size="9.5" fill="{SOFT}" font-family="Inter">{b}</text>'
    s += f'<circle cx="470" cy="85" r="19" fill="{RED}"/><circle cx="470" cy="85" r="30" fill="none" stroke="{RED}" stroke-opacity=".35"/><text x="470" y="132" text-anchor="middle" font-size="14" font-weight="700" fill="{RED}" font-family="Inter">BRIDLYA</text><text x="470" y="148" text-anchor="middle" font-size="9.5" fill="{SOFT}" font-family="Inter">broad ecosystem · deep coordination · repeatable</text>'
    s += f'<text x="320" y="356" text-anchor="middle" font-size="10" letter-spacing="2" fill="{SOFT}" font-family="Inter">DEPTH OF COORDINATION  →</text>'
    s += f'<text transform="translate(26 175) rotate(-90)" text-anchor="middle" font-size="10" letter-spacing="2" fill="{SOFT}" font-family="Inter">BREADTH OF ECOSYSTEM  →</text></svg>'
    return s

def svg_flow():
    st = ['Vision', 'Discovery', 'Curation', 'Quotation', 'Booking', 'Planning', 'Coordination', 'Execution', 'Celebration', 'Farewell']
    s = '<svg viewBox="0 0 600 120" class="fig">'
    for i, n in enumerate(st):
        x = 4 + i * 59
        fill = RED if i < 5 else DEEP
        s += f'<polygon points="{x},20 {x + 50},20 {x + 59},50 {x + 50},80 {x},80 {x + 9},50" fill="{fill}" fill-opacity="{.55 + i * .045:.2f}"/>'
        s += f'<text x="{x + 30}" y="55" text-anchor="middle" font-size="8.6" font-weight="600" fill="#f7f1e6" font-family="Inter">{n}</text>'
        s += f'<text x="{x + 30}" y="38" text-anchor="middle" font-size="8" fill="#f7f1e6" fill-opacity=".8" font-family="Inter">{i + 1:02d}</text>'
    s += f'<text x="150" y="104" text-anchor="middle" font-size="10" letter-spacing="2" fill="{SOFT}" font-family="Inter">SELL &amp; STRUCTURE</text><text x="450" y="104" text-anchor="middle" font-size="10" letter-spacing="2" fill="{SOFT}" font-family="Inter">COORDINATE &amp; DELIVER</text></svg>'
    return s

def svg_layers():
    rows = [('EXPERIENCE LAYER', 'Family planning space · guest itineraries & RSVPs · budget & timeline visibility', RED),
            ('COORDINATION LAYER', 'Wedding Manager · Family Concierge · Vendor Coordinator · On-Ground Support', DEEP),
            ('MARKETPLACE LAYER', 'Verified partner profiles · curated shortlists · quotations · structured bookings', '#8a6a1c'),
            ('TRUST & PAYMENTS LAYER', 'Agreements · scope & cancellation terms · secure payments · escalation · quality tracking', INK)]
    s = '<svg viewBox="0 0 600 250" class="fig">'
    for i, (a, b, c) in enumerate(rows):
        y = 8 + i * 60
        s += f'<rect x="{20 + i * 14}" y="{y}" width="{560 - i * 28}" height="52" fill="{c}"/><text x="300" y="{y + 21}" text-anchor="middle" font-size="10" letter-spacing="2.4" fill="#f7f1e6" fill-opacity=".85" font-family="Inter">{a}</text><text x="300" y="{y + 39}" text-anchor="middle" font-size="10.5" fill="#f7f1e6" font-family="Inter">{b}</text>'
    return s + '</svg>'

def svg_rings():
    s = '<svg viewBox="0 0 600 340" class="fig">'
    for r, c in ((160, '#f3e6e1'), (115, '#ecd2cb'), (70, '#e2b3a8')):
        s += f'<circle cx="300" cy="170" r="{r}" fill="{c}" stroke="{RED}" stroke-opacity=".5"/>'
    for r, lab in ((160, 'FURTHER OUT'), (115, 'GROWING OUTWARD'), (70, 'WHERE WE BEGIN')):
        y = 170 - r + 22
        s += f'<text x="300" y="{y}" text-anchor="middle" font-size="9" letter-spacing="1.6" fill="{DEEP}" font-family="Inter" font-weight="600">{lab}</text>'
    s += f'<circle cx="300" cy="190" r="34" fill="{RED}"/><text x="300" y="195" text-anchor="middle" font-size="15" font-style="italic" fill="#f7f1e6" font-family="Cormorant Garamond">a wedding</text>'
    return s + '</svg>'

def svg_roadmap():
    ph = [('PHASE 1', 'Prove the model', ['Pilot weddings in', 'one launch city']), ('PHASE 2', 'Systemise', ['Partner network,', 'run-sheets, payments']),
          ('PHASE 3', 'Expand', ['More cities and', 'destination weddings']), ('PHASE 4', 'Extend', ['Travel, gifting and', 'private events'])]
    s = '<svg viewBox="0 0 600 130" class="fig"><line x1="20" y1="40" x2="580" y2="40" stroke="#b3261e" stroke-width="2"/>'
    for i, (a, b, c) in enumerate(ph):
        x = 20 + i * 148
        s += f'<circle cx="{x + 8}" cy="40" r="8" fill="{RED if i == 0 else "#fbf8f1"}" stroke="{RED}" stroke-width="2"/>'
        s += f'<text x="{x}" y="18" font-size="9" letter-spacing="2" fill="{RED}" font-family="Inter" font-weight="600">{a}</text>'
        s += f'<text x="{x}" y="72" font-size="17" fill="{INK}" font-family="Cormorant Garamond" font-weight="500">{b}</text>'
        for k, line in enumerate(c):
            s += f'<text x="{x}" y="{90 + k * 12}" font-size="8.6" fill="{SOFT}" font-family="Inter">{line}</text>'
    return s + '</svg>'

# ---------- document pieces ----------
def table(head, rows, cls=''):
    h = ''.join(f'<th>{c}</th>' for c in head)
    b = ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in r) + '</tr>' for r in rows)
    return f'<table class="{cls}"><thead><tr>{h}</tr></thead><tbody>{b}</tbody></table>'

def insight(t, title='Investor Insight'):
    return f'<div class="insight"><b>{title}</b><p>{t}</p></div>'

def ul(items):
    return '<ul>' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>'

SECTIONS = []  # (num, title, subs)
def sec(n, title, sub, body, brk=False):
    SECTIONS.append((n, title))
    return f'<section class="chapter{" brk" if brk else ""}"><h1 id="s{n}">{n}. {title}</h1><p class="lede">{sub}</p>{body}</section>'

base = model.run('Base'); cons = model.run('Conservative'); amb = model.run('Ambitious')
b5, c5, a5 = base[-1], cons[-1], amb[-1]

body = ''

# 1 Executive summary
body += sec(1, 'Executive Summary', 'An orchestration layer for the Indian wedding ecosystem.', brk=True, body=f'''
<h2>Executive Overview</h2>
<p>An Indian wedding is rarely one event and never one vendor. A single celebration can involve a venue, a caterer, decorators, photographers, hotels, transport, entertainers, makeup artists, invitations, gifting and a guest list of hundreds, each sourced, negotiated, paid and managed separately by the family. Digital technology has reshaped banking, shopping and travel; the wedding, one of the largest and most emotional purchases a family makes, is still assembled from fragmented, disconnected providers.</p>
<p>BRIDLYA was conceived to change that. It is a coordinated wedding platform that brings the people, places, experiences and details of a celebration into one carefully orchestrated journey: <b>discovery, curation, planning, booking, coordination, hospitality, logistics, execution and support</b>. BRIDLYA works <i>with</i> independent businesses rather than replacing them. Families get one coordinated experience and one team to call; partners gain access to qualified wedding demand and a structured way to deliver it.</p>
<p>BRIDLYA is not a vendor directory and not a single planner. It is positioned as an <b>orchestration layer</b>: technology organises the celebration, and a human coordination team makes sure it happens beautifully.</p>
<div class="fig-wrap">{svg_layers()}<p class="cap">The BRIDLYA operating stack: four layers working as one</p></div>
{insight('BRIDLYA monetises coordination, not just introductions. Because the same relationship spans planning, booking, logistics and on-ground delivery, every wedding generates several revenue lines, while partners and families gain reasons to return.')}
<h2>Key Highlights</h2>
{ul(['One coordinated experience for a family; one structured demand channel for independent wedding businesses.',
     'Addresses a very large, highly fragmented, largely unorganised market (published estimates: 10 million+ weddings a year).',
     'Platform economics: coordination fees and partner commissions, partner subscriptions, and adjacent services.',
     'Brand and product vision already expressed in a working, production-quality website prototype.',
     'Expansion path from weddings into travel, gifting, hospitality, anniversaries and private events.'])}
<div class="status"><b>Stage and honesty note.</b> BRIDLYA is a pre-launch concept. The website prototype is built; no customers, partners or revenue exist yet. All market figures are third-party estimates and all financial projections are illustrative scenarios built on stated assumptions (Appendix A).</div>
''')

# 2 Why this matters
body += sec(2, 'Why This Matters', 'The challenge is not a lack of providers. It is a lack of connection.', f'''
<p>India has no shortage of beautiful venues, gifted caterers, skilled decorators or talented photographers. What it lacks is a dependable way to bring them together around one family&rsquo;s wedding. The family becomes the project manager of a multi-day, multi-vendor production at the most emotionally charged moment of their lives.</p>
<h2>Challenges Across the Ecosystem</h2>
<div class="cols">
<div><h3>Families</h3>{ul(['Dozens of separate conversations, quotes and payments.', 'No single view of budget, timeline or responsibilities.', 'Guest logistics (stays, transfers, itineraries) handled by relatives.', 'Weeks of the wedding spent chasing vendors instead of celebrating.'])}</div>
<div><h3>Independent Vendors</h3>{ul(['Demand depends on referrals and walk-ins.', 'Quotes, bookings and payments run through chats and calls.', 'Limited tools to present work professionally or manage calendars.', 'Cash-flow and scope disputes with little documentation.'])}</div>
<div><h3>Venues &amp; Hotels</h3>{ul(['Fragmented inbound enquiries of uneven quality.', 'Coordination with outside vendors is manual.', 'Guest-room blocks and event timings managed separately.'])}</div>
<div><h3>Planners</h3>{ul(['Premium planners deliver superbly but are bespoke and hard to scale.', 'Pricing and availability limit them to a narrow segment.', 'Little shared infrastructure across vendors and events.'])}</div>
</div>
{insight('The infrastructure already exists. Venues, kitchens, florists, drivers and musicians are all there. The opportunity is to connect and orchestrate them, making existing capacity more discoverable, reliable and efficient, rather than building new supply.')}
''')

# 3 Opportunity
body += sec(3, 'The Opportunity', 'A very large market that is still organised mostly by word of mouth.', brk=True, body=f'''
<h2>Market Size</h2>
<p>Published industry estimates describe the Indian wedding sector as one of the largest consumer categories in the country. They vary by definition (core wedding services versus all wedding-linked spend, including jewellery and apparel), so BRIDLYA treats them as a range, not a point.</p>
{table(['Indicator', 'Published estimate', 'Note'], [
    ['Weddings per year', '10 million+', 'Widely cited across industry reports'],
    ['Wedding industry value', '≈ ₹4.25 lakh crore (≈ US$51 bn) to ≈ ₹6.5 lakh crore', 'Definitions differ; broader estimates cited above US$100 bn'],
    ['Organised share of wedding spend', '≈ 13% (2024)', 'Indicates most of the market is still unorganised'],
    ['Vendor bookings made online', '≈ 24%', 'Online discovery is established; coordination is not'],
    ['Wedding-linked livelihoods', '25 million+', 'Supply side is vast and largely informal']])}
<p class="src">Sources: IBEF (Examining the Economic Impact of India&rsquo;s Wedding Industry); Ken Research (India Wedding Market); IMARC Group (India Wedding Services Market). Figures are secondary estimates gathered in October 2026 and should be independently verified before external circulation.</p>
<h2>How BRIDLYA Sizes Its Opportunity</h2>
<div class="fig-wrap">{svg_funnel()}<p class="cap">Total, serviceable and obtainable market, with assumptions flagged</p></div>
<p>The serviceable market is deliberately narrow. BRIDLYA begins with premium and large-format weddings, where coordination pain is greatest, budgets support a managed experience, and referral value is highest. The <b>1.5% of weddings (about 150,000 a year)</b> and <b>₹25 lakh average spend</b> used here are working assumptions to be replaced by primary research in the launch city.</p>
<h2>Why Now?</h2>
<div class="cols">
<div><h3>Digital Payments</h3><p>UPI and digital invoicing make structured, traceable booking normal for vendors and families alike.</p></div>
<div><h3>Online-First Discovery</h3><p>Couples already search, shortlist and compare online; they now expect to complete the journey there.</p></div>
<div><h3>Rising Experience Spend</h3><p>Families are investing in multi-day, destination and guest-centred celebrations that are harder to run manually.</p></div>
<div><h3>Vendor Digitisation</h3><p>Small businesses increasingly want affordable tools to show their work, manage enquiries and get paid.</p></div>
<div><h3>Diaspora &amp; Destination</h3><p>Overseas families and destination weddings need remote, reliable, single-team coordination.</p></div>
<div><h3>Operational Know-How</h3><p>Hospitality-style run-sheets and logistics can now be shared across vendors on one platform.</p></div>
</div>
{insight('Roughly four in five wedding rupees are still spent outside organised channels. The prize is not displacing established brands; it is bringing unorganised, referral-driven supply and demand onto a trusted, structured platform.')}
''')

# 4 Meet BRIDLYA
body += sec(4, 'Meet BRIDLYA', 'Where Forever Begins. Every detail, beautifully brought together.', f'''
<p>BRIDLYA&rsquo;s brand is built on a simple belief: <i>a wedding is not a day; it is a thousand little moments, brought together into one memory.</i> The platform exists to protect those moments by taking care of everything around them.</p>
<div class="cols">
<div><h3>For Families</h3>{ul(['One team, one plan, one place to ask.', 'Budget, timeline and vendor visibility.', 'Guest logistics: stays, transfers, itineraries.', 'Tradition-aware planning for any community.', 'Support before and during the celebration.'])}</div>
<div><h3>For Partners</h3>{ul(['Qualified wedding demand.', 'Structured quotes, agreements and bookings.', 'A professional portfolio and presence.', 'Relevant opportunities matched to craft and calendar.', 'Clear scope, payment and communication.'])}</div>
<div><h3>For Venues &amp; Hotels</h3>{ul(['Pre-qualified, well-briefed events.', 'Room-block and guest-flow coordination.', 'One accountable team for outside vendors.'])}</div>
<div><h3>For Guests</h3>{ul(['Clear itineraries and RSVPs.', 'Arrival, transfer and stay support.', 'A concierge line that is answered.'])}</div>
</div>
<h2>Brand Identity</h2>
<p>BRIDLYA&rsquo;s visual language sits between a luxury fashion house, a premium hospitality group and a modern technology company: ceremonial vermilion, warm ivory and restrained champagne, set in editorial typography. The brand deliberately avoids the ornate clichés of wedding portals, signalling confidence, calm and operational seriousness, qualities that matter when a family is entrusting its most important event.</p>
{insight('Brand is a commercial asset here. Premium weddings are bought on trust and taste; a distinctive, credible identity lowers acquisition cost and supports premium positioning from day one.')}
''')

# 5 Ecosystem
body += sec(5, 'The BRIDLYA Ecosystem', 'Many specialists. One experience.', f'''
<div class="fig-wrap narrow">{svg_ecosystem()}<p class="cap">One family at the centre of fourteen categories of independent specialists</p></div>
<h2>How the Ecosystem Works</h2>
<div class="cols">
<div><h3>Families</h3><p>Describe their vision, traditions and budget. Receive curated options, a single plan and one coordinating team.</p></div>
<div><h3>Partners</h3><p>Register, submit business information, define services and locations, receive matched opportunities and manage bookings.</p></div>
<div><h3>BRIDLYA Team</h3><p>Curates, structures agreements, briefs vendors, runs logistics and supports the family through the celebration.</p></div>
<div><h3>Platform</h3><p>Holds the plan, bookings, payments and communication in one record, and learns which pairings and processes work.</p></div>
</div>
<h2>Network Effects</h2>
{ul(['<b>Supply improves demand:</b> a deeper, verified partner network gives families better, faster shortlists.', '<b>Demand improves supply:</b> consistent, qualified bookings attract better partners and keep them engaged.', '<b>Data compounds:</b> repeat coordination yields run-sheets, benchmarks and quality signals that are hard to copy.', '<b>Cross-sell is built in:</b> one relationship covers venue, catering, travel, gifting and honeymoon.'])}
''')

# 6 Product
body += sec(6, 'Experience &amp; Product Walkthrough', 'A cinematic brand website today; an operating platform tomorrow.', brk=True, body=f'''
<p>The first product milestone is complete: a production-quality brand website that tells the BRIDLYA story as a scroll-driven journey through a wedding, from the first venue conversation to the final farewell. It already communicates the concept, the end-to-end service, the partner proposition and the operating principles. It is designed to evolve into the customer and partner platforms.</p>
<div class="shots">
<figure><img src="img/hero.png"><figcaption>Opening: silk curtains part to reveal the BRIDLYA wordmark</figcaption></figure>
<figure><img src="img/chapter.png"><figcaption>Wedding chapters: venue, table, celebration, journey</figcaption></figure>
<figure><img src="img/ecosystem.png"><figcaption>The ecosystem connecting around the family</figcaption></figure>
<figure><img src="img/timeline.png"><figcaption>End-to-end timeline, Vision to Farewell</figcaption></figure>
<figure><img src="img/day.png"><figcaption>Illustrative day-of operations for a sample wedding</figcaption></figure>
<figure><img src="img/partners.png"><figcaption>Partner proposition: &ldquo;Your craft. More celebrations.&rdquo;</figcaption></figure>
</div>
<p class="src">Imagery on the prototype is illustrative artwork; the site is built so real photography can be dropped in without code changes. Names and scenarios shown (for example &ldquo;Ananya &amp; Arjun&rdquo;) are fictional.</p>
<h2>Platform Modules (Planned)</h2>
{table(['Module', 'Purpose', 'Status'], [
 ['Brand website', 'Story, positioning, enquiry capture', 'Built (prototype)'],
 ['Family planning space', 'Vision, shortlist, budget, timeline, guest management', 'Planned, Phase 1–2'],
 ['Partner portal', 'Registration, business verification, services, portfolio, bookings', 'Planned, Phase 1–2'],
 ['Coordination console', 'Run-sheets, vendor briefs, task and escalation tracking', 'Planned, Phase 2'],
 ['Guest experience', 'Invitations, RSVPs, itineraries, transfers, concierge', 'Planned, Phase 2–3'],
 ['Payments &amp; agreements', 'Quotations, e-agreements, milestones, settlements', 'Planned, Phase 2'],
 ['Admin &amp; analytics', 'Quality tracking, finance, partner performance', 'Planned, Phase 2–3']])}
''')

# 7 Operating model
body += sec(7, 'The End-to-End Operating Model', 'Technology organises the celebration. People make sure it happens beautifully.', f'''
<div class="fig-wrap">{svg_flow()}<p class="cap">Ten stages from first idea to farewell, with a single coordinating team throughout</p></div>
<h2>The Human Coordination Layer</h2>
<p>BRIDLYA&rsquo;s defensibility is as much operational as technical. Every wedding is supported by a small, named team:</p>
{table(['Role', 'Responsibility'], [
 ['Wedding Manager', 'Single point of coordination from first conversation to farewell'],
 ['Family Concierge', 'Looks after elders, rituals and the many small unwritten requests'],
 ['Vendor Coordinator', 'Briefs, aligns and follows up with every partner'],
 ['Guest Experience Manager', 'Invitations, RSVPs, itineraries and the guest line'],
 ['Hospitality Coordinator', 'Rooms, meals, welcome kits and host details'],
 ['Event Production Team', 'Builds, lights, runs and resets spaces'],
 ['On-Ground Support', 'Present at venues, hotels and pickup points to solve issues early']])}
<h2>Illustrative Operational Day</h2>
<p>The website walks through a fictional wedding hour by hour (guest arrivals at 06:30, ceremony at 17:00, guest return at 01:00, farewell the next morning) to show investors what coordination looks like in practice: shuttles on fixed rotations, kitchens briefed on dietary notes, run-sheets naming who does what and when.</p>
{insight('Operational playbooks (run-sheets, vendor briefs, escalation paths) become reusable assets. Each wedding makes the next one cheaper and more reliable to deliver, which is how a service business becomes a scalable platform.')}
''')

# 8 Built for India
body += sec(8, 'Built for India&rsquo;s Many Weddings', 'No two families celebrate the same way.', f'''
<p>Indian weddings vary enormously by region, community, religion and generation. BRIDLYA is designed to adapt the experience around the family, not the other way around. The platform treats traditions as <i>planning inputs</i> (timings, rituals, menus, attire, guest flows), not as templates.</p>
{table(['Celebration style (examples, not an exhaustive list)', 'What planning must respect'], [
 ['South Indian temple wedding', 'Early muhurtham, temple schedules, fixed ritual order'],
 ['Tamil wedding', 'Leaf-served feasts, nadaswaram, ceremonies timed to the hour'],
 ['Kerala wedding', 'Quiet silk, morning ceremony, sadya as part of the ritual'],
 ['North Indian wedding', 'Multi-day events: haldi, mehendi, sangeet, pheras, baraat'],
 ['Punjabi wedding', 'Baraat arrival, sangeet energy, large dance-floor events'],
 ['Bengali wedding', 'Alpona, conch shells, a distinct ritual vocabulary'],
 ['Christian wedding', 'Church ceremony plus a reception with family traditions'],
 ['Destination wedding', 'Guest travel, stays, itineraries, weather contingencies'],
 ['Contemporary intimate wedding', 'Small guest list, design-led, minimal formality'],
 ['Grand multi-day celebration', 'Many events, venues and generations on one timeline']])}
<h2>Built on Trust</h2>
{ul(['<b>Tradition-aware:</b> rituals and timings come first; vendors are briefed accordingly.', '<b>Vendor-friendly:</b> simple onboarding, UPI-first payments, clear terms for small businesses.', '<b>Family-first:</b> one conversation, one record, one accountable team.', '<b>Ready to scale:</b> regional adaptability is a configuration of the platform, not a rebuild.'])}
''')

# 9 Competitive landscape
body += sec(9, 'Competitive Landscape &amp; Differentiation', 'A gap between wide directories and deep, bespoke planners.', brk=True, body=f'''
<div class="fig-wrap">{svg_position()}<p class="cap">Conceptual positioning (qualitative, not based on measured data)</p></div>
{table(['Category', 'Typical strength', 'Typical limitation', 'BRIDLYA&rsquo;s position'], [
 ['Wedding directories &amp; marketplaces (e.g. WedMeGood)', 'Breadth of listings; discovery; inspiration', 'Discovery rather than end-to-end delivery', 'Uses breadth as supply; adds curation, booking and coordination'],
 ['Premium full-service planners (e.g. Aprille, Bon Evento)', 'Deep, bespoke, hospitality-grade execution', 'Limited scale; high price; capacity-constrained', 'Aims for planner-grade coordination, systemised and repeatable'],
 ['Individual vendors', 'Craft and local relationships', 'Fragmented demand; manual operations', 'Partner, not competitor: brings demand and tools'],
 ['Hotels &amp; venues', 'Controlled environment; in-house teams', 'Narrow scope; locked to property', 'Orchestrates venues alongside every other category']])}
<p class="src">Companies named are cited only as examples of existing categories and as inspiration for breadth and end-to-end positioning; BRIDLYA has no relationship with them and makes no claims about their performance.</p>
<h2>Sources of Advantage</h2>
{ul(['<b>Orchestration, not listings:</b> coordination is where value, loyalty and margin sit.', '<b>Operational playbooks:</b> reusable run-sheets and escalation paths compound with every event.', '<b>Two-sided trust:</b> verified partners and transparent agreements reassure both sides.', '<b>Brand:</b> premium, calm and distinctive in a visually crowded category.', '<b>Partner-friendly model:</b> working <i>with</i> independent businesses eases supply onboarding.'])}
{insight('Incumbents can copy a feature; they cannot easily copy accumulated operating discipline, a verified partner graph and the trust of families who have had one team handle everything.')}
''')

# 10 Business model
body += sec(10, 'Business Model &amp; Unit Economics', 'Multiple revenue streams on a single customer relationship.', f'''
<h2>Revenue Streams</h2>
{table(['Stream', 'How it earns', 'Nature'], [
 ['1. Coordination &amp; commission', 'Planning/coordination fee and a commission on partner bookings made through BRIDLYA (blended take rate)', 'Transactional, scales with GMV'],
 ['2. Partner subscriptions (&ldquo;BRIDLYA Pro&rdquo;)', 'Analytics, priority visibility, calendar and booking tools for partners', 'Recurring'],
 ['3. Guest, travel &amp; gifting services', 'Room blocks, transfers, invitations, hampers, honeymoon and travel', 'Attach revenue per wedding'],
 ['4. Enterprise &amp; destination', 'Corporate celebrations, hotel/venue programmes, destination packages', 'Contract-based'],
 ['5. Future services', 'Insurance and financing referrals, hospitality, private events, anniversaries', 'Lifetime-value expansion']])}
<h2>Illustrative Unit Economics (Base Case, per Wedding)</h2>
{table(['Line', 'Assumption', '₹ per wedding'], [
 ['Average wedding spend coordinated (GMV)', '₹25 lakh', '25,00,000'],
 ['Blended take rate', '8% of GMV', '2,00,000'],
 ['Other services (travel, gifting, guest services)', '1% of GMV', '25,000'],
 ['<b>Revenue per wedding</b>', '', '<b>2,25,000</b>'],
 ['Cost to serve (manager, on-ground team, support)', '≈ 3.5% of GMV', '(87,500)'],
 ['<b>Contribution per wedding</b>', '≈ 5.5% of GMV (≈ 61% of revenue)', '<b>1,37,500</b>'],
 ['Customer acquisition cost', 'Assumed ₹40,000 (referrals, partners, digital)', '(40,000)'],
 ['<b>Contribution after acquisition</b>', 'Payback on the first wedding', '<b>97,500</b>']], 'num')}
<p class="src">All figures in this table are management assumptions for illustration. Actual take rates, costs and acquisition spend will be established in pilot weddings.</p>
{insight('Weddings are high-ticket, low-frequency purchases, but each one carries 50–100+ vendor transactions and hundreds of guest touchpoints. BRIDLYA monetises the breadth of a single wedding, then extends its relationship to travel, anniversaries and family events.')}
''')

# 11 Market share & scenarios
def srow(label, key, fmt):
    return [label] + [fmt(r[key]) for r in base]
body += sec(11, 'Market Share &amp; Financial Scenarios', 'Illustrative five-year scenarios built on explicit assumptions.', brk=True, body=f'''
<p>The scenarios below translate the market sizing into weddings coordinated, gross booking value (GMV) and revenue. <b>They are illustrative, not forecasts</b>; every input is listed in Appendix A so investors can stress-test or replace it.</p>
<h2>Base Case Summary</h2>
{table(['', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'], [
 srow('Weddings coordinated', 'w', lambda v: f'{v:,.0f}'),
 srow('GMV coordinated (₹ cr)', 'gmv', lambda v: f'{v:,.1f}'),
 srow('Commission &amp; coordination (₹ cr)', 'commission', lambda v: f'{v:,.1f}'),
 srow('Partner subscriptions (₹ cr)', 'subs', lambda v: f'{v:,.1f}'),
 srow('Other services (₹ cr)', 'other', lambda v: f'{v:,.1f}'),
 [f'<b>Total revenue (₹ cr)</b>'] + [f'<b>{r["rev"]:,.1f}</b>' for r in base],
 srow('Share of serviceable weddings', 'share_sam', lambda v: f'{v:.2f}%'),
 srow('Share of all Indian weddings', 'share_total', lambda v: f'{v:.3f}%'),
 srow('GMV as share of ₹4.25 lakh cr market', 'share_tam', lambda v: f'{v:.2f}%')], 'num')}
<div class="fig-wrap">{svg_stacked('Base')}<p class="cap">Base-case revenue by stream, ₹ crore</p></div>
<h2>Scenario Range</h2>
{table(['Year 5 outcome', 'Conservative', 'Base', 'Ambitious'], [
 ['Weddings coordinated', f'{c5["w"]:,}', f'{b5["w"]:,}', f'{a5["w"]:,}'],
 ['Average wedding spend', '₹20 lakh', '₹25 lakh', '₹30 lakh'],
 ['Blended take rate', '6%', '8%', '10%'],
 ['GMV coordinated', cr(c5['gmv'], 0), cr(b5['gmv'], 0), cr(a5['gmv'], 0)],
 ['<b>Total revenue</b>', f'<b>{cr(c5["rev"])}</b>', f'<b>{cr(b5["rev"])}</b>', f'<b>{cr(a5["rev"])}</b>'],
 ['Share of serviceable weddings (150,000)', f'{c5["share_sam"]:.1f}%', f'{b5["share_sam"]:.1f}%', f'{a5["share_sam"]:.1f}%'],
 ['Share of all Indian weddings', f'{c5["share_total"]:.2f}%', f'{b5["share_total"]:.2f}%', f'{a5["share_total"]:.2f}%']], 'num')}
<div class="fig-wrap">{svg_weddings()}<p class="cap">Weddings coordinated per year across scenarios</p></div>
<h2>Sensitivity: Year 5 Revenue (₹ crore)</h2>
{table(['Weddings coordinated ↓  /  Take rate →', '6%', '8%', '10%'], [[f'{w:,}'] + [f'{w * 25 / 100 * t:,.0f}' for t in (.06, .08, .10)] for w in (1000, 2000, 4000, 6000, 8000)], 'num')}
<p class="src">Sensitivity holds average wedding spend at ₹25 lakh and excludes subscription and other-services revenue.</p>
{insight(f'Even the base case implies roughly {b5["share_sam"]:.1f}% of the serviceable market and about {b5["share_total"]:.2f}% of all weddings in India by Year 5. The thesis does not require dominating the market. It requires executing excellently in a premium niche of a very large one.')}
''')

# 12 Go to market
body += sec(12, 'Go-to-Market Strategy', 'Concentrate, prove, then replicate.', f'''
<h2>Launch Approach</h2>
{ul(['<b>One launch city first.</b> Build supply density where coordination pain and willingness to pay are high (the website uses Chennai as an illustrative example; the city is to be decided).', '<b>Supply before demand.</b> Seed a curated partner network across the core categories, with verification built into onboarding.', '<b>Pilot weddings.</b> Deliver a small number of fully managed weddings to refine run-sheets, pricing and cost-to-serve.', '<b>Case-study-led growth.</b> Each delivered wedding becomes content, referrals and partner proof.'])}
<h2>Acquisition Channels</h2>
{table(['Channel', 'Role'], [
 ['Family referrals &amp; community networks', 'Highest-trust source for premium weddings'],
 ['Venue, hotel and planner partnerships', 'Qualified inbound enquiries and co-selling'],
 ['Brand and content (editorial website, social)', 'Builds taste, trust and organic demand'],
 ['Destination and diaspora weddings', 'Remote families who most need single-team coordination'],
 ['Corporate and enterprise programmes', 'Repeat, contract-based demand']])}
<h2>Partner Acquisition</h2>
<p>Partners are recruited through personal outreach, venue and planner introductions and an open application process. Value proposition: access to qualified demand, structured bookings and a professional presence. Onboarding collects business and legal information, services, locations and portfolio, with verification before partners are shown to families.</p>
{insight('A wedding is a seasonal, concentrated purchase. Operating a single launch city lets BRIDLYA manage peaks with a compact team, learn quickly, and build a repeatable playbook before expanding.')}
''')

# 13 Trust, operations, risks
body += sec(13, 'Trust, Operations &amp; Risk Management', 'Beautiful weddings need serious operations behind them.', f'''
<p>BRIDLYA&rsquo;s principles are set out publicly on its website. They are design commitments being built into the platform, not certifications held today.</p>
{table(['Principle', 'Intent'], [
 ['Verified business information', 'Partners submit legal and business details before being presented to families'],
 ['Clear agreements, transparent scope, defined cancellation terms', 'Written terms on what is included, who is responsible and what happens on cancellation'],
 ['Structured bookings and documented responsibilities', 'Run-sheets that name who does what, and when'],
 ['Performance tracking and quality monitoring', 'Delivery, punctuality and feedback recorded across weddings'],
 ['Support, escalation, secure payments and clear communication', 'A named team, a defined escalation path, protected payment channels and one thread of record']])}
<h2>Key Risks and Mitigations</h2>
{table(['Risk', 'Why it matters', 'Mitigation'], [
 ['Seasonality', 'Weddings cluster in auspicious periods', 'Compact core team, flexible on-ground staffing, ancillary and off-season revenue (travel, anniversaries, corporate)'],
 ['Service quality at scale', 'One failed event damages trust', 'Pilot-first rollout, run-sheet discipline, partner scoring, escalation protocol'],
 ['Disintermediation', 'Families and vendors may transact directly after introduction', 'Value in coordination, payments, accountability and guest logistics, not introductions alone'],
 ['Liability and disputes', 'Multi-party agreements carry legal exposure', 'Clear contracts, defined scope, appropriate insurance and legal review'],
 ['Payments &amp; regulation', 'Handling funds can trigger compliance requirements', 'Work with licensed payment partners; seek legal advice on structure and GST'],
 ['Unit-economics variance', 'Cost-to-serve may exceed plan early on', 'Staged pricing, pilot data before expansion, scenario-based planning'],
 ['Supply onboarding', 'Informal vendors may resist structure', 'Simple onboarding, partner-first benefits, early partner advisory group']], 'small')}
''')

# 14 Roadmap
body += sec(14, 'The Road Ahead', 'From wedding orchestration to a celebration ecosystem.', f'''
<div class="fig-wrap">{svg_roadmap()}</div>
{table(['Phase', 'Focus', 'Outcomes'], [
 ['Phase 1: Prove the model', 'Brand website (built); partner and family onboarding; pilot weddings in one launch city', 'Validated pricing, cost-to-serve and playbooks'],
 ['Phase 2: Systemise', 'Partner portal, coordination console, agreements and payments; larger partner network', 'Repeatable delivery and measurable partner quality'],
 ['Phase 3: Expand', 'Additional cities; destination weddings; guest-experience tools', 'Geographic density; diaspora and destination demand'],
 ['Phase 4: Extend', 'Honeymoon and travel, gifting, hospitality programmes, anniversaries, private events', 'Higher lifetime value; recurring family relationships']])}
<p class="src">Timing for each phase will be set once funding, launch city and partner traction are confirmed.</p>
<h2>Possibilities Beyond the Wedding</h2>
<div class="fig-wrap narrow">{svg_rings()}</div>
<div class="cols">
<div><h3>Where We Begin</h3>{ul(['Wedding planning', 'Guest experience'])}</div>
<div><h3>Growing Outward</h3>{ul(['Destination travel', 'Honeymoon planning', 'Couple experiences'])}</div>
<div><h3>Further Out</h3>{ul(['Family celebrations', 'Anniversaries', 'Private events', 'Hospitality', 'Travel partnerships'])}</div>
<div><h3>Platform Options</h3>{ul(['Software tools for partners', 'White-label programmes for hotels and venues', 'Event insurance and financing referrals', 'Market insight products from aggregated data'])}</div>
</div>
{insight('Weddings are the entry point to a family relationship that runs for decades: travel, milestones, anniversaries, and the next generation&rsquo;s celebrations. Today a wedding; tomorrow an entire celebration ecosystem.')}
''')

# 15 Why invest
body += sec(15, 'Why Invest in BRIDLYA?', 'Five reasons to back the orchestration layer.', f'''
<h2>Five Reasons to Invest</h2>
<h3>1. A Very Large, Fragmented Market</h3><p>Ten million-plus weddings a year and a market valued by published estimates at ₹4.25–6.5 lakh crore, of which only a small share is organised.</p>
<h3>2. A Differentiated Position</h3><p>Not a directory and not a boutique planner: an orchestration layer combining discovery, curation, planning, booking, coordination, hospitality, logistics, execution and support.</p>
<h3>3. A Brand Built to Premium Standards</h3><p>A distinctive identity and a production-quality digital experience already exist, supporting trust and premium positioning from launch.</p>
<h3>4. Multiple Revenue Streams</h3><p>Commissions and coordination fees, partner subscriptions, attach services and enterprise programmes, on top of a single customer relationship.</p>
<h3>5. A Platform That Compounds</h3><p>Every wedding strengthens the partner network, operating playbooks and data, and opens adjacent opportunities in travel, gifting and family celebrations.</p>
{insight(f'The base case reaches about {cr(b5["rev"],0)} of annual revenue in Year 5 on roughly {b5["share_sam"]:.1f}% of the serviceable market, a position that is ambitious but not market-dominating. The upside case reflects what is possible if brand, supply density and operations compound.')}
<h2>Proposed Use of Funds (Indicative Allocation)</h2>
<div class="keep">{table(['Area', 'Share', 'Purpose'], [
 ['Product &amp; technology', '30%', 'Partner and family platforms, coordination console, payments integration'],
 ['Operations &amp; wedding-management team', '25%', 'Wedding managers, concierge, on-ground support, pilot weddings'],
 ['Partner acquisition &amp; verification', '15%', 'Onboarding, verification, partner success'],
 ['Brand &amp; marketing', '15%', 'Content, partnerships, launch-city activation'],
 ['Legal, compliance &amp; insurance', '7%', 'Agreements, payments structure, liability cover'],
 ['Working capital reserve', '8%', 'Seasonality and contingency']], 'num small')}</div>
<p class="src">The raise amount, instrument and runway are to be determined by the founding team and discussed with investors. Allocation percentages are indicative.</p>
''')

# 16 Closing
body += f'''<section class="chapter brk closing">
<p class="eyebrow">BRIDLYA</p>
<p class="big">Where Forever Begins.</p>
<p class="sub">Every detail, beautifully brought together.</p>
<p class="mini">Building India&rsquo;s orchestration layer for weddings and celebrations.</p>
<div class="status dark"><b>Next steps.</b> Founding team profiles, launch-city selection, funding terms and primary market research to be added by the BRIDLYA team before circulation.</div>
</section>'''

# Appendix
SECTIONS.append(('A', 'Appendix: Assumptions, Sources &amp; Disclaimer'))
assump = [[n, ', '.join(f'{w:,}' for w in s['weddings']), f'₹{s["gmv_l"]} lakh', f'{s["take"] * 100:.0f}%', f'{s["other"] * 100:.1f}%', ', '.join(f'{p:,}' for p in s['partners']), f'₹{s["arpa"]:,}'] for n, s in model.SCEN.items()]
body += f'''<section class="chapter brk"><h1 id="sA">Appendix A. Assumptions, Sources &amp; Disclaimer</h1>
<p class="lede">Everything here is editable. The financial model is a conversation tool, not a forecast.</p>
<h2>Scenario Inputs</h2>
{table(['Scenario', 'Weddings, Yr 1–5', 'Avg spend', 'Take rate', 'Other services', 'Partners (subscribers), Yr 1–5', 'Subscription / partner / yr'], assump, 'small')}
<h2>Other Assumptions</h2>
{ul(['Serviceable market: 150,000 weddings a year (≈ 1.5% of 10 million) at ₹25 lakh average spend, an assumption pending primary research.', 'Cost to serve ≈ 3.5% of GMV; acquisition cost ₹40,000 per wedding (base case).', 'GMV is the value of services coordinated through BRIDLYA; it is <i>not</i> BRIDLYA revenue. Revenue is the sum of coordination fees and commissions, subscriptions and other services.', '1 crore = 10 million; 1 lakh = 100,000. Years are operating years from launch.', 'No revenue has been earned to date. No customers, partners or vendors are onboarded.'])}
<h2>Sources for Market Data</h2>
{ul(['IBEF, &ldquo;Examining the Economic Impact of India&rsquo;s Wedding Industry&rdquo; (ibef.org).', 'Ken Research, &ldquo;India Wedding Market Share, Companies &amp; Trends Report 2025–2032&rdquo; (kenresearch.com).', 'IMARC Group, &ldquo;India Wedding Services Market Size, Industry Analysis 2034&rdquo; (imarcgroup.com).', 'Secondary-source figures (weddings per year, market value, organised share, online booking share, livelihoods) were gathered in October 2026. Estimates differ between publishers and definitions; verify against primary reports before external distribution.'])}
<h2>Important Notice</h2>
<p class="fine">This memorandum is a confidential, pre-launch concept document prepared by the BRIDLYA founding team for discussion purposes only. It is not an offer of securities or a solicitation of investment. Forward-looking statements and scenarios are illustrative, depend on assumptions that may not hold, and involve risks and uncertainties. The BRIDLYA brand website is a prototype: imagery, names, scenarios and figures shown are illustrative; no real businesses, customers, partners or locations are represented or implied. Third-party company names are used only to describe market categories and do not imply any relationship.</p>
</section>'''

# TOC
toc_rows = ''
for n, t in SECTIONS:
    pg = toc_pages.get(str(n), '–')
    toc_rows += f'<tr><td class="tn">{n if n != "A" else "A"}.</td><td class="tt">{t.replace("Appendix: ", "")}</td><td class="tp">{pg}</td></tr>'
toc = f'<section class="toc brk"><h1 class="plain">Table of Contents</h1><table class="tocT">{toc_rows}</table></section>'

# Cover
cover = '''<section class="cover">
<div class="cv-top"><p class="eyebrow">Investor Memorandum &amp; Business Blueprint</p></div>
<div class="cv-mid"><h1>BRIDLYA</h1><p class="tag">Where Forever Begins.</p><p class="pos">Building India&rsquo;s orchestration layer for the wedding ecosystem</p></div>
<div class="cv-img"><img src="img/hero.png"></div>
<div class="cv-foot"><p>Prepared by the BRIDLYA Founding Team<br>Version 1.0 · October 2026<br><b>Confidential · Pre-launch concept</b></p></div>
</section>'''

css = open('memo.css').read().replace('NODE', NODE)
html = f'<!doctype html><html><head><meta charset="utf-8"><title>BRIDLYA Investor Memorandum</title><style>{css}</style></head><body>{cover}{toc}{body}</body></html>'
open('memo.html', 'w').write(html)
print('sections', len(SECTIONS))
