import { MenuItem } from './menu.model';

// Définition du menu latéral de l'application
export const MENU: MenuItem[] = [
  // Section gestion recrutement
  {
    label: 'Gestion Recrutement',
    isTitle: true,
  },
  {
    label: 'Recrutement',
    icon: 'package',
    link: '/admin/gestion-recrutement/recrutement',
  },
  // Ajout de l'entrée Candidature pour accéder à la gestion des candidatures
  {
    label: 'Candidature',
    icon: 'user-check',
    link: '/admin/gestion-recrutement/candidature',
  },

  // Section gestion formation
  {
    label: 'Gestion Formation',
    isTitle: true,
  },
  {
    label: 'Session Formation',
    icon: 'book-open',
    link: '/admin/gestion-formation/session-formation',
  },
];
