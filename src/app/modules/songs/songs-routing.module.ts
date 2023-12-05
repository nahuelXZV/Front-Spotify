import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySongsComponent } from './pages/my-songs/my-songs.component';
import { AddSongComponent } from './pages/add-song/add-song.component';
import { MyAlbumsComponent } from './pages/my-albums/my-albums.component';

const routes: Routes = [
    {
        path: '',
        component: MySongsComponent
    },{
        path: 'albums',
        component: MyAlbumsComponent
    },
    {
        path: 'add',
        component: AddSongComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SongsRoutingModule { }
