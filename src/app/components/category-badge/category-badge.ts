import { Component, input } from '@angular/core';
import { Category } from '../../models/strapi.models';

@Component({
  selector: 'app-category-badge',
  imports: [],
  templateUrl: './category-badge.html',
  styleUrl: './category-badge.css',
})
export class CategoryBadge {
  category = input.required<Category>();
}
