export interface Quote {
  quote: string;
  by: string;
}

const quotes = [
  {
    q: "“So many books, so little time.”",
    a: "Frank Zappa",
  },
  {
    q: "“A room without books is like a body without a soul.”",
    a: "Marcus Tullius Cicero",
  },
  {
    q: "“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”",
    a: "Jane Austen,",
  },
  {
    q: "“Good friends, good books, and a sleepy conscience: this is the ideal life.”",
    a: "Mark Twain",
  },
  {
    q: "“Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.”",
    a: "Neil Gaiman,",
  },
  {
    q: "“It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.”",
    a: "Maurice Switzer,",
  },
  {
    q: "“Outside of a dog, a book is man's best friend. Inside of a dog it's too dark to read.”",
    a: "Groucho Marx,",
  },
  {
    q: "“A reader lives a thousand lives before he dies, said Jojen. The man who never reads lives only one.”",
    a: "George R.R. Martin,",
  },
  {
    q: "“If you only read the books that everyone else is reading, you can only think what everyone else is thinking.”",
    a: "Haruki Murakami,",
  },
  {
    q: "“I have always imagined that Paradise will be a kind of library.”",
    a: "Jorge Luis Borges",
  },
  {
    q: "“You can never get a cup of tea large enough or a book long enough to suit me.”",
    a: "C.S. Lewis",
  },
  {
    q: "“Never trust anyone who has not brought a book with them.”",
    a: "Lemony Snicket,",
  },
  {
    q: "“Sometimes, you read a book and it fills you with this weird evangelical zeal, and you become convinced that the shattered world will never be put back together unless and until all living humans read the book.”",
    a: "John Green,",
  },
  {
    q: "“If one cannot enjoy reading a book over and over again, there is no use in reading it at all.”",
    a: "Oscar Wilde",
  },
  {
    q: "“There is no friend as loyal as a book.”",
    a: "Ernest Hemingway",
  },
  {
    q: "“I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.”",
    a: "Groucho Marx",
  },
  {
    q: "“So, this is my life. And I want you to know that I am both happy and sad and I'm still trying to figure out how that could be.”",
    a: "Stephen Chbosky,",
  },
  {
    q: "“If you live to be a hundred, I want to live to be a hundred minus one day so I never have to live without you.”",
    a: "Joan Powers,",
  },
  {
    q: "“What really knocks me out is a book that, when you're all done reading it, you wish the author that wrote it was a terrific friend of yours and you could call him up on the phone whenever you felt like it. That doesn't happen much, though.”",
    a: "J.D. Salinger,",
  },
  {
    q: "“It is what you read when you don't have to that determines what you will be when you can't help it.”",
    a: "Oscar Wilde",
  },
  {
    q: '“One must always be careful of books," said Tessa, "and what is inside them, for words have the power to change us.”',
    a: "Cassandra Clare,",
  },
  {
    q: "“If there's a book that you want to read, but it hasn't been written yet, then you must write it.”",
    a: "Toni Morrison",
  },
  {
    q: "“I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book! -- When I have a house of my own, I shall be miserable if I have not an excellent library.”",
    a: "Jane Austen,",
  },
  {
    q: "“The books that the world calls immoral are books that show the world its own shame.”",
    a: "Oscar Wilde,",
  },
  {
    q: "“I can never read all the books I want; I can never be all the people I want and live all the lives I want. I can never train myself in all the skills I want. And why do I want? I want to live and feel all the shades, tones and variations of mental and physical experience possible in my life. And I am horribly limited.”",
    a: "Sylvia Plath,",
  },
  {
    q: "“′Classic′ - a book which people praise and don't read.”",
    a: "Mark Twain",
  },
  {
    q: "“Books are a uniquely portable magic.”",
    a: "Stephen King,",
  },
  {
    q: "“You have to write the book that wants to be written. And if the book will be too difficult for grown-ups, then you write it for children.”",
    a: "Madeleine L'Engle",
  },
  {
    q: "“... a mind needs books as a sword needs a whetstone, if it is to keep its edge.”",
    a: "George R.R. Martin,",
  },
  {
    q: "“Books are the ultimate Dumpees: put them down and they’ll wait for you forever; pay attention to them and they always love you back.”",
    a: "John Green,",
  },
  {
    q: "“Only the very weak-minded refuse to be influenced by literature and poetry.”",
    a: "Cassandra Clare,",
  },
  {
    q: "“Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.”",
    a: "Charles W. Eliot",
  },
  {
    q: "“Be careful about reading health books. Some fine day you'll die of a misprint.”",
    a: "Markus Herz",
  },
  {
    q: "“A children's story that can only be enjoyed by children is not a good children's story in the slightest.”",
    a: "C.S. Lewis",
  },
  {
    q: "“A great book should leave you with many experiences, and slightly exhausted at the end. You live several lives while reading.”",
    a: "William Styron,",
  },
  {
    q: "“So we beat on, boats against the current, borne back ceaselessly into the past.”",
    a: "F. Scott Fitzgerald,",
  },
  {
    q: "“You don't have to burn books to destroy a culture. Just get people to stop reading them.”",
    a: "Ray Bradbury",
  },
  {
    q: "“May your coming year be filled with magic and dreams and good madness. I hope you read some fine books and kiss someone who thinks you're wonderful, and don't forget to make some art -- write or draw or build or sing or live as only you can. And I hope, somewhere in the next year, you surprise yourself.”",
    a: "Neil Gaiman",
  },
  {
    q: "“The only thing worse than a boy who hates you: a boy that loves you.”",
    a: "Markus Zusak,",
  },
  {
    q: "“In a good bookroom you feel in some mysterious way that you are absorbing the wisdom contained in all the books through your skin, without even opening them.”",
    a: "Mark Twain",
  },
  {
    q: "“Sleep is good, he said, and books are better.”",
    a: "George R. R. Martin",
  },
  {
    q: "“I have hated words and I have loved them, and I hope I have made them right.”",
    a: "Markus Zusak,",
  },
  {
    q: "“Books are the perfect entertainment: no commercials, no batteries, hours of enjoyment for each dollar spent. What I wonder is why everybody doesn't carry a book around for those inevitable dead spots in life.”",
    a: "Stephen King",
  },
  {
    q: "“When I look at my room, I see a girl who loves books.”",
    a: "John Green,",
  },
  {
    q: "“Life is a book and there are a thousand pages I have not yet read.”",
    a: "Cassandra Clare,",
  },
  {
    q: "“When I have a little money, I buy books; and if I have any left, I buy food and clothes.”",
    a: "Desiderius Erasmus Roterodamus",
  },
  {
    q: "“Some books should be tasted, some devoured, but only a few should be chewed and digested thoroughly.”",
    a: "Sir Francis Bacon",
  },
  {
    q: "“You think your pain and your heartbreak are unprecedented in the history of the world, but then you read. It was books that taught me that the things that tormented me most were the very things that connected me with all the people who were alive, who had ever been alive.”",
    a: "James Baldwin",
  },
  {
    q: "“Here’s to books, the cheapest vacation you can buy.”",
    a: "Charlaine Harris",
  },
  {
    q: "“The world is a book and those who do not travel read only one page.”",
    a: "St. Augustine",
  },
  {
    q: "“You get a little moody sometimes but I think that's because you like to read. People that like to read are always a little fucked up.”",
    a: "Pat Conroy,",
  },
  {
    q: "“There is nothing either good or bad, but thinking makes it so.”",
    a: "William Shakespear,",
  },
  {
    q: "“There are two motives for reading a book; one, that you enjoy it; the other, that you can boast about it.”",
    a: "Bertrand Russell",
  },
  {
    q: "“Make it a rule never to give a child a book you would not read yourself.”",
    a: "George Bernard Shaw",
  },
  {
    q: "“I spent my life folded between the pages of books.In the absence of human relationships I formed bonds with paper characters. I lived love and loss through stories threaded in history; I experienced adolescence by association. My world is one interwoven web of words, stringing limb to limb, bone to sinew, thoughts and images all together. I am a being comprised of letters, a character created by sentences, a figment of imagination formed through fiction.”",
    a: "Tahereh Mafi,",
  },
];

export function fetchQuote(): Quote {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  const quote = q.q;
  let author = q.a;
  if (author.endsWith(",")) {
    author = author.slice(0, -1);
  }
  return {
    quote: quote,
    by: author,
  };
}
