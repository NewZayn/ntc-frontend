import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Notices } from './pages/notices/notices';
import { NoticeDetail } from './pages/notice-detail/notice-detail';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'notices', component: Notices },
  { path: 'notices/:slug', component: NoticeDetail },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' },
];
