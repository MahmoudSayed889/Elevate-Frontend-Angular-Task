import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    {
        path: 'list',
        loadComponent: () => import('./components/posts/list/list.component').then(c => c.ListComponent)
    },
    {
        path: 'details/:postId',
        loadComponent: () => import('./components/posts/details/details.component').then(c => c.DetailsComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./components/posts/create-update-post/create-update-post.component').then(c => c.CreateUpdatePostComponent)
    },
    {
        path: 'update',
        loadComponent: () => import('./components/posts/create-update-post/create-update-post.component').then(c => c.CreateUpdatePostComponent)
    },
    {
        path: '**', redirectTo: '/list', pathMatch: 'full'
    }
];
