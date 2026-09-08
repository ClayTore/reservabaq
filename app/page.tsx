import { supabase } from "./supabaseClient";

export default async function Home() {
  const { data: restaurantes, error } = await supabase
    .from("restaurantes")
    .select("*");

  if (error) {
    return <p>Error cargando restaurantes: {error.message}</p>;
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Restaurantes en Barranquilla
      </h1>

      <ul className="flex flex-col gap-4">
        {restaurantes?.map((r) => (
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
    </main>
  );
}