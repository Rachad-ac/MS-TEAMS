import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Agents',
    isTitle: true
  },
  {
    label: 'Agent',
    icon: 'user',
    link: '/admin/agent'
  },
  // gestion recrutement
  {
    label: 'Gestion Recrutement',
    isTitle: true
  },
  {
    label: 'Offre D\'emploie',
    icon: 'package',
    link: '/admin/gestion-recrutement/offre-emploi'
  },
  {
    label: 'Session Formation',
    icon: 'book-open',
    link: '/admin/gestion-recrutement/session-recrutement'
  },
];
