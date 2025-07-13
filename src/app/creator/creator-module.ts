import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorPage } from './pages/creator-page/creator-page';
import { Previewer } from './components/previewer/previewer';
import { Form } from './components/form/form';
import { FormsModule } from '@angular/forms';
import { BasicsForm } from './components/form/basics-form/basics-form';
import { StatAssign } from './components/form/stat-assign/stat-assign';
import { StatGenerator } from './components/form/stat-generator/stat-generator';
import { MemoryPage } from './pages/memory-page/memory-page';
import { Loader } from './components/loader/loader';
import { HelpPopup } from './components/form/help-popup/help-popup';



@NgModule({
  declarations: [
    CreatorPage,
    Previewer,
    Form,
    BasicsForm,
    StatAssign,
    StatGenerator,
    MemoryPage,
    Loader,
    HelpPopup,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CreatorModule { }
