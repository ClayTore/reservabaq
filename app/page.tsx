import { supabase } from "./supabaseClient";
import ListaRestaurantes from "./ListaRestaurantes";

export default async function Home() {
  const { data: restaurantes, error } = await supabase
    .from("restaurantes")
    .select("*");

  if (error) {
    return <p>Error cargando restaurantes: {error.message}</p>;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 rounded-3xl bg-emerald-700 px-8 py-10 text-white">
        <h1 className="font-heading text-3xl font-semibold">
          Encuentra tu próximo restaurante en Barranquilla
        </h1>
        <p className="mt-2 max-w-md text-sm text-emerald-50">
          Busca por tipo de comida, zona o nombre, y reserva directo por
          WhatsApp.
        </p>
      </div>

      <ListaRestaurantes restaurantes={restaurantes ?? []} />
    </main>
  );
}