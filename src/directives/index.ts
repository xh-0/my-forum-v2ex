// src/directives/index.ts
import { adminDirective } from './admin';

export const setupDirectives = (app: any) => {
  app.directive('admin', adminDirective);
  // app.directive('permission', permissionDirective);
};