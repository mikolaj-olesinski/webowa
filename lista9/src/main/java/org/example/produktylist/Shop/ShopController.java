package org.example.produktylist.Shop;

import org.example.produktylist.Product.Product;
import org.example.produktylist.Product.ProductService;
import org.example.produktylist.Service.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.security.core.Authentication;

import java.util.List;

@Controller
@RequestMapping("/shop")
public class ShopController {

    private final ProductService productService;

    public ShopController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public String showShopPage(Authentication authentication, Model model) {
        List<Product> productList = productService.getAllProducts();
        model.addAttribute("productList", productList);

        boolean isAdmin = SecurityUtils.isAdmin(authentication);
        model.addAttribute("isAdmin", isAdmin);

        return "shop/shop";
    }
}
