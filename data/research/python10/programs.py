# The 10 programs from the "Python for beginners: 10 programs with real output"
# article. Each is a standalone snippet; run_all.py executes them one by one
# and records the real output shown in the article.

P1 = '''
name = input("What's your name? ")
age = int(input("How old are you? "))
print(f"Hi {name}! In 5 years you'll be {age + 5}.")
'''

P2 = '''
bill = 1840          # food total in rupees
gst_rate = 0.05      # restaurant GST
people = 4

total = bill + bill * gst_rate
share = total / people
print(f"Total with GST: Rs {total:.2f}")
print(f"Each person pays: Rs {share:.2f}")
'''

P3 = '''
principal = 500000      # loan amount
annual_rate = 10.5      # percent per year
years = 5

r = annual_rate / 12 / 100
n = years * 12
emi = principal * r * (1 + r) ** n / ((1 + r) ** n - 1)
print(f"EMI: Rs {emi:,.0f} per month")
print(f"Total paid: Rs {emi * n:,.0f}")
print(f"Interest: Rs {emi * n - principal:,.0f}")
'''

P4 = '''
amount = 100000
rate = 7.0
years = 3

simple = amount * rate * years / 100
compound = amount * (1 + rate / 400) ** (4 * years) - amount   # quarterly, like most bank FDs
print(f"Simple interest:   Rs {simple:,.0f}")
print(f"Compound interest: Rs {compound:,.0f}")
print(f"Difference:        Rs {compound - simple:,.0f}")
'''

P5 = '''
for year in [1900, 2000, 2024, 2025]:
    if year % 400 == 0 or (year % 4 == 0 and year % 100 != 0):
        print(year, "is a leap year")
    else:
        print(year, "is not a leap year")
'''

P6 = '''
n = 7
for i in range(1, 11):
    print(f"{n} x {i:2} = {n * i}")
'''

P7 = '''
import random
random.seed(42)          # fixed seed so the output is repeatable
secret = random.randint(1, 20)

for guess in [10, 15, 3, secret]:
    if guess < secret:
        print(guess, "-> too low")
    elif guess > secret:
        print(guess, "-> too high")
    else:
        print(guess, "-> correct!")
'''

P8 = '''
text = "the quick brown fox jumps over the lazy dog the fox"
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1

for word, c in sorted(counts.items(), key=lambda x: -x[1])[:3]:
    print(word, c)
'''

P9 = '''
expenses = [
    {"item": "Groceries", "cat": "Food", "amt": 2450},
    {"item": "Swiggy", "cat": "Food", "amt": 680},
    {"item": "Metro card", "cat": "Travel", "amt": 500},
    {"item": "Electricity", "cat": "Bills", "amt": 1320},
    {"item": "Petrol", "cat": "Travel", "amt": 1500},
]
totals = {}
for e in expenses:
    totals[e["cat"]] = totals.get(e["cat"], 0) + e["amt"]

for cat, amt in totals.items():
    print(f"{cat:<7} Rs {amt:>5}")
print(f"{'Total':<7} Rs {sum(totals.values()):>5}")
'''

P10 = '''
import csv

rows = [["date", "item", "amount"], ["2026-09-01", "Rent", 12000], ["2026-09-03", "Internet", 799]]
with open("expenses.csv", "w", newline="") as f:
    csv.writer(f).writerows(rows)

with open("expenses.csv") as f:
    reader = csv.DictReader(f)
    total = 0
    for row in reader:
        print(row["date"], row["item"], row["amount"])
        total += int(row["amount"])
print("Total:", total)
'''

PROGRAMS = [("P1", P1, "Muthu\n29\n"), ("P2", P2, ""), ("P3", P3, ""), ("P4", P4, ""), ("P5", P5, ""),
            ("P6", P6, ""), ("P7", P7, ""), ("P8", P8, ""), ("P9", P9, ""), ("P10", P10, "")]

ERRORS = [
    ("E_type", 'age = input("Age: ")\nprint(age + 5)\n', "29\n"),
    ("E_indent", 'for i in range(3):\nprint(i)\n', ""),
    ("E_name", 'total = 100\nprint(totl)\n', ""),
    ("E_zero", 'people = 0\nprint(1840 / people)\n', ""),
    ("E_file", 'open("expense.csv")\n', ""),
]
