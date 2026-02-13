import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../services/strapi.service';
import { Notice } from '../../models/strapi.models';
import { NoticeCard } from '../../components/notice-card/notice-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NoticeCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private strapi = inject(StrapiService);
  notices = signal<Notice[]>([]);

  ngOnInit() {
    this.strapi.getNotices({ pageSize: 6 }).subscribe({
      next: (res) => this.notices.set(res.data),
    });
  }
}
