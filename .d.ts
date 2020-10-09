// TODO: wtf is happening with this shit

declare module "*.png" {
  const content: any;
  export = content;
}

declare module "*.jpg" {
  const content: any;
  export = content;
}

declare module "*.glb" {
  const content: any;
  export = content;
}

declare module "popular-movie-quotes" {
  const md: {
    getSomeRandom(count: number): {quote: string, movie: string, type: string, year: number}[]
  }
  export = md;
}