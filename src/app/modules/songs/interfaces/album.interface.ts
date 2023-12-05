
export interface INewAlbum {
    nombre: string,
    imagen: null | File,
}


export interface IAlbum {
    id: string,
    nombre: string,
    imagen: string,
    usuario_id: number,
    created_at: string,
    updated_at: string,
    slug: string,
}