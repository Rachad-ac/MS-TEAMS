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
    link: '/admin/gestion-recrutement/recrutement'
  },

  // gestion recrutement
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
    label: 'Formateur',
    icon: 'user',
    link: '/admin/gestion-formation/formateur'
  },
];
