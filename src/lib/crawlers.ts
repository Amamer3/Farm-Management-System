const SEARCH_CRAWLERS =
  /Googlebot|Google-InspectionTool|Storebot-Google|GoogleOther|bingbot|BingPreview|DuckDuckBot|Slurp|Baiduspider|Yandex(Bot|Images|Mobile)|Applebot|facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Pinterestbot|WhatsApp|TelegramBot|Discordbot|Slackbot|Bytespider|GPTBot|ChatGPT-User|ClaudeBot|anthropic-ai|PerplexityBot|Google-Extended|CCBot|meta-externalagent|Amazonbot|ia_archiver/i

export function isSearchCrawler(userAgent: string | null | undefined): boolean {
  return !!userAgent && SEARCH_CRAWLERS.test(userAgent)
}
