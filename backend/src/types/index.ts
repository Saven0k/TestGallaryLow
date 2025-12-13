export interface CreateArtistData {
  name: string;
  surname: string;
  second_name: string;
  email: string;
  password: string;
  country: string;
  city: string;
  date_birthday: Date;
  biography: string;
  phone_number: string;
  avatar_path?: string;
}

export interface CreatePaintingData {
  title: string;
  description: string;
  date_published: Date;
  author_id: string;
  genre_id: string;
  cost: number;
  country: string;
  city: string;
  image_path: string;
}