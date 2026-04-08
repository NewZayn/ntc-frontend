import { Component, input } from '@angular/core';
import { Category } from '../../models/strapi.models';

@Component({
  selector: 'app-category-badge',
  imports: [],
  templateUrl: './category-badge.html',
})
export class CategoryBadge {
  category = input.required<Category>();
}
