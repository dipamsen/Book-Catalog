export interface Quote {
  quote: string;
  by: string;
}

export async function fetchQuote(): Promise<Quote> {
  const res = await fetch("https://quotes-api-self.vercel.app/quote");
  const data = await res.json();
  return {
    quote: data.quote,
    by: data.author,
  };
}
