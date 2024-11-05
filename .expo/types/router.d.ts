/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/cart` | `/(tabs)/favorite` | `/(tabs)/home` | `/(tabs)/inbox` | `/(tabs)/profile` | `/ShippingInfo` | `/_sitemap` | `/add-new-product` | `/cart` | `/chat` | `/favorite` | `/home` | `/inbox` | `/invoices-history` | `/login` | `/payment-method` | `/product-details` | `/profile` | `/search` | `/success` | `/user-post`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
