import { Component, inject, signal, OnInit } from '@angular/core';
import { StrapiService } from '../../services/strapi.service';
import { Notice } from '../../models/strapi.models';
import { NoticeCard } from '../../components/notice-card/notice-card';

@Component({
  selector: 'app-notices',
  imports: [NoticeCard],
  templateUrl: './notices.html',
  styleUrl: './notices.css',
})
export class Notices implements OnInit {
  private strapi = inject(StrapiService);
  notices = signal<Notice[]>([]);

  ngOnInit() {
    this.strapi.getNotices({ pageSize: 12 }).subscribe({
      next: (res) => this.notices.set(res.data),
    });
  }
}
