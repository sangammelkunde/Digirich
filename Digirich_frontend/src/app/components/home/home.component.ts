import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Addtowishlist } from 'src/app/models/wishlist/addtowishlist';
import { Category } from 'src/app/models/product/category';
import { Product } from 'src/app/models/product/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AddToCart } from 'src/app/models/cart/add-to-cart';
import { CartService } from 'src/app/services/cart.service';
import { Catandproducts } from 'src/app/models/product/catandproducts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products!: Product[];
  productsCat!: Product[];
  categories!: Category[];
  loggedIn: boolean = false;
  token!: string | null;
  response!: any;
  flag!: string | null;
  addToWishlist!: Addtowishlist;
  addToCart!: AddToCart;
  catAndProducts!: Catandproducts;
  catArr: Catandproducts[] = [];
  searchValue!: string | null;
  filterValue!: string | null;

  constructor(private proudctService: ProductService, private categoryService: CategoryService, private router: Router, private route: ActivatedRoute, private wishlistService: WishlistService, private toastrService: ToastrService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getCategoryAndProduct();
    this.token = localStorage.getItem('token');
    if (this.token != null) {
      this.loggedIn = true;
    }

    this.searchValue = this.route.snapshot.queryParamMap.get('search');
    if (this.searchValue != null) {
      this.searchProducts(this.searchValue);
    } else {
      this.products = [];
    }

    this.filterValue = this.route.snapshot.queryParamMap.get('filter');
    if (this.filterValue != null) {
      if (this.filterValue == 'lowToHigh') {
        this.sortLowToHigh();
      }
      if (this.filterValue == 'highToLow') {
        this.sortHighToLow();
      }
    }
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['']);
  }

  reloadOnSort(path: string, queryParams: any) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([path], queryParams);
  }



  sortLowToHigh(): void {
    this.proudctService.getAllProducts().subscribe(products => {
      this.products = products;
      this.products = this.products.sort((product1, product2) => {
        if (product1.price > product2.price) {
          return 1;
        }
        if (product1.price < product2.price) {
          return -1;
        }
        return 0;
      })
    })
  }

  sortHighToLow(): void {
    this.proudctService.getAllProducts().subscribe(products => {
      this.products = products;
      this.products = this.products.sort((product1, product2) => {
        if (product1.price > product2.price) {
          return -1;
        }
        if (product1.price < product2.price) {
          return 1;
        }
        return 0;
      })
    })
  }

  onChange(val: any) {
    this.reloadOnSort('', { queryParams: { filter: val.target.value } })
  }

  getAllProducts(): void {
    this.proudctService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

  getCategoryAndProduct(): void {

    this.categoryService.getAllCategories().subscribe(categories => {
      categories.forEach(category => {

        this.proudctService.getProductByCategoryId(category.id).subscribe(products => {
          this.catAndProducts = new Catandproducts();
          this.catAndProducts.category = category;
          this.catAndProducts.products = products;
          this.catArr.push(this.catAndProducts);
        })

      })
    })
  }

  searchProducts(searchValue: string): void {
    this.proudctService.getAllProducts().subscribe(products => {
      this.products = products;
      if (searchValue != null) {
        this.products = this.products.filter(product =>
          product.productName.toLowerCase().includes(searchValue.toLowerCase()));
      }
    })
  }



  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  getProductsByCategoryName(categoryName: string): void {
    this.proudctService.getProductByCategoryName(categoryName).subscribe(prods => {
      this.productsCat = prods;
    })
  }

  selectProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

  addProductToWishlist(id: number): void {
    if (this.token != null) {
      this.addToWishlist = new Addtowishlist();
      this.addToWishlist.productId = id;
      this.wishlistService.addProduct(this.token, this.addToWishlist).subscribe(response => {
        this.response = response;
        this.toastrService.success("Product added to wishlist!", "Success", {
          timeOut: 3000,
          progressBar: true,
        })
      }, error => {
        this.toastrService.error("Product already exists in wishlist", "Go to wishlist", {
          timeOut: 3000,
          progressBar: true
        })
      })
    } else {
      this.toastrService.error("Please login to add", "Error", {
        timeOut: 3000,
        progressBar: true
      })
    }
  }

  addProductToCart(id: number) {
    if (this.token != null) {
      this.addToCart = new AddToCart();
      this.addToCart.productId = id;
      this.addToCart.quantity = 1;
      this.cartService.addProduct(this.token, this.addToCart).subscribe(response => {
        this.response = response;
        this.reloadComponent();
        this.toastrService.success("Product added to cart!", "Success", {
          timeOut: 3000,
          progressBar: true,
        })
      }, error => {
        this.toastrService.error("Product already exists in cart", "Go to cart", {
          timeOut: 3000,
          progressBar: true
        })
      })
    } else {
      this.toastrService.error("Please login to add", "Error", {
        timeOut: 3000,
        progressBar: true
      })
    }
  }



}
