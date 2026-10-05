import subprocess, json, re, sys
pdf = sys.argv[1]
n = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', pdf], capture_output=True, text=True).stdout).group(1))
heads = {'1': 'Executive Summary', '2': 'Why This Matters', '3': 'The Opportunity', '4': 'Meet BRIDLYA', '5': 'The BRIDLYA Ecosystem', '6': 'Experience & Product Walkthrough',
         '7': 'The End-to-End Operating Model', '8': 'Built for India', '9': 'Competitive Landscape', '10': 'Business Model', '11': 'Market Share & Financial',
         '12': 'Go-to-Market Strategy', '13': 'Trust, Operations', '14': 'The Road Ahead', '15': 'Why Invest in BRIDLYA', 'A': 'Appendix A'}
out = {}
for p in range(3, n + 1):
    t = subprocess.run(['pdftotext', '-f', str(p), '-l', str(p), '-layout', pdf, '-'], capture_output=True, text=True).stdout
    first = t
    for k, h in heads.items():
        if k not in out and re.search(r'(^|\n)\s*' + re.escape(k + '. ' if k != 'A' else '') + re.escape(h), first):
            out[k] = p
print(out); json.dump(out, open('toc.json', 'w'))
