import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { MenuComponent } from './menu/menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LayoutComponent } from './layout.component';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        TopBarComponent,
        FooterComponent,
        MenuComponent,
        SidebarComponent,
        LayoutComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
    ],
    exports: [LayoutComponent]
})
export class LayoutModule { }
