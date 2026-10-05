"""Illustrative BRIDLYA financial scenarios. Every input is an editable ASSUMPTION, not a forecast."""
YEARS = [1, 2, 3, 4, 5]
SCEN = {
    'Conservative': dict(weddings=[10, 60, 200, 500, 1000], gmv_l=20, take=0.06, other=0.005, partners=[10, 50, 175, 400, 750], arpa=24000),
    'Base':         dict(weddings=[20, 150, 600, 1800, 4000], gmv_l=25, take=0.08, other=0.010, partners=[20, 100, 350, 800, 1500], arpa=36000),
    'Ambitious':    dict(weddings=[30, 300, 1500, 5000, 12000], gmv_l=30, take=0.10, other=0.015, partners=[40, 200, 700, 1600, 3000], arpa=48000),
}
SAM_WEDDINGS = 150_000      # assumption: premium / large-format weddings in target metros and hubs
TOTAL_WEDDINGS = 10_000_000 # published estimate: 10M+ weddings per year
TAM_CR = 425_000            # published estimate low end: ~Rs 4.25 lakh crore
CONTRIB_PCT_GMV = 0.055     # assumption: contribution after cost-to-serve (base)

def run(name):
    s = SCEN[name]; out = []
    for i, w in enumerate(s['weddings']):
        gmv = w * s['gmv_l'] / 100            # Rs crore
        commission = gmv * s['take']
        subs = s['partners'][i] * s['arpa'] / 1e7
        other = gmv * s['other']
        rev = commission + subs + other
        out.append(dict(y=i + 1, w=w, gmv=gmv, commission=commission, subs=subs, other=other, rev=rev,
                        share_sam=w / SAM_WEDDINGS * 100, share_total=w / TOTAL_WEDDINGS * 100, share_tam=gmv / TAM_CR * 100))
    return out
