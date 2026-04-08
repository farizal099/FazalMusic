export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  url: string;
  isFavorite?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
}
