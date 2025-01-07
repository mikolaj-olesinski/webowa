package org.example.produktylist.Cart;

import org.example.produktylist.Product.ProductService;
import org.example.produktylist.Service.SecurityUtils;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;
    private final ProductService productService;

    public CartController(CartService cartService, ProductService productService) {
        this.cartService = cartService;
        this.productService = productService;
    }

    @GetMapping("/")
    public String viewCart(Authentication authentication, Model model, HttpServletRequest request) {
        List<CartItem> cartItems = cartService.getCartFromCookie(request);

        for (CartItem item : cartItems) {
            var product = productService.getProductById(item.getProductId());
            if (product != null) {
                item.setPrice(product.getPrice());
            }
        }

        double total = cartItems.stream()
                .mapToDouble(item -> item.getQuantity() * item.getPrice())
                .sum();
        String formattedTotal = String.format("%.2f", total);
        model.addAttribute("cartItems", cartItems);
        model.addAttribute("total", formattedTotal);

        boolean isAdmin = SecurityUtils.isAdmin(authentication);
        model.addAttribute("isAdmin", isAdmin);

        return "cart/index";
    }




    @GetMapping("/add/{productId}")
    public String addToCart(@PathVariable Long productId, HttpServletRequest request, HttpServletResponse response) {
        var product = productService.getProductById(productId);
        cartService.addToCart(productId, product.getName(), product.getPrice(), request, response);
        return "redirect:/cart/";
    }

    @GetMapping("/remove/{productId}")
    public String removeFromCart(@PathVariable Long productId, HttpServletRequest request, HttpServletResponse response) {
        cartService.removeFromCart(productId, request, response);
        return "redirect:/cart/";
    }

    @GetMapping("/increase/{productId}")
    public String increaseQuantity(@PathVariable Long productId, HttpServletRequest request, HttpServletResponse response) {
        cartService.updateQuantity(productId, 1, request, response);
        return "redirect:/cart/";
    }

    @GetMapping("/decrease/{productId}")
    public String decreaseQuantity(@PathVariable Long productId, HttpServletRequest request, HttpServletResponse response) {
        cartService.updateQuantity(productId, -1, request, response);
        return "redirect:/cart/";
    }
}
