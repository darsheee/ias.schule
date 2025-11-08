/**
 * Bot Detection & Rate Limiting Protection
 * Protects against AI bots, scrapers, and high-frequency requests
 */

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  blockDurationMs: number
}

// interface BotSignature {
//   userAgent: string
//   requestCount: number
//   firstRequest: number
//   lastRequest: number
//   blocked: boolean
//   blockExpiry: number
// }

class BotProtection {
  private rateLimitConfig: RateLimitConfig = {
    maxRequests: 30, // Max page views
    windowMs: 60 * 1000, // Per minute
    blockDurationMs: 15 * 60 * 1000, // Block for 15 minutes
  }

  private storageKey = 'bot_protection_data'
  private blockKey = 'bot_protection_blocked'

  /**
   * Initialize bot protection
   */
  init() {
    if (typeof window === 'undefined') return

    // Check if already blocked
    if (this.isBlocked()) {
      this.showBlockedMessage()
      return
    }

    // Detect bots
    if (this.detectBot()) {
      this.blockUser('Bot detected')
      return
    }

    // Rate limiting
    if (!this.checkRateLimit()) {
      this.blockUser('Rate limit exceeded')
      return
    }

    // Monitor page visibility (bots don't trigger visibility events properly)
    this.monitorVisibility()

    // Challenge-response for suspicious activity
    this.runBotChallenge()
  }

  /**
   * Detect bot based on multiple signals
   */
  private detectBot(): boolean {
    const ua = navigator.userAgent.toLowerCase()

    // Known bot signatures
    const botPatterns = [
      'bot', 'crawl', 'spider', 'scrape', 'curl', 'wget', 'python',
      'java', 'requests', 'mechanize', 'scrapy', 'selenium', 'phantom',
      'headless', 'puppeteer', 'playwright', 'jsdom', 'axios', 'fetch',
      'gpt', 'chatgpt', 'claude', 'anthropic', 'openai', 'perplexity',
      'http', 'libwww', 'winhttp', 'apache', 'okhttp', 'go-http'
    ]

    if (botPatterns.some(pattern => ua.includes(pattern))) {
      console.warn('[Bot Protection] Bot detected via User-Agent')
      return true
    }

    // Check for webdriver (Selenium/Playwright)
    if (navigator.webdriver) {
      console.warn('[Bot Protection] WebDriver detected')
      return true
    }

    // Check for missing browser features (headless browsers)
    // @ts-expect-error - chrome property exists in Chrome browsers
    const hasChrome = typeof window.chrome !== 'undefined' && window.chrome?.runtime
    
    if (!hasChrome) {
      // Additional headless checks
      const headlessSignals = [
        !navigator.plugins?.length,
        !navigator.languages,
        navigator.hardwareConcurrency === 0,
      ]

      if (headlessSignals.filter(Boolean).length >= 2) {
        console.warn('[Bot Protection] Headless browser detected')
        return true
      }
    }

    // Check for automation tools
    if (
      // @ts-expect-error - checking for automation signals
      window.callPhantom ||
      // @ts-expect-error
      window._phantom ||
      // @ts-expect-error
      window.__nightmare ||
      // @ts-expect-error
      window.domAutomation ||
      // @ts-expect-error
      document.__selenium_unwrapped ||
      // @ts-expect-error
      document.__webdriver_evaluate ||
      // @ts-expect-error
      document.__driver_evaluate
    ) {
      console.warn('[Bot Protection] Automation tool detected')
      return true
    }

    return false
  }

  /**
   * Rate limiting check
   */
  private checkRateLimit(): boolean {
    const now = Date.now()
    const data = this.getRateLimitData()

    // Clean old requests outside the window
    data.requests = data.requests.filter(
      timestamp => now - timestamp < this.rateLimitConfig.windowMs
    )

    // Check if exceeded
    if (data.requests.length >= this.rateLimitConfig.maxRequests) {
      console.warn('[Bot Protection] Rate limit exceeded')
      return false
    }

    // Add current request
    data.requests.push(now)
    this.saveRateLimitData(data)

    return true
  }

  /**
   * Get rate limit data from localStorage
   */
  private getRateLimitData(): { requests: number[] } {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : { requests: [] }
    } catch {
      return { requests: [] }
    }
  }

  /**
   * Save rate limit data to localStorage
   */
  private saveRateLimitData(data: { requests: number[] }) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch {
      // Ignore localStorage errors
    }
  }

  /**
   * Check if user is blocked
   */
  private isBlocked(): boolean {
    try {
      const blocked = localStorage.getItem(this.blockKey)
      if (!blocked) return false

      const blockData = JSON.parse(blocked)
      const now = Date.now()

      // Check if block has expired
      if (now > blockData.expiry) {
        localStorage.removeItem(this.blockKey)
        return false
      }

      return true
    } catch {
      return false
    }
  }

  /**
   * Block user
   */
  private blockUser(reason: string) {
    console.error(`[Bot Protection] Blocked: ${reason}`)

    try {
      localStorage.setItem(this.blockKey, JSON.stringify({
        reason,
        timestamp: Date.now(),
        expiry: Date.now() + this.rateLimitConfig.blockDurationMs,
      }))
    } catch {
      // Ignore localStorage errors
    }

    this.showBlockedMessage()
  }

  /**
   * Show blocked message
   */
  private showBlockedMessage() {
    const message = document.createElement('div')
    message.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      font-family: monospace;
      flex-direction: column;
      text-align: center;
      padding: 20px;
    `
    message.innerHTML = `
      <h1 style="font-size: 48px; margin: 0 0 20px 0;">⚠️</h1>
      <h2 style="margin: 0 0 20px 0;">Access Temporarily Restricted</h2>
      <p style="max-width: 600px; line-height: 1.6;">
        Your access has been temporarily restricted due to unusual activity.
        This could be due to:
      </p>
      <ul style="text-align: left; max-width: 600px; margin: 20px auto;">
        <li>Too many rapid page requests</li>
        <li>Automated bot-like behavior detected</li>
        <li>Use of scraping tools or automation</li>
      </ul>
      <p style="margin: 20px 0;">
        <strong>Restriction will be lifted in 15 minutes.</strong>
      </p>
      <p style="font-size: 12px; opacity: 0.6; margin-top: 40px;">
        If you believe this is an error, please try again later or contact support.
      </p>
    `
    document.body.innerHTML = ''
    document.body.appendChild(message)

    // Stop all JavaScript execution
    throw new Error('Access blocked')
  }

  /**
   * Monitor page visibility (bots don't trigger these events)
   */
  private monitorVisibility() {
    let visibilityChanges = 0
    let hiddenTime = 0

    document.addEventListener('visibilitychange', () => {
      visibilityChanges++

      if (document.hidden) {
        hiddenTime = Date.now()
      } else {
        // Bot detection: If page was hidden for less than 100ms, likely a bot
        if (hiddenTime && Date.now() - hiddenTime < 100) {
          console.warn('[Bot Protection] Suspicious visibility pattern')
        }
      }
    })

    // Bots typically never trigger visibility changes
    setTimeout(() => {
      if (visibilityChanges === 0) {
        console.warn('[Bot Protection] No visibility changes detected (possible bot)')
      }
    }, 5000)
  }

  /**
   * Run bot challenge (simple proof of work)
   */
  private runBotChallenge() {
    // Challenge: Prove you can execute JavaScript asynchronously
    const challengeStart = Date.now()
    
    setTimeout(() => {
      const challengeEnd = Date.now()
      const duration = challengeEnd - challengeStart

      // If setTimeout fires too quickly or too slowly, likely a bot
      if (duration < 50 || duration > 1500) {
        console.warn('[Bot Protection] Failed timing challenge')
      }
    }, 100)

    // Challenge: Prove you can interact with the DOM
    requestAnimationFrame(() => {
      const testDiv = document.createElement('div')
      testDiv.style.display = 'none'
      document.body.appendChild(testDiv)
      
      // Remove after check
      setTimeout(() => {
        if (testDiv.parentNode) {
          document.body.removeChild(testDiv)
        }
      }, 100)
    })
  }

  /**
   * Reset rate limit (for testing)
   */
  reset() {
    localStorage.removeItem(this.storageKey)
    localStorage.removeItem(this.blockKey)
    console.log('[Bot Protection] Reset complete')
  }
}

export const botProtection = new BotProtection()
