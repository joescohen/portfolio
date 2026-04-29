import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Proxy Letterboxd RSS — needs a real User-Agent or Letterboxd returns 403
app.get('/api/rss', async (req, res) => {
  try {
    const response = await fetch('https://letterboxd.com/jsc6121/rss/', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
    })
    if (!response.ok) {
      return res.status(response.status).send('Upstream error')
    }
    const xml = await response.text()
    res.set('Content-Type', 'application/xml; charset=utf-8')
    res.set('Cache-Control', 'public, max-age=300') // cache 5 min
    res.send(xml)
  } catch (err) {
    console.error('RSS fetch error:', err)
    res.status(500).send('Failed to fetch RSS')
  }
})

// Serve Vite build
app.use(express.static(path.join(__dirname, 'dist')))

// SPA fallback (app.use avoids Express 5's broken wildcard syntax)
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
