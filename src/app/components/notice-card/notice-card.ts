import { Component, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Notice } from '../../models/strapi.models';
import { StrapiService } from '../../services/strapi.service';
import { CategoryBadge } from '../category-badge/category-badge';

@Component({
  selector: 'app-notice-card',
  imports: [RouterLink, DatePipe, CategoryBadge],
  templateUrl: './notice-card.html',
  styleUrl: './notice-card.css',
})
export class NoticeCard {
  notice = input.required<Notice>();
  strapi = inject(StrapiService);
}
