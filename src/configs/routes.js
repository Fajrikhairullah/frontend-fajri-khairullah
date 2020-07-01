import { Contacts, ContactScreen } from '../screens/items';

import { MainScreen } from '../screens/main';
import { HomeScreen } from '../screens/home';


export const drawerRoutes = [
  {
    name: 'Home',
    component: HomeScreen,
  },

];


export const routes = [

  {
    name: 'Main',
    component: MainScreen,
  },
  {
    name: 'ContactScreen',
    component: ContactScreen,
  },

];

