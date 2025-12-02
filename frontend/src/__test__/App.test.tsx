import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("App component", () => {
  beforeEach(() => {
    // Limpia mocks antes de cada test
    global.fetch = vi.fn();
  });

  test("carga y muestra usuarios iniciales", async () => {
    // Mock del GET inicial
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([{ id: 1, name: "Juan" }]),
    });

    render(<App />);

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/api/users");

    // Espera a que se muestre el usuario
    expect(await screen.findByText("Juan")).toBeInTheDocument();
  });

  test("permite agregar un usuario nuevo", async () => {
    // 1️⃣ Primer fetch (GET inicial)
    global.fetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve([{ id: 1, name: "Juan" }]),
      })
      // 2️⃣ fetch para POST de nuevo usuario
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      })
      // 3️⃣ fetch posterior (GET refrescar lista)
      .mockResolvedValueOnce({
        json: () => Promise.resolve([
          { id: 1, name: "Juan" },
          { id: 2, name: "María" },
        ]),
      });

    render(<App />);

    // Escribe en el input
    const input = screen.getByPlaceholderText("Nuevo usuario");
    fireEvent.change(input, { target: { value: "María" } });

    // Click en agregar
    fireEvent.click(screen.getByText("Agregar"));

    // Validamos que se llamó al POST:
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/users",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "María" }),
        })
      );
    });

    // Espera a que aparezca el nuevo usuario
    expect(await screen.findByText("María")).toBeInTheDocument();
  });
});

