"use client";

import { useState } from "react";

type Restaurante = {
  id: number;
  nombre: string;
  tipo_comida: string | null;
  zona: string | null;
  rango_precio: string | null;
};

export default function ListaRestaurantes({
  restaurantes,
}: {
  restaurantes: Restaurante[];
}) {
  const [busqueda, setBusqueda] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");

  const tiposDeComida = [
    "Todos",
    ...new Set(
      restaurantes
        .map((r) => r.tipo_comida)
        .filter(Boolean)
    ),
  ];

  const restaurantesFiltrados = restaurantes.filter((r) => {
    const coincideTipo =
      tipoSeleccionado === "Todos" ||
      r.tipo_comida === tipoSeleccionado;

    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      r.nombre.toLowerCase().includes(texto) ||
      (r.zona ?? "").toLowerCase().includes(texto);

    return coincideTipo && coincideBusqueda;
  });

  return (
    <div>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por nombre o zona..."
        className="mb-4 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {tiposDeComida.map((tipo) => (
          <button
            key={tipo}
            onClick={() => setTipoSeleccionado(tipo!)}
            className={`rounded-full border px-3 py-1 text-xs ${
              tipoSeleccionado === tipo
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-zinc-300 text-zinc-600"
            }`}
          >
            {tipo}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-4">
        {restaurantesFiltrados.map((r) => (
          <li
            key={r.id}
            className="rounded-lg border border-zinc-200 p-4"
          >
            <h2 className="font-semibold">{r.nombre}</h2>

            <p className="text-sm text-zinc-500">
              {r.tipo_comida} · {r.zona} · {r.rango_precio}
            </p>
          </li>
        ))}
      </ul>

      {restaurantesFiltrados.length === 0 && (
        <p className="text-sm text-zinc-400">
          No hay restaurantes que coincidan.
        </p>
      )}
    </div>
  );
}