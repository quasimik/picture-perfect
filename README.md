# Lexica
LA Hacks 2019 Submission

## Inspiration
We've always wanted to make a word game that exploits the semantic structure of word embeddings. We have used Stanford's GloVe before in another project, and we were interested to gamify the concept.

## What it does
The game has 2 rules:
1. Each player's word must be as unrelated as possible from the target word.
2. All words in the team must combine to be as close as possible to the target word.

For example, suppose

* the target word is "volcano"
* player 1 picks "mountain"
* player 2 picks "fire"

then the team will get a moderately high score, because "mountain"+"fire" is close in meaning to "volcano".

>>>>>>> Stashed changes
And if there are 5 players in the team:

* the target word is "volcano"
* player 1 picks "tall"
* player 2 picks "rock"
* player 3 picks "tectonic"
* player 4 picks "lava"
* player 5 picks "hot"

then the team should also get a moderately high score.

## How we built it
Backend is a Django HTTP server running on GCP App Engine, connected to a MySQL instance also on GCP. Frontend is React.

The crux of the game is a word embedding vector space. It's an n-dimensional (we used n=50) vector space where words are represented as vectors with semantic significance. The word embeddings are generated using a huge word co-occurrence matrix, that is itself generated from a massive corpus of natural language. [Learn more...](https://nlp.stanford.edu/projects/glove/)

## Challenges we ran into
We discussed a lot about meta-strategy, and we worked out the linear algebra corresponding to game operations in the word embedding vector space. We're convinced that theoretically there is no game-breaking strategy. Solving a particular game is possibly NP-hard but we didn't verify this.

We developed the frontend and backend in parallel (i.e. separately). As expected, there were some integration issues that needed to be ironed out, but we did that.

## Accomplishments that we're proud of
The game is fair and balanced across teams. There is no a priori advantage for teams of the same size. The game is compelling, because you get to see other teams' word picks after a round ends and you get to see how creative the other teams are.

## What we learned

## What's next for Lexica

