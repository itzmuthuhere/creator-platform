# How Autocorrect Actually Decides What You Meant to Type

URL: https://techpulzo.in/how-autocorrect-actually-decides-what-you-meant-to-type
Category: Tech | Status: Published | Quality Score: 7 | Editorial Decision: KEEP
Editorial Reason: Benchmark article — concrete contrasting examples and a genuine India-specific detail (Hindi/regional code-switching) a generic answer is unlikely to surface unprompted.
Subtitle: It's not fixing typos by dictionary lookup — it's running a live probability contest between what you typed and what you probably meant
Keywords: how does autocorrect work, why autocorrect changes words wrong, gboard vs swiftkey autocorrect, autocorrect personal dictionary, fix autocorrect mistakes

---

Every time autocorrect swaps a word, three separate signals have gotten about half a second to agree on what you meant, and most of the complaints about "autocorrect being dumb" are really about watching that quiet contest go wrong in public. The keyboard weighs where your finger landed on the screen, what the rest of your sentence is about, and what you personally tend to type — then picks whichever candidate word wins on points. Understanding those three signals explains both why it's usually right and why it occasionally produces spectacularly wrong substitutions.

[IMAGE: Key points: Signal one: how far your finger landed from the key, Signal two: a language model scoring what's statistically likely, Signal three: your own typing history, How the ranking gets decided, Why autocorrect gets things spectacularly wrong sometimes]

## Signal one: how far your finger landed from the key
Modern keyboards don't just register which key you pressed — they track the exact x/y coordinate of your touch relative to the center of each key. If you meant to hit "L" but landed slightly toward "K", the keyboard registers that as a near-miss rather than a deliberate "K" press. This spatial model is why autocorrect fixes typos from adjacent keys ("hwllo" to "hello") far more confidently than it fixes typos involving keys nowhere near each other.

## Signal two: a language model scoring what's statistically likely
Behind the spatial layer sits a language model trained on huge volumes of real text, which assigns a probability to how likely any given word is to appear, both on its own and following the words that came just before it in your sentence. This is why the same typed word can autocorrect differently depending on context — type "I'd rather have tea then coffee" and the keyboard swaps "then" for "than" because it's scoring a comparison, but type "I finished eating then left" and it leaves "then" alone because the model recognizes a sequence of events immediately before it, not a comparison. Same input word, opposite outcome, because the model is scoring the whole phrase, not the isolated word.

## Signal three: your own typing history
Both iOS and Android keyboards maintain a personal dictionary built from words you type repeatedly, including names, slang, and even words your device's default dictionary would flag as errors. Once a word survives several deliberate uses without you correcting it back, the keyboard treats it as a legitimate personal vocabulary entry and stops trying to "fix" it, which is why your friends' unusual names or brand terms eventually stop getting autocorrected away.

## How the ranking gets decided
These signals — key-distance probability, language-model score, and personal dictionary weight — get combined into a single confidence score for each candidate replacement word. If the top-scoring candidate beats your literally-typed word by a wide enough margin, autocorrect silently swaps it in. If the margin is narrow, the keyboard instead just shows the alternative as a suggestion bubble above the space bar and waits for you to tap it, rather than forcing the change. That threshold-based split is deliberate: it's the system hedging between being helpful and being invasive.

## Why autocorrect gets things spectacularly wrong sometimes
Failures cluster around a few predictable causes. Short, rare, but real words (like uncommon names) lose the probability contest to far more common words that happen to be nearby on the keyboard. Sentences using slang, code-switching between languages (very common in Indian typing, mixing Hindi/regional words with English), or deliberately unconventional phrasing confuse the language model because it's scoring against patterns from formal, common text. And autocorrect operates with no real understanding of meaning — it's pattern-matching probability, not comprehension, so it has no way to know a swap changed the sentence's actual intent as long as the resulting sentence is statistically plausible.

## Why Swiping to Type Makes This Even More Complex
Gesture typing (swiping across letters instead of tapping each one) adds a fourth layer of ambiguity on top of the three signals above, since the swipe path itself is a continuous, noisy shape that has to be decoded into a most-likely sequence of letters before any of the word-level scoring even begins. This is why swipe typing tends to make more dramatic errors on longer or less common words than tap typing does — the shape-recognition step is guessing at more information with less certainty to begin with.

## Turning Off Autocorrect Entirely Doesn't Remove the System
Disabling autocorrect in settings typically only stops the silent auto-swap; the spatial key-distance model and suggestion bar usually keep running underneath, still offering corrections as tappable suggestions rather than forcing them. Most keyboards separate these into distinct toggles — autocorrect, predictive text, and suggestions — worth checking individually if the goal is to remove keyboard "interference" entirely rather than just stop unwanted silent swaps.

## Why Autocorrect Feels Worse Right After Switching Phones
The personal dictionary mentioned earlier is tied to that specific device and your typing history on it, so a new phone starts with none of your learned vocabulary. It takes a few weeks of normal typing to rebuild, which is exactly why autocorrect briefly feels dumber right after a switch, even on the same keyboard app. And does it get worse when you're typing fast or annoyed? Indirectly, yes. Faster, less careful typing lands your finger further from the key centers on average, which weakens the spatial signal and hands more of the decision to the language model and personal dictionary. That's exactly when they're most likely to guess wrong.

## Autocorrect and Passwords Don't Mix Well
Password fields are usually excluded from autocorrect by design, but username or email fields sometimes aren't, which can silently "fix" a deliberately unusual username into a dictionary word without you noticing until a login fails. Worth double-checking any field with unusual, non-dictionary text before submitting a form, since autocorrect doesn't know the difference between a typo and an intentional non-word string.

## Why it's gotten noticeably better in recent years
Newer keyboard engines (Gboard, SwiftKey, and Apple's own) increasingly use on-device neural network models rather than older statistical n-gram models, allowing them to weigh longer sentence context and adapt faster to a user's personal writing style without sending data to a server. This is also why autocorrect quality has diverged noticeably between phones — it's now a machine learning feature with model quality differences, not a shared dictionary lookup everyone gets equally.
The pattern holds up once you know what to look for: common words in ordinary sentences get corrected with real confidence, while names, slang, and mixed-language typing sit right at the edge of what the model was ever trained to recognize — which is exactly where most of the legendary autocorrect disasters come from.