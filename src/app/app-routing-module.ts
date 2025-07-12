import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/pages/home-page/home-page';
import { CreatorPage } from './creator/pages/creator-page/creator-page';
import { MemoryPage } from './creator/pages/memory-page/memory-page';


const routes: Routes = [
  {
    path: "",
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: HomePage 
  },
  {
    path: "creator",
    component: CreatorPage 
  },
  {
    path: "memory",
    component: MemoryPage
  },
  {
    path: "*",
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
