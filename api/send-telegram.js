/**
 * Vercel Serverless Function: отправка заявки в личку Telegram.
 * В настройках Vercel добавь переменные:
 *   TELEGRAM_BOT_TOKEN — токен от @BotFather
 *   TELEGRAM_CHAT_ID   — твой chat_id (см. инструкцию в README или ниже)
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    res.status(500).json({ ok: false, error: 'Telegram not configured' })
    return
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

    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    })

    const data = await response.json()
    if (!data.ok) {
      res.status(400).json({ ok: false, error: data.description || 'Telegram error' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}
