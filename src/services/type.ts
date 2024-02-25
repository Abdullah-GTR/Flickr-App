export declare module SearchServiceTypes {
  export interface Photo {
    farm: number;
    id: string;
    isfamily: number;
    isfriend: number;
    ispublic: number;
    owner: string;
    secret: string;
    server: string;
    title: string;
  }
  export interface Photos {
    page: number;
    pages: number;
    perpage: number;
    photo: Photo[];
    total: number;
  }

  export interface SearchImageResponse {
    photos: Photos;
    stat: string;
  }
}
