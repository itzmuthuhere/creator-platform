# Fills the article template's {{KEY}} / {{OUT KEY}} placeholders with the
# real code and output blocks from blocks.txt.
import io, os, re, sys

here = os.path.dirname(__file__)
blocks = io.open(os.path.join(here, "blocks.txt"), encoding="utf-8").read()
parts = dict(re.findall(r"<<([^>]+)>>\n(<pre><code>.*?</code></pre>)", blocks, re.S))
tpl_path, out_path = sys.argv[1], sys.argv[2]
tpl = io.open(tpl_path, encoding="utf-8").read()
filled = re.sub(r"\{\{([^}]+)\}\}", lambda m: parts[m.group(1)], tpl)
assert "{{" not in filled
io.open(out_path, "w", encoding="utf-8").write(filled)
print("filled", len(re.findall(r"\{\{", tpl)), "placeholders")
