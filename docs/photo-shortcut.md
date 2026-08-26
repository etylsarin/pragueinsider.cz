# The photo-upload Shortcut

One tap from wherever you are standing to a folder in iCloud Drive. The Shortcut decides nothing
about which article the picture belongs to — that decision needs the archive in front of you and
happens later, at `npm run photos`.

It does only what is easier on the phone than anywhere else: it opens the camera, takes your
position from CoreLocation, and converts and resizes on-device so a 4 MB HEIC never reaches the
repository. Then it writes two files and stops.

```
iCloud Drive/Shortcuts/PragueInsider/2026-08-26-143012.jpeg   the picture, already resized
iCloud Drive/Shortcuts/PragueInsider/2026-08-26-143012.txt    {"note", "lat", "lng", "shot"}
```

Two surprises in those paths, both of them Shortcuts being Shortcuts. **A Save File path is
relative to the Shortcuts app's own iCloud folder**, not the iCloud Drive root, so `PragueInsider/`
appears under *Shortcuts*. And **Shortcuts appends its own extension** for the content type it is
saving — so the path must carry no extension at all, or you get `….jpg.jpeg` and `….json.txt`.
That second one matters beyond looking untidy: `attach-photo.mjs` pairs a photo with its sidecar by
base name, and `x.jpg` and `x.json` are not the same base name. `npm run photos` searches all three
plausible folders, so you do not have to care which one yours is.

**There is no GitHub token on the phone**, no base64 encoding and no HTTP at all. An earlier
version of this shortcut PUT the files to the GitHub contents API, which needed a personal access
token stored on the device, two authenticated JSON request bodies and a base64 step that fails in
a way the error message does not explain. None of that bought anything: the photograph is attached
to an article on the Mac, and the Mac is where iCloud Drive already is.

---

## Getting it

### Import it

```bash
node scripts/make-shortcut.mjs        # writes docs/photo-upload.shortcut, signed
```

AirDrop the result to the phone and open it. Nothing to enable first.

Shortcuts have been signed since iOS 15 — and the old *Allow Untrusted Shortcuts* toggle went away
in the same release, so guides that tell you to turn it on are describing iOS 14. An unsigned file
simply cannot be imported on a current iPhone. macOS ships the signer as `shortcuts sign`, and it
accepts exactly the old-format plist this generator builds, so signing is the last step of
`make-shortcut.mjs` rather than something you have to arrange. It needs macOS and an iCloud login;
`--unsigned` skips it if you want to read the plist.

Signing doubles as a real check — Apple's tool has to parse the workflow to sign it, which catches
much more than a plist lint. What it does not prove is that every parameter landed where intended:
the identifiers and parameter keys in the generator are Shortcuts' private interface, undocumented
and prone to moving between releases. **Open it in the editor once and read down it.** If an action
is blank or points at the wrong input, fix it against the table below — that table, not the file,
is the authoritative description.

### Or build it

Fourteen actions. Shortcuts app → **+** → add each with the **Search Actions** bar at the bottom.

**The one rule that decides the order:** each action's input is auto-filled with the previous
action's output. That is the whole logic of the editor, and it is why grouping by subject — all the
location actions together, all the date actions together — is the wrong order. The list below is
arranged so the automatic chain is already correct, and **there is nothing to re-point by hand.**
Actions that take no input (Date, Get Current Location, Ask for Input) simply ignore what came
before, which is what lets the chain restart cleanly.

| # | Search for | Set it to |
|---|---|---|
| 1 | **Format Date** | tap the date field → **Current Date**; Format **Custom**, `yyyy-MM-dd-HHmmss` |
| 2 | **Take Photo** | Camera **Back**, Show Camera Preview **On** |
| 3 | **Save to Photo Album** | auto-fills *Photo* ✓ — an album of your own |
| 4 | **Resize Image** | auto-fills *Saved Photo Media* ✓ — Width **2000**, Height **Auto** |
| 5 | **Convert Image** | auto-fills *Resized Image* ✓ — **JPEG**, Quality ~85, **Preserve Metadata OFF** |
| 6 | **Save File** | auto-fills *Converted Image* ✓ — **Ask Where To Save OFF**, path below |
| 7 | **Get Current Location** | no options |
| 8 | **Get Details of Locations** | auto-fills *Current Location* ✓ — Detail **Latitude** |
| 9 | **Get Current Location** | again — step 8 consumed the first one |
| 10 | **Get Details of Locations** | auto-fills *Current Location* ✓ — Detail **Longitude** |
| 11 | **Ask for Input** | **Text**, prompt *What is this?* |
| 12 | **Text** | the sidecar JSON, below |
| 13 | **Save File** | auto-fills *Text* ✓ — **Ask Where To Save OFF**, path below |
| 14 | **Show Notification** | anything — `Filed ` plus the *Formatted Date* variable |

**Step 1 uses the built-in Current Date token, not a Date action.** There is a Date action, and
feeding Format Date from one is the obvious construction — it is also the fragile one. That action
has a mode which has to be set to *Current Date*, and left on *Specified Date* with no date it
emits nothing at all. Format Date then formats nothing, both Save File paths resolve to nothing,
and the only symptom is two files named after their own extensions. The built-in token has no mode
to get wrong. Tap the date field in Format Date and pick **Current Date** from the list.

If the notification at the end says `Filed` with nothing after it, that is this fault.

The stamp is made first so both Save File actions can name themselves without any action reaching
backwards past the camera. Step 1 is instantaneous, so the camera still opens the moment you tap.

Two settings are not cosmetic:

**Preserve Metadata OFF at step 5.** Steps 7–10 take your position from CoreLocation, so the match
still works; this keeps the camera's own location tag out of the file.

**Ask Where To Save OFF** at steps 6 and 13, or it prompts for a folder every time and the whole
point is gone.

### The two paths and the JSON

Anything in *italics* is a variable, inserted by tapping the field and picking it from the bar
above the keyboard. Everything in `code` is literal text you type.

Step 6 → `PragueInsider/` *Formatted Date*
Step 13 → `PragueInsider/` *Formatted Date*

**No extension on either.** Shortcuts adds `.jpeg` and `.txt` itself.

Step 12, the **Text** action:

> `{"note":"` *Provided Input* `","lat":` *Latitude* `,"lng":` *Longitude* `,"shot":"` *Formatted
> Date* `"}`

which comes out as:

```
{"note":"malovanka tram works from the bridge","lat":50.0817,"lng":14.3894,"shot":"2026-08-26-151134"}
```

Watch the quotes: `note` and `shot` are wrapped in them, `lat` and `lng` are not — JSON numbers are
bare. That one *Formatted Date* does three jobs: it names both files and it goes into the sidecar
as `shot`, where `attach-photo.mjs` takes the first ten characters. No second Format Date.

If Location Services is off or has no fix yet, the coordinates come through empty and the JSON is
malformed. Guard it with an **If** on *Latitude* → *has any value*, and in the Otherwise branch use
a Text action with just `{"note":"` *Provided Input* `","shot":"` *Formatted Date* `"}`.
`attach-photo.mjs` handles a sidecar with no coordinates — it falls back to matching on what the
note says.

### About renaming variables

You do not have to rename anything. Shortcuts names each output for you — *Resized Image*,
*Formatted Date*, *Provided Input* — and those are the names you pick from the variable bar.

If you want to, you do it from where a variable is **used**, not where it is produced: insert it,
tap the coloured token, and edit the name at the top of the panel that opens. There is no rename
control on an action itself, which is why it looks missing. In this version nothing collides, so
there is no reason to bother.

## Checking it works

The editor does not number anything, so the cards below are identified by what they say.

### The one-minute test

Open the shortcut for editing. Add a **Quick Look** action (Search Actions → `Quick Look`) — it
lands at the bottom, so drag it up by its left edge until it sits directly under the **Format
Date** card at the top. Tap **▶**. The camera opens; take any photo.

| Quick Look shows | What it means |
|---|---|
| `2026-08-26-161500` | The date is correct. |
| `26/08/2026, 16:15` or similar | **Custom Format** did not import — see below. |
| *"Quick Look wasn't passed any items to preview"* | Format Date is producing nothing: its date field is empty or set to a specified date that was never filled in. Tap that field and pick **Current Date**. |

Delete the Quick Look action when you are done.

### Reading the cards instead

**The top card** should read **Format** *Current Date* **as** *Custom*, with a row below it
containing `yyyy-MM-dd-HHmmss`.

- The word after *Format* is a blue token. If it says anything but `Current Date` — or if there is
  a gap there, or a date picker — tap it and pick **Current Date** from the list.
- If the word after *as* is not `Custom`, tap it and choose Custom — the format row only appears
  once Custom is selected.
- If the format row is there but empty, type `yyyy-MM-dd-HHmmss` into it.

**The first of the two cards beginning with "Save"**, immediately after Convert Image. Two things
to look at:

- A toggle marked **Ask Where To Save**. It must be **off**. While it is on there is no path row
  visible at all, which is the quickest way to spot it.
- A path row reading `PragueInsider/` followed by a blue **Formatted Date** token, and nothing
  after — no extension. If the token is missing — the row ends at the slash — tap at the end of the field and
  insert *Formatted Date* from the bar above the keyboard.

**The second "Save" card**, after the Text action, wants exactly the same two things.

### What the filenames tell you

| In iCloud Drive | Diagnosis |
|---|---|
| `2026-08-26-161500.jpeg` and `.txt` | Correct. |
| `.jpeg` and `.txt` with no date | *Formatted Date* is resolving to nothing — run the test above |
| `….jpg.jpeg` and `….json.txt` | The paths still carry extensions. Delete `.jpg` and `.json` from both Save File path rows |
| Nothing, and no folder | **Ask Where To Save** was left on, so iOS saved wherever you last saved something |

## Putting it somewhere you can reach

- **Home Screen:** the share button in the shortcut's detail view → **Add to Home Screen**.
- **Action Button** (iPhone 15 Pro and later): Settings → Action Button → swipe to **Shortcut**.
- **Back Tap:** Settings → Accessibility → Touch → Back Tap → Double Tap.

The first run asks for camera and location permission, one prompt each. Run it once at home, not
in a gallery.

---

## What happens next

```bash
npm run photos
```

That drains `~/Library/Mobile Documents/com~apple~CloudDocs/PragueInsider/` into `photos/inbox/`,
then ranks each waiting photo against the archive by distance from each article's coordinates and
by what your note says. Set `PI_PHOTO_DROP` if your folder is elsewhere.

### The permission problem, and how it is avoided

macOS guards `~/Library/Mobile Documents` per-application, and a terminal that has never read it is
denied outright rather than prompted. So reading the drop folder directly fails for most people,
and the two obvious answers are both unattractive: granting **Full Disk Access** to a terminal is
an enormous permission to hand over for one folder, and dragging files by hand defeats the point.

So the script does neither. When direct access is refused it **asks Finder to move the files**,
over Apple Events. Finder is already allowed in there, and driving it needs only *Automation*
permission for Finder — one prompt, scoped to a single app, revocable in System Settings → Privacy
& Security → Automation, and nothing like Full Disk Access. The first run may show
*"… wants to control Finder"*; allow it once.

You may never see any of this. The script tries the direct read first and only falls back, so the
output either says `Imported N photo(s) from …` or `Imported N file(s) via Finder from …` and
either is fine.

Two things that do **not** work, so nobody tries them again:

- **A symlink into the folder.** macOS resolves the link and checks the real path behind it, so
  the denial is identical. Mirroring the iCloud folder into the repo cannot get round this.
- **Declining the Finder prompt and hoping.** If Automation is refused as well, the script says so
  and names the setting; the remaining options really are Full Disk Access or dragging the files
  in from Finder yourself.

Then hand it to the desk — `/photo-desk` in Claude Code — or attach one by hand:

```bash
node scripts/attach-photo.mjs \
  --photo 2026-08-26-143012.jpg --slug malovanka-strahov-tram-contract \
  --alt-en "…" --alt-cs "…" --caption-en "…" --caption-cs "…"
node scripts/validate-posts.mjs && npm run build
```

---

## When it doesn't work

| Symptom | Cause |
|---|---|
| The file will not import | it is the unsigned plist — regenerate without `--unsigned`. There is no toggle to enable on iOS 15+ |
| An imported action is blank or grey | a parameter key this iOS build does not use — set it by hand from the table above |
| It asks where to save, every time | **Ask Where To Save** is still on at step 6 or 13 |
| `npm run photos` says the inbox is empty | iCloud has not synced yet; the script reports files it can see but that are still downloading |
| `Could not reach the drop folder, directly or through Finder` | Automation for Finder was declined — System Settings → Privacy & Security → Automation, switch Finder back on for the app you ran it in |
| The folder does not exist after a run | **Ask Where To Save** was left on, so iOS saved wherever you last saved something. Check in Finder and fix steps 7 and 14 |
| Sidecar has `"lat":,` | Location Services denied, or no fix yet — add the **If** guard above |
| The uploaded picture is the wrong image | an action is chained to the wrong previous output — check each blue token names what you expect |
| The two files have different names | the *Formatted Date* in one path is a second Format Date action, not the one from step 1 |
| Files are called `.jpg.jpeg` / `.json.txt` | the paths still have extensions on them, and the empty part before is an unresolved *Formatted Date* |
| Files are called `.jpeg` / `.txt` with no date | step 1 produced nothing — its date field is empty or on *Specified Date*. Pick **Current Date** |
