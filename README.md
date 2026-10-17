# For Kinda 💗

A small, handmade birthday apology page made with plain HTML, CSS, and JavaScript. It has no build step, framework, backend, or required third-party assets. Open `index.html` to preview it locally, or upload this folder to GitHub Pages.

## Add your photos

Put your own `.jpg` photos in the `images/` folder using these exact names (lowercase, hyphens, and `.jpg`):

| File | Suggested photo |
| --- | --- |
| `images/us-1.jpg` | A favorite photo of the two of you |
| `images/us-2.jpg` | Another photo together |

The `images/` folder includes this note. The gallery only has spots for general photos of you two; there are no trip or bus-day photo slots. Replace the filenames in the matching `<img src="...">` in `index.html` if you prefer different names. Keep the image paths relative (for example, `images/us-1.jpg`) so they work both locally and on GitHub Pages. If you do not add photos yet, friendly placeholders appear in their spots.

The tiny instrumental song is synthesized by the page when its play button is clicked. It needs no audio file, external service, or internet connection. Browsers require a click before they allow page audio to play.

## Edit the messages

Open `index.html` in any text editor. Comments in the file point to the apology, photo captions, hidden surprise, and final note. Change the words between the HTML tags while keeping the tags in place. Replace `[add your private joke here]` in the hidden message with your own joke or remove that line.

## Upload to GitHub and enable GitHub Pages

1. Create a new repository on GitHub.
2. Upload `index.html`, `style.css`, `script.js`, and the `images/` folder to the repository's top level. Include this `README.md` too if you want the instructions visible in the repo.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and the **/(root)** folder, then click **Save**.
6. Wait for GitHub Pages to finish publishing. Use the URL shown in the Pages settings to open your site.

No Netlify setup or build command is needed. The site uses relative paths, so it also works when published from a GitHub Pages project repository.
