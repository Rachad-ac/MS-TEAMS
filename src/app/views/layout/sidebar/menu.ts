import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  // gestion recrutement
  {
    label: 'Gestion Recrutement',
    isTitle: true
  },
  {
    label: 'Recrutement',
    icon: 'package',
    link: '/admin/gestion-recrutement/recrutement'
  },

  // gestion Formation
  {
    label: 'Gestion Formation',
    isTitle: true
  },
  {
    label: 'Session Formation',
    icon: 'book-open',
    link: '/admin/gestion-formation/session-formation'
  },
   {
    label: 'Formateur',
    icon: 'user',
    link: '/admin/gestion-formation/formateur'
  },
];
