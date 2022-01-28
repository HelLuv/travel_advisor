export interface IPlace {
  address: string;
  awards: Array<any>;
  cuisine: Array<any>;
  description: string;
  location_id: string;
  name: string;
  phone: string;
  photo: any
  price_level: string;
  ranking: string;
  rating: string;
  web_url: string;
  website: string;
}

interface IPhoto {
  caption: string;
  images: any;
}
