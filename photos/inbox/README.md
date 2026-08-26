# Photo inbox

Local staging between the phone and an article. **Everything in here except this file is
gitignored** — a photograph is either waiting to be attached or it has already moved into
`content/posts/<article>/`, and neither state belongs in a commit.

Photographs arrive through iCloud Drive, not through git. The Shortcut on the phone
(`docs/photo-shortcut.md`) writes a pair into `iCloud Drive/PragueInsider/`:

```
2026-08-26-143012.jpg    the picture, already JPEG and already resized
2026-08-26-143012.json   {"note", "lat", "lng", "shot"}
```

and `npm run photos` moves them here, then ranks each one against the archive by distance and by
what the note says. Set `PI_PHOTO_DROP` if your iCloud folder is somewhere else.

The desk picks the article, writes the caption and alt text in both languages, and calls
`scripts/attach-photo.mjs` to file it. This directory is empty when that has happened.

A photo with no sidecar still works — it just arrives with no note and no coordinates, so the desk
has to be told which story it belongs to.
