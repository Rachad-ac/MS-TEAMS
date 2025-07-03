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
  {
    label: 'Evaluation',
    icon: 'file-text',
    link: '/admin/gestion-recrutement/evaluation',
  },
  {
    label: 'Candidat',
    icon: 'user',
    link: '/admin/gestion-recrutement/candidat',
  },

  // gestion formation

  // Section gestion formation
  {
    label: 'Gestion Formation',
    isTitle: true,
  },
  {
    label: 'Formation',
    icon: 'book-open',
    link: '/admin/gestion-formation/formation',
  },
  {
    label: 'Employés',
    icon: 'users',
    link: '/admin/gestion-formation/employes',
  },
  {
    label: 'Inscriptions',
    icon: 'edit',
    link: '/admin/gestion-formation/inscriptions',
  },
];
