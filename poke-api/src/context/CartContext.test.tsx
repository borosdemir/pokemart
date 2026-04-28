import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider, useCart, Product } from './CartContext';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

// Un componente de prueba que consume nuestro CartContext para verificar sus valores
const TestComponent = () => {
  const { cart, addToCart, clearCart, totalPrice, totalItems } = useCart();

  const mockPokemon: Product = {
    id: 4,
    title: 'Charmander',
    price: 40,
    description: 'Un lagarto de fuego',
    category: 'Fuego',
    image: 'charmander.png'
  };

  const mockPikachu: Product = {
    id: 25,
    title: 'Pikachu',
    price: 25,
    description: 'Rata eléctrica',
    category: 'Eléctrico',
    image: 'pikachu.png'
  };

  return (
    <div>
      <div data-testid="cart-length">{cart.length}</div>
      <div data-testid="total-price">{totalPrice}</div>
      <div data-testid="total-items">{totalItems}</div>
      <button onClick={() => addToCart(mockPokemon)} data-testid="btn-add-charmander">Add Charmander</button>
      <button onClick={() => addToCart(mockPikachu)} data-testid="btn-add-pikachu">Add Pikachu</button>
      <button onClick={clearCart} data-testid="btn-clear">Clear</button>
    </div>
  );
};

// Envolvemos el componente de prueba con los proveedores necesarios
const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      <CartProvider>{ui}</CartProvider>
    </ChakraProvider>
  );
};

describe('CartContext', () => {
  it('Debería inicializar con el carrito vacío', () => {
    renderWithProvider(<TestComponent />);
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
    expect(screen.getByTestId('total-items').textContent).toBe('0');
  });

  it('Debería sumar el precio total correctamente al añadir Pokémon', () => {
    renderWithProvider(<TestComponent />);
    
    const btnCharmander = screen.getByTestId('btn-add-charmander');
    const btnPikachu = screen.getByTestId('btn-add-pikachu');

    // Agregamos un Charmander ($40)
    act(() => {
      btnCharmander.click();
    });

    expect(screen.getByTestId('cart-length').textContent).toBe('1');
    expect(screen.getByTestId('total-price').textContent).toBe('40');
    expect(screen.getByTestId('total-items').textContent).toBe('1');

    // Agregamos un Pikachu ($25)
    act(() => {
      btnPikachu.click();
    });

    // Total debería ser $65 y 2 ítems distintos
    expect(screen.getByTestId('cart-length').textContent).toBe('2');
    expect(screen.getByTestId('total-price').textContent).toBe('65');
    expect(screen.getByTestId('total-items').textContent).toBe('2');
    
    // Agregamos otro Charmander
    act(() => {
      btnCharmander.click();
    });
    
    // Total debería ser $105 y 2 ítems distintos pero 3 en total (cantidad)
    expect(screen.getByTestId('cart-length').textContent).toBe('2'); 
    expect(screen.getByTestId('total-price').textContent).toBe('105');
    expect(screen.getByTestId('total-items').textContent).toBe('3');
  });

  it('Debería vaciar el carrito al llamar clearCart()', () => {
    renderWithProvider(<TestComponent />);
    
    const btnCharmander = screen.getByTestId('btn-add-charmander');
    const btnClear = screen.getByTestId('btn-clear');

    // Llenamos el carrito
    act(() => {
      btnCharmander.click();
    });
    expect(screen.getByTestId('total-price').textContent).toBe('40');

    // Vaciamos el carrito
    act(() => {
      btnClear.click();
    });

    // Debería volver a 0
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
  });
});
