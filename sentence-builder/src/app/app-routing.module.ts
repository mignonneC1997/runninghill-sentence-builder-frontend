import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentencesComponent } from './components/sentences/sentences.component';

const routes: Routes = [
  { path: '', component: SentencesComponent }, // Default route
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
