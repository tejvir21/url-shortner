# TinyWrap

TinyWrap is a modern URL shortener built with React and Vite. It lets users shorten long URLs, copy the generated links, download a QR code, and track recent shortened links from the dashboard.

## Features

- Shorten long URLs into compact links
- Copy shortened URLs to the clipboard
- Generate QR codes for shared links
- View recent URLs in the dashboard
- User authentication flow with login and signup pages
- Redirect shortened URLs to their original destinations

## Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- Sonner notifications

## Prerequisites

Before running the app, make sure you have:

- Node.js 18 or newer
- npm
- A working TinyWrap backend API running locally or remotely

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tejvir21/url-shortner.git
   ```

2. Move into the project directory:

   ```bash
   cd url-shortner
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create your environment file:

   ```bash
   copy env.example .env
   ```

   On macOS/Linux:

   ```bash
   cp env.example .env
   ```

5. Update the environment values in `.env`:
   ```env
   VITE_SERVER_URL=http://localhost:3000/
   VITE_CLIENT_URL=http://localhost:5173/
   ```
   Replace the URLs if your backend runs on a different port or domain.

## Run the app

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Project structure

```text
src/
  components/
  pages/
  App.jsx
  main.jsx
```

## Notes

This frontend expects a backend API that exposes URL shortening endpoints such as:

- `POST /api/url/shorten`
- `GET /api/url/`

If your backend is not running, the app will not be able to generate or fetch short URLs.

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, visit [MY Portfolio](https://tejvir-portfolio.vercel.app/).
