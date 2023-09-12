import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Message, MessageService } from 'primeng/api';


@Component({
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  transactionId: string;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.transactionId = params.get('transactionId');
  });
  }

  constructor(
    private activatedRoute: ActivatedRoute 
    ) {}

    
  }