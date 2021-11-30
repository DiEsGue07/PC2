import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'pokemons',
    loadChildren: () => import('./pokemons/pokemons.module').then( m => m.PokemonsPageModule)
  },
  {
    path: 'pokemons/${campo_id}',
    loadChildren: () => import('./product-view/product-view/product-view.component').then( m => m.PokemonViewComponent)
  },
  {
    path: 'pokemons/delete/${campo_id}',
    loadChildren: () => import('./product-delete/product-delete/product-delete.component').then( m => m.PokedexDeleteComponent)
  },
  {
    path: 'pokemons/edit/${campo_id}',
    loadChildren: () => import('./product-edit/product-edit/product-edit.component').then( m => m.PokedexEditComponent)
  },
  {
    path: 'pokemons/new',
    loadChildren: () => import('./register/register.component').then( m => m.RegisterComponent)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
