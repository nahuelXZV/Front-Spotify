
export interface INewGenre {
    nombre: string;
    imagen: string | ArrayBuffer | null | File;
}


export interface IGenre {
    id: number,
    nombre: string,
    imagen: string,
    created_at: string,
    updated_at: string,
    slug: string,
}