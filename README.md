## Live Demo

**Hosted Site:** https://nest-e-commerce-dashboard.vercel.app

> **Important**
> Due to FakeStoreAPI restricting requests from Vercel’s AWS infrastructure, the product catalog may return a `403 Forbidden` error on the live site. This is a known external API limitation. The application works as expected in a local environment where requests originate from a residential IP.

---

## Run Locally

Since the hosted version may face API restrictions, it is recommended to run the project locally to experience full functionality.

### Installation Steps

```bash
npm install

# Create .env.local in the root directory
NEXT_PUBLIC_SERVER_URL=https://fakestoreapi.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000

npm run dev
