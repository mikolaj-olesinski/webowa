package org.example.produktylist.Cart;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private static final String CART_COOKIE_NAME = "cart_cookie";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<CartItem> getCartFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (CART_COOKIE_NAME.equals(cookie.getName())) {
                    try {
                        String decodedCart = new String(Base64.getDecoder().decode(cookie.getValue()), StandardCharsets.UTF_8);
                        return new ArrayList<>(Arrays.asList(objectMapper.readValue(decodedCart, CartItem[].class)));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return new ArrayList<>();
    }


    public void saveCartToCookie(List<CartItem> cart, HttpServletResponse response) {
        try {
            String cartJson = objectMapper.writeValueAsString(cart);
            String encodedCart = Base64.getEncoder().encodeToString(cartJson.getBytes(StandardCharsets.UTF_8));
            Cookie cookie = new Cookie(CART_COOKIE_NAME, encodedCart);
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(7 * 24 * 60 * 60);
            response.addCookie(cookie);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void addToCart(Long productId, String name, double price, HttpServletRequest request, HttpServletResponse response) {
        List<CartItem> cart = getCartFromCookie(request);
        Optional<CartItem> existingItem = cart.stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + 1);
        } else {
            cart.add(new CartItem(productId, name, 1, price));
        }
        saveCartToCookie(cart, response);
    }

    public void removeFromCart(Long productId, HttpServletRequest request, HttpServletResponse response) {
        List<CartItem> cart = getCartFromCookie(request);
        cart.removeIf(item -> item.getProductId().longValue() == productId.longValue());
        saveCartToCookie(cart, response);
    }

    public void updateQuantity(Long productId, int delta, HttpServletRequest request, HttpServletResponse response) {
        List<CartItem> cart = getCartFromCookie(request);
        for (CartItem item : cart) {
            if (item.getProductId().equals(productId)) {
                int newQuantity = item.getQuantity() + delta;
                if (newQuantity > 0) {
                    item.setQuantity(newQuantity);
                } else {
                    cart.remove(item);
                }
                break;
            }
        }
        saveCartToCookie(cart, response);
    }


}

