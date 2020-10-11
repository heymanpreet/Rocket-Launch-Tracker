import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes  } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'allLaunches', component: AppComponent  },
  { path: 'filterLaunchYear', component: AppComponent  },
  { path: 'filterLaunchSuccess', component: AppComponent  },
  { path: 'filterLandSuccess', component: AppComponent  },
  { path: 'filterLaunchYear&land', component: AppComponent  },
  { path: 'filterLaunchYear&land&launch', component: AppComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
