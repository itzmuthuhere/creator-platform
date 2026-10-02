# Turns results.json into escaped <pre><code> blocks for the article.
# Traceback file paths are shortened to "main.py" (the real path was a temp dir).
import html, io, json, os, re

here = os.path.dirname(__file__)
r = json.load(open(os.path.join(here, "results.json")))["results"]
out = []
for k, x in r.items():
    o = re.sub(r'File "[^"]*main\.py"', 'File "main.py"', x["stdout"] + x["stderr"]).rstrip()
    out.append(f"<<{k}>>\n<pre><code>{html.escape(x['code'], quote=False)}</code></pre>\n"
               f"<<OUT {k}>>\n<pre><code>{html.escape(o, quote=False)}</code></pre>")
io.open(os.path.join(here, "blocks.txt"), "w", encoding="utf-8").write("\n".join(out))
