# Mezmur Voice Detector — name that mezmur

My idea: a Shazam, but for the music I actually grow up around. A Tigrinya or Amharic song — or a mezmur at church — is playing, you love it, and nobody around you knows the name. You hold up your phone, it listens for a few seconds, and it tells you the title so you can find it again later.

## What this version does

- **Full detection interface** — upload an audio clip (it stays on your device, and you can play it back right on the page), or tap the mic button to see the "listening" state.
- **The identify flow** — press *Identify this song* and the result panel walks through the analysis steps the real app would run.
- **A starter library view** — examples of the labeled entries the real database would hold, from Easter and Christmas mezmur to everyday Tigrinya and Amharic songs.
- **A straight explanation** of how the real matching would work and what it needs.

Open `index.html` in a browser. No build step, no accounts, no servers.

## What's honest about this demo — please read

**There is no trained model, no fingerprint database, and no identification happening on this page.** When you press Identify, after the animation the result says so, in plain words: *placeholder result — no identification performed.* I'd rather ship an interface that's honest about the missing engine than one that makes up song titles and pretends it listened.

The mic button is also visual-only in this version — it doesn't record you.

## What a real model would need

1. **A labeled dataset** — hundreds of recordings of Tigrinya/Amharic songs and mezmur, each tagged with the correct title. Getting the recordings *and the right to use them* (artists, choirs, churches) is step one.
2. **Variation coverage** — the same mezmur sung by different choirs, at different tempos, in echoey churches and noisy rooms. A model trained on one clean recording fails on real life.
3. **The matching engine** — audio fingerprinting (Shazam-style) for matching exact recordings, and/or a trained classifier for recognizing the *hymn itself* across different performances. Probably both.
4. **Community review** — people who actually know the mezmur checking matches. Getting a religious song's name wrong in front of the community is not a small miss, so a human-checked library matters.

The labeled-library half of this is already started in my [catholic-mezmur](https://github.com/abrham-dawit/catholic-mezmur) organizer — this detector is the "listen and identify" front-end that would sit on top of a library like that.
