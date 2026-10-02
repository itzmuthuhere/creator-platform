import json, os, subprocess, sys, tempfile
from programs import PROGRAMS, ERRORS

out = {"python": sys.version.split()[0], "results": {}}
with tempfile.TemporaryDirectory() as d:
    for key, code, stdin in PROGRAMS + ERRORS:
        path = os.path.join(d, "main.py")
        with open(path, "w") as f:
            f.write(code.lstrip("\n"))
        r = subprocess.run([sys.executable, "main.py"], input=stdin, capture_output=True, text=True, cwd=d)
        out["results"][key] = {"code": code.strip("\n"), "stdin": stdin, "stdout": r.stdout, "stderr": r.stderr, "rc": r.returncode}
        print(f"==== {key} rc={r.returncode}\n{r.stdout}{r.stderr}")
json.dump(out, open(os.path.join(os.path.dirname(__file__), "results.json"), "w"), indent=1)
