# Netlify + Decap CMS Setup (Beauty Store)

## 1) Connect and deploy
1. Push this repo to GitHub.
2. In Netlify: **Add new site** -> **Import an existing project**.
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy the site once.

## 2) Enable Identity
1. Open your Netlify site dashboard.
2. Go to **Identity**.
3. Click **Enable Identity**.
4. In **Registration preferences**, choose **Invite only** (recommended).

## 3) Enable Git Gateway
1. Go to **Identity** -> **Services**.
2. Enable **Git Gateway**.
3. Confirm it points to your Git provider/repo.

## 4) Invite admin users
1. Go to **Identity** -> **Invite users**.
2. Enter email addresses for store admins.
3. Invited users accept email invite, set password, then log in at `/admin`.

## 5) Using the admin panel
1. Open `https://YOUR-SITE.netlify.app/admin`.
2. Click **Login with Netlify Identity**.
3. Add/edit/delete products in the **Products** collection.
4. Upload images directly in the editor (saved under `public/images`).
5. Click **Publish** to commit changes to the repo.
6. Netlify auto-builds and updates the live store.

## 6) Notes
- Product Markdown files are stored in `content/products`.
- Frontend reads product data from those Markdown files.
- This setup is fully free with Netlify + Decap CMS + Git provider.
