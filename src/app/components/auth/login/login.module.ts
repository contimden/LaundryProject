import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    imports: [
        LoginRoutingModule,
        CommonModule,
        TableModule,
        TagModule,
        ButtonModule,
        StyleClassModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        PasswordModule,
        CheckboxModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
