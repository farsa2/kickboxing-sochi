export default async function handler(req, res) {
  const allowedOrigins = [
    'https://kickboxingsochi.ru',
    'https://www.kickboxingsochi.ru',
  ]
  
  const origin = req.headers.origin
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  console.log('=== TELEGRAM DEBUG ===')
  console.log('CHAT_ID:', chatId)
  console.log('TOKEN_EXISTS:', !!token)
  console.log('BODY:', req.body)
  console.log('======================')

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Telegram not configured' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const { name, phone, email, group, message } = body

    const text = [
      '🆕 Новая заявка с сайта',
      '',
      `👤 Имя: ${name || '—'}`,
      `📞 Телефон: ${phone || '—'}`,
      `✉️ Email: ${email || '—'}`,
      `📋 Направление: ${group || '—'}`,
      message ? `💬 Сообщение:\n${message}` : '',
    ].filter(Boolean).join('\n')

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    })

    const data = await response.json()

    console.log('TELEGRAM RESPONSE:', JSON.stringify(data))

    if (!data.ok) {
      return res.status(400).json({
        ok: false,
        error: data.description || 'Telegram error',
      })
    }

    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message })
  }
}