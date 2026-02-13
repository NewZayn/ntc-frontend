import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StrapiService } from '../../services/strapi.service';
import { Notice, StrapiBlock } from '../../models/strapi.models';
import { CategoryBadge } from '../../components/category-badge/category-badge';
import { BlockRenderer } from '../../components/block-renderer/block-renderer';

@Component({
  selector: 'app-notice-detail',
  imports: [DatePipe, CategoryBadge, BlockRenderer],
  templateUrl: './notice-detail.html',
  styleUrl: './notice-detail.css',
})
export class NoticeDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private strapi = inject(StrapiService);

  notice = signal<Notice | null>(null);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.router.navigate(['/notices']);
      return;
    }

    this.strapi.getNoticeBySlug(slug).subscribe({
      next: (res) => {
        if (res.data.length > 0) {
          this.notice.set(res.data[0]);
        } else {
          this.router.navigate(['/notices']);
        }
      },
      error: () => this.router.navigate(['/notices']),
    });
  }

  getImageUrl(url: string): string {
    return this.strapi.getMediaUrl(url);
  }

  getContentBlocks(): StrapiBlock[] {
    return (this.notice()?.content ?? []) as StrapiBlock[];
  }
}
