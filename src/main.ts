import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from "@angular/core";
import { RouterModule } from "@angular/router";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        importProvidersFrom(
            ToastrModule.forRoot(),
            BrowserModule,
            RouterModule.forRoot([
                {
                    path: "",
                    loadComponent: () => import("./app/ui/components/layouts/layouts.component").then(c => c.LayoutsComponent),
                    children: [
                        {
                            path: "",
                            loadComponent: () => import("./app/ui/components/home/home.component").then(c => c.HomeComponent),
                        },
                        {
                            path: "products",
                            loadComponent: () => import("./app/ui/components/product/product.component").then(c => c.ProductComponent),
                        },
                        {
                            path: "stores",
                            loadComponent: () => import("./app/ui/components/store/store.component").then(c => c.StoreComponent),
                        },
                        {
                            path: "settings",
                            loadComponent: () => import("./app/ui/components/settings/settings.component").then(c => c.SettingsComponent),
                        },
                        {
                            path: "product/:id",
                            loadComponent: () => import("./app/ui/components/product-detail/product-detail.component").then(c => c.ProductDetailComponent),
                        },
                        {
                            path: "favorites",
                            loadComponent: () => import("./app/ui/components/favorites/favorites.component").then(c => c.FavoritesComponent),
                        },
                        {
                            path: "store/:id",
                            loadComponent: () => import("./app/ui/components/store-detail/store-detail.component").then(c => c.StoreDetailComponent),
                        },
                        {
                            path: "add-store",
                            loadComponent: () => import("./app/ui/components/add-store/add-store.component").then(c => c.AddStoreComponent),
                        },
                        {
                            path: "store/:id/add-product",
                            loadComponent: () => import("./app/ui/components/add-product/add-product.component").then(c => c.AddProductComponent),
                        }
                    ]
                },
                {
                    path: "login",
                    loadComponent: () => import("./app/ui/components/auth/login/login.component").then(c => c.LoginComponent),
                },
                {
                    path: "register",
                    loadComponent: () => import("./app/ui/components/auth/register/register.component").then(c => c.RegisterComponent),
                },
            ])),
        provideAnimations(),
    ]
})