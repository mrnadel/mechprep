import re, os

qdir = "C:/Users/mrnad/OneDrive/Desktop/Mechanical Practice/src/data/questions"
files = ["engineering-mechanics.ts", "strength-of-materials.ts", "thermodynamics.ts", "heat-transfer.ts", "fluid-mechanics.ts", "materials-engineering.ts", "manufacturing.ts", "machine-elements.ts", "design-tolerancing.ts", "vibrations.ts", "real-world-mechanisms.ts"]

grand_total = 0
grand_diagrams = 0

for f in files:
    print(f"=== {f} ===")
    with open(os.path.join(qdir, f), encoding="utf-8") as fh:
        content = fh.read()
    ids = [(m.start(), m.group(1)) for m in re.finditer(r"id:\s*'([a-z]+-\d+)'", content)]
    total = len(ids)
    with_diagram = 0
    without_diagram = []
    for i, (pos, qid) in enumerate(ids):
        end = ids[i+1][0] if i+1 < len(ids) else len(content)
        block = content[pos:end]
        has_diagram = "diagram:" in block
        if has_diagram:
            with_diagram += 1
        else:
            qm = re.search(r"question:\s*['\"`](.{0,100})", block)
            qt = qm.group(1) if qm else "N/A"
            without_diagram.append((qid, qt))
    grand_total += total
    grand_diagrams += with_diagram
    print(f"  Total: {total}, With diagram: {with_diagram}, Without: {len(without_diagram)}")
    for qid, qt in without_diagram:
        print(f"  NO DIAGRAM: {qid} - {qt}")

print(f"\n=== GRAND TOTAL ===")
print(f"  Questions: {grand_total}")
print(f"  With diagrams: {grand_diagrams}")
print(f"  Without diagrams: {grand_total - grand_diagrams}")
